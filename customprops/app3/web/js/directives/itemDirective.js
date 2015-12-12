'use strict';

angular.module('myApp').    
    directive('itemDirective', [itemDirective])

function itemDirective() {
    return {
        restrict: 'E',
        scope: {
          requisition: '=requisition',
          gridoptions: '=gridoptions'
        },
        templateUrl: 'partials/items.html',
        link: function (scope, element) {

            
        }       
    };   
}

