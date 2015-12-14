var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/requisitiondb4';
var ObjectID = require('mongodb').ObjectID;

var coll_settings_abm  = 'ABM_Settings';
var coll_req_abm       = 'ABM_Requisitions';
var coll_settings_camc = 'CAMC_Settings';
var coll_req_camc      = 'CAMC_Requisitions';

var sCPSchema = '{"type" : "", "label" : "", "defaultVal" : "", "allowEdit" : 0, "allVals" : []}';
function getUIPropSchema (type, label, defaultVal, allowEdit, allVals) {
  var cp = JSON.parse(sCPSchema);
  cp.type = type;
  cp.label = label;
  cp.allowEdit = allowEdit,
  cp.defaultVal = defaultVal,
  cp.allVals = allVals;
  return cp;
}

function getRandomItemFromArray(arr){
  return arr[randomIntFromInterval(0,arr.length-1)];
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function getArrayWithPrefix(prefix, count){
  var arr = [];
  for(var i = 1; i <= count; i++)
    arr.push(prefix + i);
  return arr;
}

function getRandomVal(prefix, count){
	getRandomItemFromArray(getArrayWithPrefix(prefix, count));
}

var settings_abm = {
	setup : {
		primary : {
			req_name : {
				ui : getUIPropSchema('string', 'Requsition Name', '', 0, []),
				db : {}
			},
			req_num : {
				ui : getUIPropSchema('string', 'Requsition Number', '', 0, []),
				db : {}
			},
			req_user_id : {
				ui : getUIPropSchema('int', 'Requestor Id', '', 0, []),
				db : {}
			},
			req_user_name : {
				ui : getUIPropSchema('string', 'Requestor Name', '', 0, []),
				db : {}
			},
			req_obo_id : {
				ui : getUIPropSchema('int', 'Create On Behalf Of Id', '', 0, []),
				db : {}
			},
			req_obo_name : {
				ui : getUIPropSchema('string', 'Create On Behalf Of Name', '', 0, []),
				db : {}
			},
			req_ship_to_id : {
				ui : getUIPropSchema('int', 'Ship To Id', '', 0, []),
				db : {}
			},
			req_ship_to_name : {
				ui : getUIPropSchema('string', 'Ship To Name', '', 0, []),
				db : {}
			},
			req_ship_to_address : {
				ui : getUIPropSchema('string', 'Ship To Address', '', 0, []),
				db : {}
			},
			req_bill_to_id : {
				ui : getUIPropSchema('int', 'Bill To Id', '', 0, []),
				db : {}
			},
			req_bill_to_name : {
				ui : getUIPropSchema('string', 'Bill To Name', '', 0, []),
				db : {}
			},
			req_bill_to_address : {
				ui : getUIPropSchema('string', 'Bill To Address', '', 0, []),
				db : {}
			},
			req_currency : {
				ui : getUIPropSchema('string', 'Currency', '', 0, []),
				db : {}
			}

		},
		custom : {
			mark_as_urgent : {
				ui : getUIPropSchema('bool', 'Mark as Urgent', 0, 1, [0,1]),
				db : {}
			},
			district_name : {
				ui : getUIPropSchema('string', 'District Name', '8032-LL012-Atlanta', 1, ['8032-LL012-Atlanta', '8015-CP001-AGS Hopkinsville', 'DoNotUse-District - SSID_OLDInactive-DoNotUse-SuperRegion']),
				db : {}
			},
			job_name : {
				ui : getUIPropSchema('string', 'Job Name', 'Allied Waste Svc (BFI) - Lawre', 1, ['Allied Waste Svc (BFI) - Lawre', 'Bureau of ATF Century Center', 'ATLANTA LMU07', 'O&M Maint.Ft. Knox KY', 'AGS HOPKINSVILLE BMR01', 'Dallas Project Job #2', 'Fort Knox O&M Job XX', 'JIOC-A Supply', 'BOSI']),
				db : {}
			},
			erp_order_type : {
				ui : getUIPropSchema('ddlist', 'ERP Order Type', null, 1, ['Internal Order','Sales Order','Cost Centre Order','MRP Order','Work Order']),
				db : {}
			},
			work_order : {
				ui : getUIPropSchema('string', 'Work Order', '', 1, []),
				db : {}
			},
			deliver_to : {
				ui : getUIPropSchema('string', 'Deliver To', '', 1, []),
				db : {}
			},
		}
	},
	item : {
		primary : {
			item_line_no : {
				ui : getUIPropSchema('int', 'Line Number', 0, 0, []),
				db : {}
			},
			item_num : {
				ui : getUIPropSchema('string', 'Item Number', '', 0, []),
				db : {}
			},
			item_item : {
				ui : getUIPropSchema('string', 'Item', '', 1, []),
				db : {}
			},
			item_partner_item_num : {
				ui : getUIPropSchema('string', 'Partner Item Number', '', 0, []),
				db : {}
			},
			item_quantity : {
				ui : getUIPropSchema('float', 'Quantity', '', 1, []),
				db : {}
			},
			item_uom : {
				ui : getUIPropSchema('string', 'UOM', '', 0, []),
				db : {}
			},
			item_unitprice : {
				ui : getUIPropSchema('float', 'Unit Price', '', 1, []),
				db : {}
			},
			item_total : {
				ui : getUIPropSchema('float', 'Total', '', 0, []),
				db : {}
			},
			item_requested_date : {
				ui : getUIPropSchema('date', 'Requested Date', '', 0, []),
				db : {}
			},
			item_need_by_date : {
				ui : getUIPropSchema('date', 'Need By Date', '', 1, []),
				db : {}
			},
			item_partner_id : {
				ui : getUIPropSchema('int', 'Partner Id', '', 0, []),
				db : {}
			},
			item_partner_name : {
				ui : getUIPropSchema('string', 'Partner Name', '', 0, []),
				db : {}
			},
			item_partner_code : {
				ui : getUIPropSchema('string', 'Partner Code', '', 0, []),
				db : {}
			},
			item_manufacturer_name : {
				ui : getUIPropSchema('string', 'Manufacturer Name', '', 0, []),
				db : {}
			},
			item_manufacturer_part_num : {
				ui : getUIPropSchema('string', 'Manufacturer Part Number', '', 0, []),
				db : {}
			},
			item_ship_to_id : {
				ui : getUIPropSchema('int', 'Ship To Id', '', 1, []),
				db : {}
			},
			item_ship_to_name : {
				ui : getUIPropSchema('string', 'Ship To Name', '', 1, []),
				db : {}
			},
			item_ship_to_address : {
				ui : getUIPropSchema('string', 'Ship To Address', '', 0, []),
				db : {}
			},
			item_category_id : {
				ui : getUIPropSchema('int', 'Category Id', '', 0, []),
				db : {}
			},
			item_category_name : {
				ui : getUIPropSchema('string', 'Category Name', '', 0, []),
				db : {}
			},
			item_ccontract_num : {
				ui : getUIPropSchema('string', 'Category Name', '', 1, []),
				db : {}
			},
			item_contract_name : {
				ui : getUIPropSchema('string', 'Contract Name', '', 0, []),
				db : {}
			},
			item_contract_value : {
				ui : getUIPropSchema('float', 'Contract Value', '', 0, []),
				db : {}
			},
			item_contract_expiry_date : {
				ui : getUIPropSchema('date', 'Contract Expiry Date', '', 0, []),
				db : {}
			},
			item_payment_terms : {
				ui : getUIPropSchema('int', 'Payment Terms', '', 0, []),
				db : {}
			}
		},
		custom : {
			item_shipping_deliver_to : {
				ui : getUIPropSchema('string', 'Deliver To', '', 1, []),
				db : {}
			},
			item_shipping_method : {
				ui : getUIPropSchema('int', 'Shipping Method', '', 1, []),
				db : {}
			},
			item_others_procurement_option : {
				ui : getUIPropSchema('int', 'Procurement Option', '', 1, []),
				db : {}
			},
			item_others_capitalized : {
				ui : getUIPropSchema('bool', 'Capitalized', '', 1, []),
				db : {}
			},
			item_others_billable: {
				ui : getUIPropSchema('bool', 'Billable', '', 1, []),
				db : {}
			}
		}
	},
	split : {
		primary : {

		},
		custom : {
			
		}
	}
};

var randomVals = {
	abm : {
		req_name : getRandomVal('RQ1001-0', 5)
	}
}


var req_abm_ui = {};
var req_abm_db = {};

for (var pk in settings_abm.setup.primary){
	var pv = settings_abm.setup.primary[pk].ui;
	pv.val = randomVals.abm[pk] ? randomVals.abm[pk] : null;		
	req_abm_ui[pk] = pv;
	req_abm_db[pk] = pv.val;
}

req_abm_ui.customProps = [];
req_abm_db.customProps = {};

for (var ck in settings_abm.setup.custom){
	var cv = settings_abm.setup.custom[ck].ui;
	cv.val = randomVals.abm[ck] ? randomVals.abm[ck] : null;
	cv.key = ck;
	req_abm_ui.customProps.push(cv);
	req_abm_db.customProps[ck] = cv.val;
}

req_abm_db.items = [];
req_abm_ui.items = [];

for (var i = 0; i < 5 ; i++){
	var item_ui = {};
	var item_db = {};
	for (var pk in settings_abm.item.primary){
		var pv = settings_abm.item.primary[pk].ui;
		pv.val = randomVals.abm[pk] ? randomVals.abm[pk] : null;		
		item_ui[pk] = pv;
		item_db[pk] = pv.val;		
	}
	item_db.customProps = {};
	item_ui.customProps = [];
	for (var ck in settings_abm.item.custom){
		var cv = settings_abm.item.custom[ck].ui;
		cv.val = randomVals.abm[ck] ? randomVals.abm[ck] : null;
		cv.key = ck;
		item_ui.customProps.push(cv);
		item_db.customProps[ck] = cv.val;
	}
	req_abm_db.items.push(item_db);
	req_abm_ui.items.push(item_ui);
}

console.log(JSON.stringify([req_abm_db, req_abm_ui]));