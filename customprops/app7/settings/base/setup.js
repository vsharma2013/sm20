var settingsGenerator = require('./../settingsGenerator');


var prim_keys = ["req_name", "req_number", "requester", "shipto", "shipto_address", "billto", "billto_address", "obo", "currency"];
var cust_keys = ["erp_order_type", "work_order", "deliverto", "is_urgent", "district", "job"];

var propUISchema = {
	req_name : { dataType : 'string', uiType : 'input', label : 'Requsition Name', defaultVal : 'ABM req name', section: 1, sort : 1 },
    req_number: { dataType : 'string', uiType : 'input', label : 'Requsition Number', defaultVal : 'ABM test number', allowEdit : false, 
                  isMandatory : true, section : 1, sort : 2},
};


var setup = {};

var allKeys = prim_keys.concat(cust_keys);

allKeys.forEach(function(key){
	setup[key] = settingsGenerator.getCustomProperty(propUISchema[key]);
});

console.log(JSON.stringify(setup));

module.exports = setup;