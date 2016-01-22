var settingsGenerator = require('./../settingsGenerator');

var uiSchema = {

};

var prim_keys = Object.keys(uiSchema);

var item = {

	category : { dataType: "string", uiType: "input", defaultVal: "GEP, Building 3, Mindspace, Airoli, Navi Mumbai", 
	             allowEdit: false, icon: "#icon_BillTo", label: "Bill To Address", section: 2, sort: 4, uiGroup: "Bill To"},

    contract_expiry_date : { dataType: "date", uiType: "input", label: "Contract Expiry Date", defaultVal: "", allowEdit: false,
                             icon: "#icon_SuggestPart", uiGroup: "Contract", section: 0, sort: 0 },
    
    contract_name: { dataType: "string", uiType: "input", label: "Contract Name", defaultVal: "", allowEdit: false, 
                     uiGroup: "Contract", icon: "#icon_SuggestPart", section: 0, sort: 0},

    contract_number: { dataType: "string", uiType: "input"label: "Contract Number", defaultVal: "", maxLength: 100, numDecimals: null, 
                       icon: "#icon_SuggestPart", uiGroup: "Contract", section: 0, sort: 0 },

    contract_value: { dataType: "int", uiType: "input", label: "Contract Value", defaultVal: "", allowEdit: false, icon: "#icon_SuggestPart", 
                      uiGroup: "Contract", section: 0, sort: 0 },

    efforts: { dataType: "decimal", uiType: "input", label: "Efforts", defaultVal: 1, isMandatory: true, icon: "#icon_SuggestPart", 
               numDecimals: 0, uiGroup: "Efforts"},

    end_date: { dataType: "date", uiType: "calendar", label: "End Date", defaultVal: "Wed Jan 20 2016 12:18:23 GMT+0530 (IST)", 
                isMandatory: true, icon: "#icon_SuggestPart"uiGroup: "End Date"},

    is_tax_exempt: { dataType: "bool", uiType: "ddlist", label: "Tax Exempt", defaultVal: 'No', isMandatory: true, allVals: ['Yes', 'No'], 
                     icon: "#icon_SuggestPart", uiGroup: "Tax Exempt"},

    item_name: { dataType: "string", uiType: "autosuggest", label: "Item", defaultVal: "", isMandatory: true, 
                 autoSuggestURL: "https://ListofAccessibleItems", icon: "#icon_SuggestPart", uiGroup: "Item" },

    item_number: { dataType: "string", uiType: "autosuggest", label: "Item No.", defaultVal: "", 
                   autoSuggestURL: "https://ListofAccessibleItems", icon: "#icon_SuggestPart", uiGroup: "Item No."},

    line_number: { dataType: "int", uiType: "input", label: "Line No.", defaultVal: 1, allowEdit: false, isMandatory: true, 
                   icon: "#icon_SuggestPart", uiGroup: "Line No." },

    manufacturer_name: { dataType: "string", uiType: "input", label: "Manufacturer Name", defaultVal: "", 
                         icon: "#icon_SuggestPart", maxLength: 200, uiGroup: "Manufacturer"},

    manufacturer_part_number: { dataType: "string", uiType: "input", label: "Manufacturer Part Number", 
                                defaultVal: "", icon: "#icon_SuggestPart", maxLength: 100, uiGroup: "Manufacturer"},

    need_by_date: { dataType: "date", uiType: "calendar", label: "Requested Date", defaultVal: "Wed Jan 20 2016 12:18:23 GMT+0530 (IST)", 
                    isMandatory: true, icon: "#icon_SuggestPart", uiGroup: "Requested Date"},

    other_charges: { dataType: "decimal", uiType: "input", label: "Other Charges", defaultVal: null, icon: "#icon_SuggestPart", 
                     numDecimals: 2, uiGroup: "Other Charges"},
};

prim_keys.forEach(function(key){
	item[key] = settingsGenerator.getPropSettings(uiSchema[key]);
});

module.exports = item;

 



























