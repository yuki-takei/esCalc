/// <reference path="../../.tmp/typings/bundle.d.ts" />

import 'angular';
import 'angular-ui-router';

import 'angular-material';


class MainController {
  public greeting: String;

  constructor() {
    this.greeting = 'Hello! AngularJS!';
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
