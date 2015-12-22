'use strict';

angular.module('myApp').    
    directive('itemdetailsDirective', [itemdetailsDirective])

function itemdetailsDirective() {
    return {
        restrict: 'E',
        scope: {
          items: '=items',
          ui: '=ui'
        },
        templateUrl: 'partials/itemdetails.html',
        link: function (scope, element) {
            scope.radioModel = 'Accounting';
            scope.itemModel = {model : 'Item 1'};
            scope.item = scope.items[0];
            scope.selectItem = function(item, idx){
                scope.item = item;
            }
        }       
    };   
}
