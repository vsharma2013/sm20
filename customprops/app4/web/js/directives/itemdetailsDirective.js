'use strict';

angular.module('myApp').    
    directive('itemdetailsDirective', [itemdetailsDirective])

function itemdetailsDirective() {
    return {
        restrict: 'E',
        scope: {
          itemsset: '=itemsset'
        },
        templateUrl: 'partials/itemdetails.html',
        link: function (scope, element) {
            scope.items = scope.itemsset.items;
            scope.ui = scope.itemsset.ui;
            scope.radioModel = 'Accounting';
            scope.itemModel = {model : 'Item 1'};
            scope.item = scope.items[0];
            scope.selectItem = function(item, idx){
                scope.item = item;
            }
        }       
    };   
}
