	'use strict';

angular.module('myApp').
	controller('requisitionController', ['requisition', 'requisionService', requisitionController]);

function requisitionController(requisition, requisionService) {
    var vm = this;
   	vm.requisition = requisition.data;
   	vm.viewtype = 'Detailed';
	vm.status = 'Submit';	
	vm.save	 = function(){
		requisionService.saveRequisition(vm.requisition).then(function(result){
			console.log(result)
		});
	}
	vm.gridOptions = {};
    vm.gridOptions.columnDefs = [
        { name:'Linenumber', displayName:'Line No', enableColumnMenu: false },
        { name:'Itemnumber', displayName:'Item No', enableColumnMenu: false },
        { name:'Partneritemnumber', displayName:'Partner Item No', enableColumnMenu: false },
        { name:'Item', displayName:'Item', enableColumnMenu: false },
        { name:'Quantity', displayName:'Quantity', enableColumnMenu: false },
        { name:'UOM', displayName:'UOM', enableColumnMenu: false },
        { name:'Unitprice', displayName:'Unit Price (USD)', enableColumnMenu: false },
        { name:'Total', displayName:'Total (USD)', enableColumnMenu: false }
    ];
    vm.gridOptions.data = vm.requisition.Items;
}