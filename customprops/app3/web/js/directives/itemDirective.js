'use strict';

angular.module('myApp').    
    directive('itemDirective', [itemDirective])

function itemDirective() {
    return {
        restrict: 'E',
        scope: {
          requisition: '=requisition'
        },
        templateUrl: 'partials/items.html',
        controller: function ($scope, $element) {
            $scope.gridOptions = {
                
            };
            $scope.gridOptions.columnDefs = [
                { name:'Linenumber', displayName:'Line No', enableColumnMenu: false },
                { name:'Itemnumber', displayName:'Item No', enableColumnMenu: false },
                { name:'Partneritemnumber', displayName:'Partner Item No', enableColumnMenu: false },
                { name:'Item', displayName:'Item', enableColumnMenu: false },
                { name:'Quantity', displayName:'Quantity', enableColumnMenu: false },
                { name:'UOM', displayName:'UOM', enableColumnMenu: false },
                { name:'Unitprice', displayName:'Unit Price (USD)', enableColumnMenu: false },
                { name:'Total', displayName:'Total (USD)', enableColumnMenu: false },
                { name:'Taxes', displayName:'Taxes', enableColumnMenu: false },
                { name:'Comments', displayName:'Comments', enableColumnMenu: false }
            ];
            $scope.gridOptions.data = $scope.requisition.Items;
        }       
    };   
}

