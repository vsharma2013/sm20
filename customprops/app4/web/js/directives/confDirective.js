'use strict';

angular.module('myApp').
    directive('confDirective', ['$uibModal', confDirective])

function confDirective($uibModal) {
    return {
        restrict: 'E',
        scope: {
            confObj: '=confobj'
        },
        templateUrl: 'partials/confdirective.html',
        link: function (scope, element) {
            var dummyJSON = {
                db: {},
                ui: {
                    label: 'label',
                    isMandatory: 'true',
                    allowEdit: 'true',
                    dataType: 'bool',
                    uiType: 'ddlist',
                    defaultVal: '',
                    allVals: '',
                    maxLength: '',
                    numDecimals: '',
                    autoSuggestURL: ''
                }
            }
            scope.selected = {};
            scope.delete=function(){
                for(var key in this.selected){
                    if(this.selected[key] == true)
                        delete this.confObj[key];
                }
            };
            scope.add=function(){
                var modalInstance = $uibModal.open({
                  templateUrl: 'partials/modalContent.html',
                  controller: 'modalController',
                  size: 'sm'
                });

                modalInstance.result.then(function (text) {
                  scope.confObj[text] = JSON.parse(JSON.stringify(dummyJSON));
                }, function () {
                  console.log('modal instance failed')
                });
                
            };
        }
    };
}

