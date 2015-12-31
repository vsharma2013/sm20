'use strict';

angular.module('myApp').
    directive('customProperties', [customProperties])

function customProperties() {
    return {
        restrict: 'E',
        scope: {
            customProps: '=customprops',
	    cpobject: '=setting'
        },
        templateUrl: 'partials/customproperties.html',
        link: function (scope, element) {
            scope.getInputType = function (key) {
                if (key === 'partner_name')
                    key = 'partner_name';

                var model = scope.cpobject[key].ui;
                var notEditable = !model.allowEdit || model.allowEdit == '0'
                if (model.uiType == 'chkbox')
                    return 'checkbox';
                else if (!notEditable && model.uiType == 'input')
                    return 'txtbx';
                else if (!notEditable && model.uiType == 'autosuggest')
                    return 'autosuggest';
                else if (!notEditable && model.uiType == 'ddlist')
                    return 'ddlist';
                else
                    return 'label';
            }
        }
    };
}

