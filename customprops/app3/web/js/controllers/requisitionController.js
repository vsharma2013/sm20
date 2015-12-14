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
			console.log(result);
            alert(result.data.message);
		});
	};
    vm.submit  = function(){
        requisionService.submitRequisition(vm.requisition).then(function(result){
            console.log(result);
            alert(result.data.message);
        });
    };
	vm.gridOptions = {
        enableSorting: false,
        enableCellSelection: true
    };
    vm.requisition.Items.map(function(item){
        item.Total = item.Quantity * item.Unitprice;
    });
    vm.gridOptions.columnDefs = [
        { name:'Linenumber', displayName:'Line No', enableColumnMenu: false },
        { name:'Itemnumber', displayName:'Item No', enableColumnMenu: false },
        { name:'Partneritemnumber', displayName:'Partner Item No', enableColumnMenu: false },
        { name:'Item', displayName:'Item', enableColumnMenu: false },
        { name:'Quantity', displayName:'Quantity', enableColumnMenu: false, enableCellEdit: true, enableCellEditOnFocus:true },
        { name:'UOM', displayName:'UOM', enableColumnMenu: false },
        { name:'Unitprice', displayName:'Unit Price (USD)', enableColumnMenu: false, enableCellEdit: true, enableCellEditOnFocus:true},
        { name:'Total', displayName:'Total (USD)', enableColumnMenu: false }
    ];
    vm.gridOptions.data = vm.requisition.Items;
}