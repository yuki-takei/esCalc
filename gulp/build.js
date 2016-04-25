'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var conf = require('./conf');
var runSequence = require('run-sequence');

var uglifySaveLicense = require('uglify-save-license');

/*
 * Configuration
 */
var paths = {
  jspmBundleTargetModuleDev: 'app',
  jspmBundleTargetModuleProd: 'app',
  jspmBundleOutFile: conf.paths.dist + '/bundle.js'
};


/**
 * Transpile scripts for Electron
 * 	src: js(es6) files for Electron
 * 	dest: serve dir
 */
gulp.task('transpile:electron', function () {
  return gulp.src(conf.paths.srcElectron + "/**/*.js")
    .pipe($.plumber(conf.errorHandler))
    .pipe($.sourcemaps.init())
    .pipe($.babel({ presets: ['es2015']	}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(conf.paths.serve))
  ;
});

/*
 * copy assets task
 */
gulp.task('copy:assets', function () {
  return gulp.src(conf.paths.src + "/assets/**/*")
    .pipe(gulp.dest(conf.paths.dist));
});

/*
 * copy assets task
 */
gulp.task('copy:libs', function () {
  return gulp.src(conf.paths.src + "/libs/**/*")
    .pipe(gulp.dest(conf.paths.dist));
});


/**
 * create Self-Executing (SFX) Bundles
 */
 gulp.task('build:jspm:bundle-sfx', function() {
   // determine jspmBundleTargetModule
   var envString = process.env.JSPM_SFX_TARGET_ENV;

   // default environment
   if (envString === undefined) {
     envString = 'dev';
   }

   var pathsKey = 'jspmBundleTargetModule' + envString.charAt(0).toUpperCase() + envString.slice(1);
   var jspmBundleTargetModule = (pathsKey in paths) ? paths[pathsKey] : paths.jspmBundleTargetModuleDev;

   // create command string with array.join()
   var cmd = ['jspm bundle-sfx',
     jspmBundleTargetModule,
     paths.jspmBundleOutFile,
     (process.env.JSPM_SFXOPTS_SKIP_SOURCE_MAPS === 'true') ? '--skip-source-maps' : '',
     (process.env.JSPM_SFXOPTS_MINIFY === 'true') ? '--minify' : ''
   ].join(' ');

   return $.run(cmd).exec();
 });

/**
* minify Self-Executing (SFX) Bundles
*/
gulp.task('build:minify-sfx', function() {
  return gulp.src(paths.jspmBundleOutFile)
   .pipe($.ngAnnotate())
   .pipe($.uglify({ preserveComments: uglifySaveLicense }))
   .pipe(gulp.dest(conf.paths.dist));
});

/**
 * build, minify and locate html files
 * 	src: html files for application
 * 	dest: dist dir
 */
gulp.task('build:html', function() {
  return gulp.src([
    // select all html files
    conf.paths.src + "/**/*.html",
    // exclude
    "!" + conf.files.indexFileDev
  ])
    .pipe($.plumber(conf.errorHandler))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(gulp.dest(conf.paths.dist));
});

/**
 * build, minify and locate style files
 * 	src: less for application
 * 	dest: dist dir
 */
gulp.task('build:style', function() {
  var autoprefixOption = {
    browsers: ['> 5%']
  };

  return gulp.src(conf.paths.src + "/index.less")
    .pipe($.plumber(conf.errorHandler))
    .pipe($.less())
    .pipe($.autoprefixer(autoprefixOption))
    .pipe($.minifyCss())
    .pipe(gulp.dest(conf.paths.dist));
});

/**
 * build for development
 */
gulp.task('build:dev', [
  'copy:assets',
  'copy:libs',
  'build:html',
  'build:style',
  'build:jspm:bundle-sfx'
]);

/**
 * build for production
 */
gulp.task('build:prod', function (done) {
  $.env({
    vars: {
      JSPM_SFX_TARGET_ENV: 'prod',
      JSPM_SFXOPTS_SKIP_SOURCE_MAPS: true,
      JSPM_SFXOPTS_MINIFY: false    // ngAnnotate による処理が必要なので、jspm では minify しない
    }
  });

  return runSequence(
    [
      'copy:assets',
      'copy:libs',
      'build:html',
      'build:style',
      'build:jspm:bundle-sfx'
    ],
    'build:minify-sfx',
    done);
});

/**
 * alias to build:dev
 */
gulp.task('build', ['build:dev']);
