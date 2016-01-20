var settingsGenerator = require('./../settingsGenerator');


var prim_keys = ["req_name", "req_number", "requester", "shipto", "shipto_address", "billto", "billto_address", "obo", "currency"];
var cust_keys = ["erp_order_type", "work_order", "deliverto", "is_urgent", "district", "job"];

var propUISchema = {
	req_name : { dataType : 'string', uiType : 'input', label : 'Requsition Name', defaultVal : 'ABM req name', section: 1, sort : 1 },
};


var setup_v1 = {};

var allKeys = prim_keys.concat(cust_keys);

allKeys.forEach(function(key){
	setup_v1[key] = settingConstants.getCustomProperty(propUISchema[key]);
});


module.exports = setup_v1;