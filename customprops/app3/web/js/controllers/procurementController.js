'use strict';

angular.module('myApp').
	controller('procurementController', ['$state', procurementController]);

function procurementController($state) {
    var vm = this;
   	vm.requisition = {
   		name: 'Requisition081215001',
   		number: 'REQ-2015.001587',
   		requester: 'ABM Admin',   	
   		onbehalfof:'',
   		shipto:{
            type: 1,
   			name: 'Mumbai',
   			address: 'Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai,400708.'
   		},
   		billto:{
   			name: 'Mumbai',
   			address: 'Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai,400708.'
   		},
   		currency:'USD',
   		customproperties:{
   			isurgent: false,
	   		district: '8032-LL012-Atlanta',
	   		job: 'Bureau of ATF Century Center-8032.C0040',
   		},
   		lineitems:[
   			{
   				linenumber: 1,
   				itemnumber: '',
   				item: 'KP001',
   				partneritemnumber: '002',
   				quantity: 1,
   				uom: 'EACH',
   				unitprice: 180.27,
   				total: 180.27,
   				requesteddate: '12-09-2015',
   				needbydate: '12-24-2015',
   				partner:{
   					name: '',
   					code: '',
   					manufacturername: '',
   					manufacturerpartnumber: ''

   				}
   			},
   		]
   	};
   	vm.radioModel='';
   	vm.selectTab = function(){

   	};
}