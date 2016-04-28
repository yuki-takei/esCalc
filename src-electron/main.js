'use strict';
require('babel-polyfill');

let log4js = require('log4js');
let logger = log4js.getLogger();

let app = require('app');
let BrowserWindow = require('browser-window');
let crashReporter = require('crash-reporter');
let Menu = require('menu');

let mainWindow = null;
if (process.env.NODE_ENV === 'development') {
  crashReporter.start();
}

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ready', () => {
  let url = 'file://' + __dirname + '/index.html';
  if ('APP_RELATIVE_PATH' in process.env) {
    url = 'file://' + __dirname + '/' + process.env.APP_RELATIVE_PATH;
  }

  //Menu.setApplicationMenu(appMenu);
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768
  });
  logger.info('loading url: ' + url);
  mainWindow.loadURL(url);
  mainWindow.on('closed', function () {
		mainWindow =  null;
	});

  // mainWindow.openDevTools();
})
