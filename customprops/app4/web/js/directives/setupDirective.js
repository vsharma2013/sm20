'use strict';

angular.module('myApp').    
    directive('setupDirective', [setupDirective])

function setupDirective() {
    return {
        restrict: 'E',
        scope: {
          requisitionset: '=requisitionset'
        },
        templateUrl: 'partials/setup.html',
        link: function (scope, element) {
            scope.requisition = scope.requisitionset.req;
            scope.ui = scope.requisitionset.ui;
            scope.stspec = 1;
        }       
    };   
}

