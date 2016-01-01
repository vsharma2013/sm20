'use strict';

angular.module('myApp').
	controller('configurationController', ['settings', 'requisionService', configurationController]);

function configurationController(settings, requisionService) {
    var vm = this;
    vm.settings = settings.data.result[0];

    vm.save=function(){
        requisionService.saveSettings(vm.settings).then(function(result){
            console.log(result);
            alert(result.data.message);
        });
    };
}