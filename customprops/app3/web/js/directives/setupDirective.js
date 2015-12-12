'use strict';

angular.module('myApp').    
    directive('setupDirective', [setupDirective])

function setupDirective() {
    return {
        restrict: 'E',
        scope: {
          requisition: '=requisition'
        },
        templateUrl: 'partials/setup.html',
        link: function (scope, element) {
            scope.stspec = 1;
        }       
    };   
}

