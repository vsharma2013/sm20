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
            
            scope.getInputType = function (model){
                var notEditable = !model.allowEdit || model.allowEdit == '0'                
                if(!notEditable && model.type == 'bool')
                    return 'checkbox';
                else if(!notEditable && model.type == 'string')
                    return 'txtbx';
                else if(!notEditable && model.type == 'autosuggest')
                    return 'autosuggest';
                else if(!notEditable && model.type == 'ddlist')
                    return 'ddlist';
                else
                    return 'label';
            }
        }
    };   
}

