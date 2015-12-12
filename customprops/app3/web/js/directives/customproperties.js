'use strict';

angular.module('myApp').    
    directive('customProperties', [customProperties])

function customProperties() {
    return {
        restrict: 'E',
        scope: {
          customProps: '=customprops'
        },
        templateUrl: 'partials/customproperties.html',
        link: function (scope, element) {
            scope.isType = function(model, type){                
                if(model.allowEdit === 0 && type == 'label'){
                    return true;
                }else if(model.allVals && model.allVals.length > 0 && model.allowEdit === 1 && type == 'typeahead'){
                    return true;
                }else if((!model.allVals || model.allVals.length === 0) && model.allowEdit === 1 && type == 'input'){
                    return true;
                }
                return false;
            }
        }
    };   
}

