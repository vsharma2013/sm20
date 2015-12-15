var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/requisitiondb4';
var ObjectID = require('mongodb').ObjectID;

var coll_settings_abm  = 'ABM_Settings';
var coll_req_abm       = 'ABM_Requisitions';
var coll_settings_camc = 'CAMC_Settings';
var coll_req_camc      = 'CAMC_Requisitions';

var arrInt1to5 = [1,2,3,4,5];
var districts = ['8032-LL012-Atlanta', '8015-CP001-AGS Hopkinsville', 'DoNotUse-District - SSID_OLDInactive-DoNotUse-SuperRegion'];
var jobs = ['Allied Waste Svc (BFI) - Lawre', 'Bureau of ATF Century Center', 'ATLANTA LMU07', 'O&M Maint.Ft. Knox KY', 'AGS HOPKINSVILLE BMR01', 'Dallas Project Job #2', 'Fort Knox O&M Job XX', 'JIOC-A Supply', 'BOSI'];
var erpOrderTypes = ['Internal Order','Sales Order','Cost Centre Order','MRP Order','Work Order'];
var shippingMethods = ['Best Available', 'FedEx Opti Freight (No: 477648983)'];
var procurementOptions = ['Procurable', 'From Inventory'];
var inventoryTypes = ['Not Applicable', 'Stock', 'Non-Stock'];
var yesNo = ['Yes','No'];
var accTypes = ['%', '#'];
var segs = ['Building Energy Solutions-ESS', 'Building Energy Solutions-ESS_OLDInactive', 'DoNotUse-Segment-DoNotUse-Segment'];
var divs = ['ENG-Building Energy Solutions DV', 'DoNotUse-Division-DoNotUse-Division'];
var sprRgns = ['EEB-ABM Bldg. Energy Sol ABES', 'EGS-ABM Government Services AGS', 'DoNotUse-SuperRegion-DoNotUse-SuperRegion'];
var rgns = ['ELS-ABES ABM Bldg Solutions ABS', 'EGB-AGS O M Med Projects OMP','DoNotUse-Region-DoNotUse-Region'];
var sprBranches = ['ABM Building Solutions, LLC-E35', 'ABM Government Services, LLC-E50', 'DoNotUse-SuperRegion-DoNotUse-SuperBranch'];
var branches = ['Atlanta-80320', 'AGS Hopkinsville-80150', 'DoNotUse-SuperRegion-DoNotUse-Branch'];
var glAccs = ['AcctReceivableAcct-8032.C0040.130000000', 'Petty Cash-021011.025.0001.00.00.1050000', 'A/R Billed Trade-021011.025.0001.00.00.1110000', 'Short Term N/R-021011.025.0001.00.00.1140001', 'Empl Advances-021011.025.0001.00.00.1160000', 'Employee PR Reimbursement-021011.025.0001.00.00.1160005', 'A/R Qatar-021011.025.0001.00.00.1195902', 'Receivables Interco LNC-021011.025.0001.00.00.1210LNC', 'Inventory-021011.025.0001.00.00.1397237', 'Prepaid Immersion-021011.025.0001.00.00.1510010'];
var corporations = ['10-CAMC', '15-CAMC FOUNDATION', '40-CAMC HEALTH SYSTEM', '45-CHERI', '50-INTEGRATED HEALTH CARE', '87-WCH BUILDING PARTNERSHIP', '88-GEN DIV MSOB PARTNERSHIP', '89-HOUSING CORP'];
var departments = ['42023-2 EAST', '10000-BALANCE SHEET', '21900-CORPORATE ADMINISTRATION', '21908-CLINICAL ENGINEERING', '21910-MAILROOM', '21911-CLINICAL ENGINEERING-TVH', '21912-HOUSEKEEPING OFFSITE', '21914-WASTE MANAGEMENT INCINERATOR', '21916-MSOB Housekeeping', '21918-HUMAN RESOURCES'];
var accNumbers = ['10200-Balance Sheet Account', '13510-Inventory-Central Supply-Gen', '13910-Prepaid Other', '15700-Fixed Asset Clearing', '15910-Construction-In-Progress', '15920-Work-In-Process', '67020-Health Insurance', '67021-Employee Disc-Med Svcs-Invalid(Braxton)', '67030-Prescription Insurance', '67040-Dental Insurance', '67045-Vision-Employee', '67050-Short Term Disability (STD)', '67060-Long Term Disability (LTD)', '67070-Life Insurance-Employee', '67080-Accidental Death-Inactive', '67085-401K Ret Plan (employer contr)'];
var subAccNumbers = ['0000-0000', 'Test Sub-Account Number-Test SAN 0', 'Test Sub-Account Number-Test SAN 1', 'Test Sub-Account Number-Test SAN 2', 'Test Sub-Account Number-Test SAN 3', 'Test Sub-Account Number-Test SAN 4'];
var activityCodes = ['100-PETTY CASH- PHYSICIAN RECRUIT', '120-DRAWER -GENERAL CASHIER TIL', '14428-WC RADIOLGY LKER REMOVL/NO BUD', '14470-IS Sorian Med Manager', '15-IHCPI Cash Drawer-Assoc Cardio', '15012-WC Step Down Unit 5th Fl ICU', '15081-WCH Kitchen Remodeling', '20000-CAMC-PATHOLOGY LAB-SPECIAL ACC', '24569-GEN- SEIMANS CONTRACT/NO BUD', '25135-419 Brooks St Renovations'];
var accountCats = ['Cat1', 'Cat2', 'Cat3'];

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
				ui : getUIPropSchema('string', 'Requsition Name', '', 1, []),
				db : {}
			},
			req_num : {
				ui : getUIPropSchema('string', 'Requsition Number', '', 0, []),
				db : {}
			},
			req_requester : {
				ui : getUIPropSchema('string', 'Requester', '', 0, []),
				db : {}
			},
			req_obo : {
				ui : getUIPropSchema('string', 'Create On Behalf Of', '', 0, []),
				db : {}
			},
			req_ship_to : {
				ui : getUIPropSchema('string', 'Ship to', '', 0, []),
				db : {}
			},
			req_ship_to_address : {
				ui : getUIPropSchema('string', 'Ship To Address', '', 0, []),
				db : {}
			},
			req_bill_to : {
				ui : getUIPropSchema('string', 'Bill to', '', 0, []),
				db : {}
			},
			req_bill_to_address : {
				ui : getUIPropSchema('string', 'Bill to Address', '', 0, []),
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
			district : {
				ui : getUIPropSchema('string', 'District', '', 1, districts),
				db : {}
			},
			job : {
				ui : getUIPropSchema('string', 'Job', 'Allied Waste Svc (BFI) - Lawre', 1, jobs),
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
			item_partner : {
				ui : getUIPropSchema('string', 'Partner', '', 0, []),
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
			item_ship_to : {
				ui : getUIPropSchema('string', 'Ship to', '', 1, []),
				db : {}
			},
			item_ship_to_address : {
				ui : getUIPropSchema('string', 'Ship To Address', '', 0, []),
				db : {}
			},
			item_category : {
				ui : getUIPropSchema('string', 'Category', '', 0, []),
				db : {}
			},
			item_contract_num : {
				ui : getUIPropSchema('string', 'Contract Number', '', 1, []),
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
				ui : getUIPropSchema('string', 'Shipping Method', '', 1, shippingMethods),
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
			item_accounting_requester : {
				ui : getUIPropSchema('string', 'Requester', '', 0, []),
				db : {}
			},
			item_accounting_segment : {
				ui : getUIPropSchema('string', 'Segment', '', 1, segs),
				db : {}
			},
			item_accounting_division : {
				ui : getUIPropSchema('string', 'Division', '', 1, divs),
				db : {}
			},
			item_accounting_super_region : {
				ui : getUIPropSchema('string', 'Super Region', '', 1, sprRgns),
				db : {}
			},
			item_accounting_region : {
				ui : getUIPropSchema('string', 'Region', '', 1, rgns),
				db : {}
			},
			item_accounting_super_branch : {
				ui : getUIPropSchema('string', 'Super Branch', '', 1, sprBranches),
				db : {}
			},
			item_accounting_branch : {
				ui : getUIPropSchema('string', 'Branch', '', 1, branches),
				db : {}
			},
			item_accounting_dist_ssid : {
				ui : getUIPropSchema('string', 'District SSID', '', 1, districts),
				db : {}
			},
			item_accounting_job : {
				ui : getUIPropSchema('string', 'Job', '', 1, jobs),
				db : {}
			},
			item_accounting_gl_account : {
				ui : getUIPropSchema('string', 'GL Account', '', 1, glAccs),
				db : {}
			},
		}
	}
};

var settings_camc = {
    setup: {
        primary: {
            req_name: {
                ui: getUIPropSchema('string', 'Requsition Name', '', 0, []),
                db: {}
            },
            req_num: {
                ui: getUIPropSchema('string', 'Requsition Number', '', 0, []),
                db: {}
            },
            req_requester: {
                ui: getUIPropSchema('string', 'Requester', '', 0, []),
                db: {}
            },
            req_obo: {
                ui: getUIPropSchema('string', 'Create On Behalf Of', '', 0, []),
                db: {}
            },
            req_ship_to: {
                ui: getUIPropSchema('string', 'Ship to', '', 0, []),
                db: {}
            },
            req_ship_to_address: {
                ui: getUIPropSchema('string', 'Ship To Address', '', 0, []),
                db: {}
            },
            req_bill_to: {
                ui: getUIPropSchema('string', 'Bill to', '', 0, []),
                db: {}
            },
            req_bill_to_address: {
                ui: getUIPropSchema('string', 'Bill to Address', '', 0, []),
                db: {}
            },
            req_currency: {
                ui: getUIPropSchema('string', 'Currency', '', 0, []),
                db: {}
            }

        },
        custom: {
            mark_as_urgent: {
                ui: getUIPropSchema('bool', 'Mark as Urgent', 0, 1, [0, 1]),
                db: {}
            },
            corporation: {
                ui: getUIPropSchema('string', 'Corporation', '', 1, corporations),
                db: {}
            },
            deliver_to: {
                ui: getUIPropSchema('string', 'Deliver To', '', 1, []),
                db: {}
            }
        }
    },
    item: {
        primary: {
            item_line_no: {
                ui: getUIPropSchema('int', 'Line Number', 0, 0, []),
                db: {}
            },
            item_num: {
                ui: getUIPropSchema('string', 'Item Number', '', 0, []),
                db: {}
            },
            item_item: {
                ui: getUIPropSchema('string', 'Item', '', 1, []),
                db: {}
            },
            item_partner_item_num: {
                ui: getUIPropSchema('string', 'Partner Item Number', '', 0, []),
                db: {}
            },
            item_quantity: {
                ui: getUIPropSchema('float', 'Quantity', '', 1, []),
                db: {}
            },
            item_uom: {
                ui: getUIPropSchema('string', 'UOM', '', 0, []),
                db: {}
            },
            item_unitprice: {
                ui: getUIPropSchema('float', 'Unit Price', '', 1, []),
                db: {}
            },
            item_total: {
                ui: getUIPropSchema('float', 'Total', '', 0, []),
                db: {}
            },
            item_requested_date: {
                ui: getUIPropSchema('date', 'Requested Date', '', 0, []),
                db: {}
            },
            item_need_by_date: {
                ui: getUIPropSchema('date', 'Need By Date', '', 1, []),
                db: {}
            },
            item_partner: {
                ui: getUIPropSchema('string', 'Partner', '', 0, []),
                db: {}
            },
            item_partner_code: {
                ui: getUIPropSchema('string', 'Partner Code', '', 0, []),
                db: {}
            },
            item_manufacturer_name: {
                ui: getUIPropSchema('string', 'Manufacturer Name', '', 0, []),
                db: {}
            },
            item_manufacturer_part_num: {
                ui: getUIPropSchema('string', 'Manufacturer Part Number', '', 0, []),
                db: {}
            },
            item_ship_to: {
                ui: getUIPropSchema('string', 'Ship to', '', 1, []),
                db: {}
            },
            item_ship_to_address: {
                ui: getUIPropSchema('string', 'Ship To Address', '', 0, []),
                db: {}
            },
            item_category: {
                ui: getUIPropSchema('string', 'Category', '', 0, []),
                db: {}
            },
            item_contract_num: {
                ui: getUIPropSchema('string', 'Contract Number', '', 1, []),
                db: {}
            },
            item_contract_name: {
                ui: getUIPropSchema('string', 'Contract Name', '', 0, []),
                db: {}
            },
            item_contract_value: {
                ui: getUIPropSchema('float', 'Contract Value', '', 0, []),
                db: {}
            },
            item_contract_expiry_date: {
                ui: getUIPropSchema('date', 'Contract Expiry Date', '', 0, []),
                db: {}
            },
            item_payment_terms: {
                ui: getUIPropSchema('int', 'Payment Terms', '', 0, []),
                db: {}
            }
        },
        custom: {
            item_shipping_deliver_to: {
                ui: getUIPropSchema('string', 'Deliver To', '', 1, []),
                db: {}
            },
            item_shipping_method: {
                ui: getUIPropSchema('string', 'Shipping Method', '', 1, shippingMethods),
                db: {}
            },
            item_others_procurement_option: {
                ui: getUIPropSchema('string', 'Procurement Option', '', 1, procurementOptions),
                db: {}
            },
            item_others_inventory_type: {
                ui: getUIPropSchema('', 'Inventory Type', '', 1, inventoryTypes),
                db: {}
            }
        }
    },
    split: {
        primary: {
            item_accounting_type: {
                ui: getUIPropSchema('int', 'Type', '', 1, []),
                db: {}
            },
            item_accounting_quantity: {
                ui: getUIPropSchema('float', 'Quantity', '', 1, []),
                db: {}
            },
            item_accounting_amount: {
                ui: getUIPropSchema('float', 'Amount', '', 0, []),
                db: {}
            },
        },
        custom: {
            item_accounting_requester: {
                ui: getUIPropSchema('string', 'Requester', '', 0, []),
                db: {}
            },
            item_accounting_corporation: {
                ui: getUIPropSchema('string', 'Corporation', '', 1, corporations),
                db: {}
            },
            item_accounting_department: {
                ui: getUIPropSchema('string', 'Department', '', 1, departments),
                db: {}
            },
            item_accounting_account_number: {
                ui: getUIPropSchema('string', 'Account Number', '', 1, accNumbers),
                db: {}
            },
            item_accounting_sub_account_numbers: {
                ui: getUIPropSchema('string', 'Sub-Account Number', '', 1, subAccNumbers),
                db: {}
            },
            item_accounting_activity_code: {
                ui: getUIPropSchema('string', 'Project/Activity Code', '', 1, activityCodes),
                db: {}
            },
            item_accounting_account_category: {
                ui: getUIPropSchema('string', 'Account Category', '', 1, accountCats),
                db: {}
            }
        }
    }
};

var randomVals = {
	abm : {
		req_name : getRandomVal('RQ-1001-0', 5),
		req_num : getRandomVal('RN-2001-1', 5),
		req_requester: getRandomVal('User-0', 5),
		req_obo : getRandomVal('OUser-0', 5),
		req_ship_to : getRandomVal('ST-', 5),
		req_ship_to_address : getRandomVal('ATS-', 5),
		req_bill_to : getRandomVal('BT-', 5),
		req_bill_to_address : getRandomVal('ATB-', 5),
		req_currency : getRandomItemFromArray(['USD', 'EUR', 'GBP', 'INR']),

		mark_as_urgent : 0,
		district: districts[0],
		job : jobs[0],
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
		item_partner : getRandomItemFromArray(['Partner-1', 'Partner-2', 'Partner-3', 'Partner-4', 'Partner-5', 'Partner-6']),
		item_partner_code : getRandomItemFromArray(['PC001', 'PC002', 'PC003', 'PC004', 'PC005', 'PC006']),
		item_manufacturer_name : getRandomItemFromArray(['Manuf-1', 'Manuf-2', 'Manuf-3', 'Manuf-4', 'Manuf-5', 'Manuf-6']),
		item_manufacturer_part_num : getRandomItemFromArray(['MF11', 'MF22', 'MF33', 'MF44', 'MF55']),
		item_ship_to : getRandomItemFromArray(['ST-1', 'ST-2', 'ST-3', 'ST-4', 'ST-5', 'ST-6', 'ST-7']),
		item_ship_to_address : getRandomItemFromArray(['ATS-11', 'ATS-22', 'ATS-33', 'ATS-44', 'ATS-55', 'ATS-66', 'ATS-77']),
		item_category : getRandomItemFromArray(['Cat-01', 'Cat-02', 'Cat-03', 'Cat-04', 'Cat-05', 'Cat-06', 'Cat-07']),
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
		item_accounting_requester : 'Administrator',
		item_accounting_segment : segs[0],
		item_accounting_division : divs[0],
		item_accounting_super_region : sprRgns[0],
		item_accounting_region : rgns[0],
		item_accounting_super_branch : sprBranches[0],
		item_accounting_branch : branches[0],
		item_accounting_dist_ssid : districts[0],
		item_accounting_job: jobs[0],
		item_accounting_gl_account : glAccs[0]
	},
	camc: {
	    req_name: getRandomVal('CRQ-1001-0', 5),
	    req_num: getRandomVal('CRN-2001-1', 5),
	    req_requester: getRandomVal('CUser-0', 5),
	    req_obo: getRandomVal('COUser-0', 5),
	    req_ship_to: getRandomVal('CST-', 5),
	    req_ship_to_address: getRandomVal('CATS-', 5),
	    req_bill_to: getRandomVal('CBT-', 5),
	    req_bill_to_address: getRandomVal('CATB-', 5),
	    req_currency: getRandomItemFromArray(['USD', 'EUR', 'GBP', 'INR']),

	    mark_as_urgent: 0,
	    corporation: corporations[0],
	    deliver_to: '',

	    item_line_no: getRandomItemFromArray([101, 102, 103, 104, 105, 106, 107]),
	    item_num: getRandomVal('INO005', 5),
	    item_item: getRandomVal('Line-Item-', 5),
	    item_partner_item_num: getRandomVal('Item-Pat-', 5),
	    item_quantity: getRandomItemFromArray([5, 7, 9, 11, 13, 20]),
	    item_uom: getRandomItemFromArray(['GZ', 'EA', 'DA', 'GB', 'HQ']),
	    item_unitprice: getRandomItemFromArray([5, 7, 9, 11, 13, 15]),
	    item_total: 0,
	    item_requested_date: getRandomItemFromArray(['2015/12/11', '2015/12/22', '2015/12/18', '2015/12/15', '2015/12/25']),
	    item_need_by_date: getRandomItemFromArray(['2016/01/11', '2016/02/22', '2016/03/18', '2016/04/15', '2016/05/25']),
	    item_partner: getRandomItemFromArray(['Partner-1', 'Partner-2', 'Partner-3', 'Partner-4', 'Partner-5', 'Partner-6']),
	    item_partner_code: getRandomItemFromArray(['PC001', 'PC002', 'PC003', 'PC004', 'PC005', 'PC006']),
	    item_manufacturer_name: getRandomItemFromArray(['Manuf-1', 'Manuf-2', 'Manuf-3', 'Manuf-4', 'Manuf-5', 'Manuf-6']),
	    item_manufacturer_part_num: getRandomItemFromArray(['MF11', 'MF22', 'MF33', 'MF44', 'MF55']),
	    item_ship_to: getRandomItemFromArray(['ST-1', 'ST-2', 'ST-3', 'ST-4', 'ST-5', 'ST-6', 'ST-7']),
	    item_ship_to_address: getRandomItemFromArray(['ATS-11', 'ATS-22', 'ATS-33', 'ATS-44', 'ATS-55', 'ATS-66', 'ATS-77']),
	    item_category: getRandomItemFromArray(['Cat-01', 'Cat-02', 'Cat-03', 'Cat-04', 'Cat-05', 'Cat-06', 'Cat-07']),
	    item_contract_num: getRandomItemFromArray(['CNO-9001', 'CNO-9002', 'CNO-9003', 'CNO-9004', 'CNO-9005']),
	    item_contract_name: getRandomItemFromArray(['CNO-SS1', 'CNO-SS2', 'CNO-SS3', 'CNO-SS4', 'CNO-SS5']),
	    item_contract_value: getRandomItemFromArray([125, 225, 335, 445, 534, 655]),
	    item_contract_expiry_date: getRandomItemFromArray(['2016/01/11', '2016/02/22', '2016/03/18', '2016/04/15', '2016/05/25']),
	    item_payment_terms: getRandomItemFromArray(arrInt1to5),

	    item_shipping_deliver_to: '',
	    item_shipping_method: null,
	    item_others_procurement_option: null,
	    item_others_inventory_type: procurementOptions[0],

	    item_accounting_type: getRandomItemFromArray(accTypes),
	    item_accounting_quantity: getRandomItemFromArray([5, 7, 9, 11, 13, 20]),
	    item_accounting_amount: 0,
	    item_accounting_requester: 'Administrator',
	    item_accounting_corporation: corporations[0],
	    item_accounting_department: departments[0],
	    item_accounting_account_number: accNumbers[0],
	    item_accounting_sub_account_numbers: subAccNumbers[0],
	    item_accounting_activity_code: activityCodes[0],
        item_accounting_account_category: accountCats[0]
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