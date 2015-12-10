'use strict';

angular.module('myApp').
	controller('procurementController', ['$state', 'requisition', procurementController]);

function procurementController($state, requisition) {
    var vm = this;
   	vm.requisition = requisition.data[0];
   	vm.viewtype = 'Detailed';
      vm.status = 'Send for Approval';
      vm.stspec = 1;
      vm.changeStatus = function(){

      }
}