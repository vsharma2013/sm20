'use strict';

angular.module('myApp').
    directive('customProperties', [customProperties])

function customProperties() {
    return {
        restrict: 'E',
        scope: {
            uitype: '=uitype',
            allowedit: '=allowedit',
            prop: '=prop',
            label: '=label',
            allvals: '=allvals'
        },
        templateUrl: 'partials/customproperties.html',
        link: function (scope, element) {
        }
    };
}

