'use strict';

angular.module('myApp').    
    directive('customProperties', ['contantsService', customProperties])

function customProperties(contantsService) {
    return {
        restrict: 'E',
        scope: {
          customProps: '=customprops',
        },
        templateUrl: 'partials/customproperties.html',
        link: function (scope, element) {
            scope.cpobject = contantsService.getCustomProps();
            scope.getInputType = function (key){
                var model = scope.cpobject[key];
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

