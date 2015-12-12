'use strict';

angular.module('myApp').    
    directive('itemdetailsDirective', [itemdetailsDirective])

function itemdetailsDirective() {
    return {
        restrict: 'E',
        scope: {
          item: '=item'
        },
        templateUrl: 'partials/itemdetails.html',
        controller: function ($scope, $element) {
            $scope.radioModel = 'Accounting';
            $scope.test = function(){
                
            }
        }       
    };   
}
