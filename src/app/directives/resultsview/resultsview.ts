class EcResultsView {

  constructor() {
  }

}

export class EcResultsViewDefinition {
  static ddo() : ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        resultSets: '='
      },
      templateUrl: 'app/directives/resultsview/resultsview.html',
      controller: EcResultsView,
      controllerAs: 'vm',
      bindToController: true
    };
  }
}
