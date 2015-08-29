/// <reference path="../../.tmp/typings/bundle.d.ts" />

import 'angular';
import 'angular-ui-router';

import 'ace';
import 'ace/theme-github';
import 'ace/mode-javascript';

import 'angular-material';


class MainController {

  const ACE_BASE_PATH = "libs/ace@1.2.0/";

  constructor() {
    this.initAce();
  }

  private initAce(): void {
    var editor = ace.edit("editor");
    ace.config.set("basePath", ACE_BASE_PATH);
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/javascript");
  }
}

angular.module('app', ['ui.router', 'ngMaterial'])
  // URL Mappings
  .config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $stateProvider
      .state('top', {
        url: '/',
        templateUrl: 'app/main.html',
        controller: 'MainController as main'
      })
    ;

    $urlRouterProvider.otherwise('/');
  })

  .controller('MainController',MainController)

  .run(function($log: ng.ILogService) {
    $log.debug('runBlock end');
  });

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
