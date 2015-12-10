'use strict';

angular.module('myApp').    
    directive('customproperties', [customproperties])

function customproperties() {
    return {
        restrict: 'E',
        scope: {
          customProps: '=customProps'
        },
        templateUrl: 'partials/customproperties.html',
        controller: function ($scope, $element) {
            
        }
    };   
}

