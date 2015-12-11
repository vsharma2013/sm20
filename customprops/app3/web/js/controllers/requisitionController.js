	'use strict';

angular.module('myApp').
	controller('requisitionController', ['$state', 'requisition', 'requisionService', requisitionController]);

function requisitionController($state, requisition, requisionService) {
    var vm = this;
   	vm.requisition = requisition.data;
   	vm.viewtype = 'Detailed';
	vm.status = 'Submit';	
	vm.save	 = function(){
		requisionService.saveRequisition(vm.requisition).then(function(result){
			console.log(result)
		});
	}
}