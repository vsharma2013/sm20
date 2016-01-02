	'use strict';

angular.module('myApp').
	controller('requisitionController', ['settings', 'requisition', 'requisionService', '$route', requisitionController]);

function requisitionController(settings, requisition, requisionService, $route) {
    var vm = this;
    var tenantid = $route.current.params.tenantid;
    vm.requisition = requisition.data.result;
    vm.settings = settings.data.result;
    vm.ui = {};
    vm.ui.settings = vm.settings;
    vm.ui.setupSec1Props = {};
    vm.ui.setupSec1Props.req_name = vm.settings.setup.primary.req_name;
    vm.ui.setupSec1Props.req_number = vm.settings.setup.primary.req_number;
    vm.ui.setupSec1Props.requester = vm.settings.setup.primary.requester;
    vm.ui.setupSec1Props.obo = vm.settings.setup.primary.obo;
    vm.ui.setupSec1Props.currency = vm.settings.setup.primary.currency;
    vm.ui.setupSec2Props = {};
    vm.ui.setupSec2Props.shipto = vm.settings.setup.primary.shipto;
    vm.ui.setupSec2Props.shipto_address = vm.settings.setup.primary.shipto_address;
    vm.ui.setupSec2Props.billto = vm.settings.setup.primary.billto;
    vm.ui.setupSec2Props.billto_address = vm.settings.setup.primary.billto_address;
    vm.ui.itemSec1Props = {};
    vm.ui.itemSec1Props.partner_name = vm.settings.item.primary.partner_name;
    vm.ui.itemSec1Props.partner_code = vm.settings.item.primary.partner_code;
    vm.ui.itemSec1Props.manufacturer_name = vm.settings.item.primary.manufacturer_name;
    vm.ui.itemSec1Props.manufacturer_part_number = vm.settings.item.primary.manufacturer_part_number;
    vm.ui.itemSec2Props = {};
    vm.ui.itemSec2Props.shipto = vm.settings.item.primary.shipto;
    vm.ui.itemSec2Props.shipto_address = vm.settings.item.primary.shipto_address;
    vm.ui.itemSec3Props = {};
    vm.ui.itemSec3Props.category = vm.settings.item.primary.category;
    vm.ui.itemSec4Props = {};
    vm.ui.itemSec4Props.contract_number = vm.settings.item.primary.contract_number;
    vm.ui.itemSec4Props.contract_name = vm.settings.item.primary.contract_name;
    vm.ui.itemSec4Props.contract_expiry_date = vm.settings.item.primary.contract_expiry_date;
    vm.ui.itemSec4Props.contract_value = vm.settings.item.primary.contract_value;
    vm.ui.itemSec4Props.payment_terms = vm.settings.item.primary.payment_terms;
    vm.ui.splitSec1Props = {};
    vm.ui.splitSec1Props.quantity = vm.settings.split.primary.quantity;
    vm.ui.splitSec1Props.type = vm.settings.split.primary.type;
    vm.ui.viewtype = 'Detailed';
    vm.status = 'Submit';
	vm.save	 = function(){
		requisionService.saveRequisition(tenantid, vm.requisition.id, vm.requisition).then(function(result){
			console.log(result);
            alert(angular.toJson(result.data.result));
		});
	};
    vm.submit  = function(){
        requisionService.submitRequisition(tenantid, vm.requisition.id, vm.requisition).then(function(result){
            console.log(result);
            alert(angular.toJson(result.data.result));
        });
    };
	vm.gridOptions = {
        enableSorting: false,
        enableCellSelection: true
    };
    vm.requisition.Items.map(function(item){
        item.total = item.quantity * item.unit_price;
    });
    vm.gridOptions.columnDefs = [
        { name: 'line_number', displayName: 'Line No', enableColumnMenu: false },
        { name: 'item_number', displayName: 'Item No', enableColumnMenu: false },
        { name: 'partner_item_number', displayName: 'Partner Item No', enableColumnMenu: false },
        { name: 'item_name', displayName: 'Item', enableColumnMenu: false },
        { name: 'quantity', displayName: 'Quantity', enableColumnMenu: false, enableCellEdit: true, enableCellEditOnFocus: true },
        { name: 'uom', displayName: 'UOM', enableColumnMenu: false },
        { name: 'unit_price', displayName: 'Unit Price (USD)', enableColumnMenu: false, enableCellEdit: true, enableCellEditOnFocus: true },
        { name: 'total', displayName: 'Total (USD)', enableColumnMenu: false }
    ];
    vm.gridOptions.data = vm.requisition.Items;
}