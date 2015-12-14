var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/requisitiondb4';
var ObjectID = require('mongodb').ObjectID;

var coll_settings_abm  = 'ABM_Settings';
var coll_req_abm       = 'ABM_Requisitions';
var coll_settings_camc = 'CAMC_Settings';
var coll_req_camc      = 'CAMC_Requisitions';

var arrInt1to5 = [1,2,3,4,5];
var distNames = ['8032-LL012-Atlanta', '8015-CP001-AGS Hopkinsville', 'DoNotUse-District - SSID_OLDInactive-DoNotUse-SuperRegion'];
var jobNames = ['Allied Waste Svc (BFI) - Lawre', 'Bureau of ATF Century Center', 'ATLANTA LMU07', 'O&M Maint.Ft. Knox KY', 'AGS HOPKINSVILLE BMR01', 'Dallas Project Job #2', 'Fort Knox O&M Job XX', 'JIOC-A Supply', 'BOSI'];
var erpOrderTypes = ['Internal Order','Sales Order','Cost Centre Order','MRP Order','Work Order'];
var shippingMethods = ['Best Available', 'FedEx Opti Freight (No: 477648983)'];
var procurementOptions = ['Procurable','From Inventory'];
var yesNo = ['Yes','No'];
var accTypes = ['%', '#'];
var segNames = ['Building Energy Solutions-ESS', 'Building Energy Solutions-ESS_OLDInactive', 'DoNotUse-Segment-DoNotUse-Segment'];
var divNames = ['ENG-Building Energy Solutions DV', 'DoNotUse-Division-DoNotUse-Division'];
var sprRgnNames = ['EEB-ABM Bldg. Energy Sol ABES', 'EGS-ABM Government Services AGS', 'DoNotUse-SuperRegion-DoNotUse-SuperRegion'];
var rgnNames = ['ELS-ABES ABM Bldg Solutions ABS', 'EGB-AGS O M Med Projects OMP','DoNotUse-Region-DoNotUse-Region'];
var sprBranchNames = ['ABM Building Solutions, LLC-E35', 'ABM Government Services, LLC-E50', 'DoNotUse-SuperRegion-DoNotUse-SuperBranch'];
var branchNames = ['Atlanta-80320', 'AGS Hopkinsville-80150', 'DoNotUse-SuperRegion-DoNotUse-Branch'];
var ssidNames = ['8032-LL012-Atlanta', '8015-CP001-AGS Hopkinsville', 'DoNotUse-District - SSID_OLDInactive-DoNotUse-SuperRegion'];
var glAccNames = ['AcctReceivableAcct-8032.C0040.130000000', 'Petty Cash-021011.025.0001.00.00.1050000', 'A/R Billed Trade-021011.025.0001.00.00.1110000', 'Short Term N/R-021011.025.0001.00.00.1140001', 'Empl Advances-021011.025.0001.00.00.1160000', 'Employee PR Reimbursement-021011.025.0001.00.00.1160005', 'A/R Qatar-021011.025.0001.00.00.1195902', 'Receivables Interco LNC-021011.025.0001.00.00.1210LNC', 'Inventory-021011.025.0001.00.00.1397237', 'Prepaid Immersion-021011.025.0001.00.00.1510010'];


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
	return getRandomItemFromArray(getArrayWithPrefix(prefix, count));
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
				ui : getUIPropSchema('string', 'District Name', '8032-LL012-Atlanta', 1, distNames),
				db : {}
			},
			job_name : {
				ui : getUIPropSchema('string', 'Job Name', 'Allied Waste Svc (BFI) - Lawre', 1, jobNames),
				db : {}
			},
			erp_order_type : {
				ui : getUIPropSchema('ddlist', 'ERP Order Type', null, 1, erpOrderTypes),
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
			item_contract_num : {
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
				ui : getUIPropSchema('int', 'Shipping Method', '', 1, shippingMethods),
				db : {}
			},
			item_others_procurement_option : {
				ui : getUIPropSchema('int', 'Procurement Option', '', 1, procurementOptions),
				db : {}
			},
			item_others_capitalized : {
				ui : getUIPropSchema('bool', 'Capitalized', '', 1, yesNo),
				db : {}
			},
			item_others_billable: {
				ui : getUIPropSchema('bool', 'Billable', '', 1, yesNo),
				db : {}
			}
		}
	},
	split : {
		primary : {
			item_accounting_type : {
				ui : getUIPropSchema('int', 'Type', '', 1, []),
				db : {}
			},
			item_accounting_quantity : {
				ui : getUIPropSchema('float', 'Quantity', '', 1, []),
				db : {}
			},
			item_accounting_amount : {
				ui : getUIPropSchema('float', 'Amount', '', 0, []),
				db : {}
			},
		},
		custom : {
			item_accounting_requestor_name : {
				ui : getUIPropSchema('string', 'Requestor Name', '', 0, []),
				db : {}
			},
			item_accounting_segment_name : {
				ui : getUIPropSchema('string', 'Segment Name', '', 1, segNames),
				db : {}
			},
			item_accounting_division_name : {
				ui : getUIPropSchema('string', 'Division Name', '', 1, divNames),
				db : {}
			},
			item_accounting_super_region_name : {
				ui : getUIPropSchema('string', 'Super Region Name', '', 1, sprRgnNames),
				db : {}
			},
			item_accounting_region_name : {
				ui : getUIPropSchema('string', 'Region Name', '', 1, rgnNames),
				db : {}
			},
			item_accounting_super_branch_name : {
				ui : getUIPropSchema('string', 'Super Branch Name', '', 1, sprBranchNames),
				db : {}
			},
			item_accounting_branch_name : {
				ui : getUIPropSchema('string', 'Branch Name', '', 1, branchNames),
				db : {}
			},
			item_accounting_dist_ssid_name : {
				ui : getUIPropSchema('string', 'District SSID', '', 1, ssidNames),
				db : {}
			},
			item_accounting_job_name : {
				ui : getUIPropSchema('string', 'Job Name', '', 1, jobNames),
				db : {}
			},
			item_accounting_gl_account_name : {
				ui : getUIPropSchema('string', 'GLAccount Name', '', 1, glAccNames),
				db : {}
			},
		}
	}
};


var randomVals = {
	abm : {
		req_name : getRandomVal('RQ-1001-0', 5),
		req_num : getRandomVal('RN-2001-1', 5),
		req_user_id : getRandomItemFromArray(arrInt1to5),
		req_user_name : getRandomVal('User-0', 5),
		req_obo_id : getRandomItemFromArray(arrInt1to5),
		req_obo_name : getRandomVal('User-0', 5),
		req_ship_to_id : getRandomItemFromArray(arrInt1to5),
		req_ship_to_name : getRandomVal('ST-', 5),
		req_ship_to_address : getRandomVal('ATS-', 5),
		req_bill_to_id : getRandomItemFromArray(arrInt1to5),
		req_bill_to_name : getRandomVal('BT-', 5),
		req_bill_to_address : getRandomVal('ATB-', 5),
		req_currency : getRandomItemFromArray(['USD', 'EUR', 'GBP', 'INR']),

		mark_as_urgent : 0,
		district_name : distNames[0],
		job_name : jobNames[0],
		erp_order_type : null,
		work_order : '',
		deliver_to : '',

		item_line_no : getRandomItemFromArray([101, 102, 103, 104, 105, 106, 107]),
		item_num : getRandomVal('INO005', 5),
		item_item : getRandomVal('Line-Item-', 5),
		item_partner_item_num : getRandomVal('Item-Pat-', 5),
		item_quantity : getRandomItemFromArray([5,7,9,11,13,20]),
		item_uom : getRandomItemFromArray(['GZ', 'EA', 'DA', 'GB', 'HQ']),
		item_unitprice : getRandomItemFromArray([5, 7, 9, 11, 13, 15]),
		item_total : 0,
		item_requested_date : getRandomItemFromArray(['2015/12/11', '2015/12/22', '2015/12/18', '2015/12/15', '2015/12/25']),
		item_need_by_date : getRandomItemFromArray(['2016/01/11', '2016/02/22', '2016/03/18', '2016/04/15', '2016/05/25']),
		item_partner_id : getRandomItemFromArray([191, 192, 193, 194, 195, 196, 197]),
		item_partner_name : getRandomItemFromArray(['Partner-1', 'Partner-2', 'Partner-3', 'Partner-4', 'Partner-5', 'Partner-6']),
		item_partner_code : getRandomItemFromArray(['PC001', 'PC002', 'PC003', 'PC004', 'PC005', 'PC006']),
		item_manufacturer_name : getRandomItemFromArray(['Manuf-1', 'Manuf-2', 'Manuf-3', 'Manuf-4', 'Manuf-5', 'Manuf-6']),
		item_manufacturer_part_num : getRandomItemFromArray(['MF11', 'MF22', 'MF33', 'MF44', 'MF55']),
		item_ship_to_id : getRandomItemFromArray([111, 112, 113, 114, 115, 116, 117]),
		item_ship_to_name : getRandomItemFromArray(['ST-1', 'ST-2', 'ST-3', 'ST-4', 'ST-5', 'ST-6', 'ST-7']),
		item_ship_to_address : getRandomItemFromArray(['ATS-11', 'ATS-22', 'ATS-33', 'ATS-44', 'ATS-55', 'ATS-66', 'ATS-77']),
		item_category_id : getRandomItemFromArray([181, 182, 183, 184, 185, 186, 187]),
		item_category_name : getRandomItemFromArray(['Cat-01', 'Cat-02', 'Cat-03', 'Cat-04', 'Cat-05', 'Cat-06', 'Cat-07']),
		item_contract_num : getRandomItemFromArray(['CNO-9001', 'CNO-9002', 'CNO-9003', 'CNO-9004', 'CNO-9005']),
		item_contract_name : getRandomItemFromArray(['CNO-SS1', 'CNO-SS2', 'CNO-SS3', 'CNO-SS4', 'CNO-SS5']),
		item_contract_value : getRandomItemFromArray([125, 225, 335, 445, 534, 655]),
		item_contract_expiry_date : getRandomItemFromArray(['2016/01/11', '2016/02/22', '2016/03/18', '2016/04/15', '2016/05/25']),
		item_payment_terms : getRandomItemFromArray(arrInt1to5),

		item_shipping_deliver_to : '',
		item_shipping_method : null,
		item_others_procurement_option : null,
		item_others_capitalized : 'No',
		item_others_billable : null,

		item_accounting_type : getRandomItemFromArray(accTypes),
		item_accounting_quantity : getRandomItemFromArray([5,7,9,11,13,20]),
		item_accounting_amount : 0,
		item_accounting_requestor_name : 'Administrator',
		item_accounting_segment_name : segNames[0],
		item_accounting_division_name : divNames[0],
		item_accounting_super_region_name : sprRgnNames[0],
		item_accounting_region_name : rgnNames[0],
		item_accounting_super_branch_name : sprBranchNames[0],
		item_accounting_branch_name : branchNames[0],
		item_accounting_dist_ssid_name : ssidNames[0],
		item_accounting_job_name : getRandomVal('Job-', 5),
		item_accounting_gl_account_name : glAccNames[0]
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
	
	item_db.accounting = [];
	item_ui.accounting = [];

	for(var j = 0 ; j < 3; j++){
		var acc_ui = {};
		var acc_db = {};
		for (var pk in settings_abm.split.primary){
			var pv = settings_abm.split.primary[pk].ui;
			pv.val = randomVals.abm[pk] ? randomVals.abm[pk] : null;		
			acc_ui[pk] = pv;
			acc_db[pk] = pv.val;		
		}

		acc_ui.customProps = [];
		acc_db.customProps = {};

		for (var ck in settings_abm.split.custom){
			var cv = settings_abm.split.custom[ck].ui;
			cv.val = randomVals.abm[ck] ? randomVals.abm[ck] : null;
			cv.key = ck;
			acc_ui.customProps.push(cv);
			acc_db.customProps[ck] = cv.val;
		}

		item_db.accounting.push(acc_db);
		item_ui.accounting.push(acc_ui);
	}

	req_abm_db.items.push(item_db);
	req_abm_ui.items.push(item_ui);
}

console.log(JSON.stringify([req_abm_db, req_abm_ui]));