var _ = require('underscore');
var settingsGenerator = require('./../settingsGenerator');
var setup_base = require('./../base/setup');

var erpOrderTypes = ['ERP Order Type', 'Internal Order', 'Sales Order', 'Cost Centre Order', 'MRP Order', 'Work Order'];

var uiSchema = {
	
	  erp_order_type : { dataType : 'string', uiType : 'ddlist', label : 'ERP Order Type', defaultVal : 'ERP Order Type', allVals : erpOrderTypes,
	                   uiGroup : 'ERP Order Type', icon : '#icon_OrderERP',  section: 1, sort : 7, isCustom : true },
    
    work_order: { dataType : 'string', uiType : 'input', label : 'Work Order', defaultVal : '', uiGroup : 'ERP Order Type', icon : '#icon_OrderERP',
                  maxLength : 200, section : 2, sort : 8, isCustom : true},

    deliverto : { dataType : 'string', uiType : 'input', label : 'Deliver to', defaultVal : '', icon : '#icon_DeliverTo',
                  maxLength : 2000, section : 2, sort : 5, isCustom : true},

    is_urgent : { dataType : 'bool', uiType : 'chkbox', label : 'Mark as Urgent', defaultVal : false, allowEdit : true, 
                  isMandatory : true, section : 2, sort : 11},

    district : { dataType : 'string', uiType : 'autosuggest', label : 'District', defaultVal : '8032-LL012-Atlanta', allowEdit : true, 
                 isMandatory : true, autoSuggestURL : 'https://ListofCorrespondingOrgEntity' , section : 2, sort : 9},

    job : { dataType : 'string', uiType : 'autosuggest', label : 'Job', defaultVal : 'Allied Waste Svc (BFI) - Lawre', allowEdit : true, 
            isMandatory : true, autoSuggestURL : 'https://ListofCorrespondingOrgEntity' , section : 2, sort : 10, isCustom : true }
};

var cust_keys = Object.keys(uiSchema);

var setup_custom = {};

cust_keys.forEach(function(key){
	setup_custom[key] = settingsGenerator.getPropSettings(uiSchema[key]);
});

var setup_abm = _.extend(setup_base, setup_custom);

module.exports = setup_abm;
