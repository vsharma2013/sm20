'use strict';

angular.module('myApp').    
    directive('setupDirective', [setupDirective])

function setupDirective() {
    return {
        restrict: 'E',
        scope: {
          requisition: '=requisition',
	  ui: '=ui'
        },
        templateUrl: 'partials/setup.html',
        link: function (scope, element) {
        }       
    };   
}

