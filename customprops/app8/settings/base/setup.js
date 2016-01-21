var settingsGenerator = require('./../settingsGenerator');

var uiSchema = {

	req_name : { dataType : 'string', uiType : 'input', label : 'Requsition Name', defaultVal : 'ABM req name', section: 1, sort : 1 },
    
    req_number: { dataType : 'string', uiType : 'input', label : 'Requsition Number', defaultVal : 'ABM test number', allowEdit : false, 
                  isMandatory : true, section : 1, sort : 2},
    
    requester: { dataType : 'string', uiType : 'input', label : 'Requester', defaultVal : 'Admin', allowEdit : false, isMandatory : true,
                 section: 1, sort : 1},
	
	shipto: { dataType : 'string', uiType : 'autosuggest', label : 'Requsition Number', defaultVal : 'ABM test number', allowEdit : true, 
              isMandatory : true, autoSuggestURL : 'https://AvailableShippingLocations' , uiGroup : 'Ship To', section : 2, sort : 1 },

    shipto_address : { dataType : 'string', uiType : 'input', label : 'Ship To Address', defaultVal : 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai',
                      allowEdit : false, isMandatory : true, uiGroup : 'Ship To', section : 2, sort : 2},


    billto : { dataType : 'string', uiType : 'autosuggest', label : 'Bill To', defaultVal : 'Navi Mumbai', allowEdit : true, 
               isMandatory : false, autoSuggestURL : 'https://AvailableBillingLocations' , uiGroup : 'Bill To', 
               icon: '#icon_BillTo', section : 2, sort : 3  },


    billto_address : { dataType : 'string', uiType : 'input', label : 'On behalf of', defaultVal : '',
                      allowEdit : true, isMandatory : false, uiGroup : 'Bill To', icon: '#icon_BillTo', section : 2, sort : 4},

    obo : { dataType : 'string', uiType : 'autosuggest', label : 'Bill To', defaultVal : 'Navi Mumbai', allowEdit : true, 
               isMandatory : false, autoSuggestURL : 'https://UsersFromSameBU' , icon: '#icon_OnBehalf', section : 2, sort : 6 },

	currency : { dataType : 'string', uiType : 'input', label : 'Currency', defaultVal : 'USD', allowEdit : false, isMandatory : true,
	             section: 1, sort : 4 }
};

var prim_keys = Object.keys(uiSchema);

var setup = {};

prim_keys.forEach(function(key){
	setup[key] = settingsGenerator.getPropSettings(uiSchema[key]);
});

module.exports = setup;