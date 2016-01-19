'use strict';

angular.module('myApp').
	controller('configurationController', ['settings', 'requisionService', configurationController]);

function configurationController(settings, requisionService) {
    var vm = this;
    var tenantid = $route.current.params.tenantid;
    vm.settings = settings.data.result;

    vm.save=function(){
        requisionService.saveSettings(tenantid, vm.settings).then(function(result){
            console.log(result);
            alert(result.data.result);
        });
    };
}