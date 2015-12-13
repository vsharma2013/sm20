var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/requisitiondb4';
var ObjectID = require('mongodb').ObjectID;

var coll_settings_abm  = 'ABM_Settings';
var coll_req_abm       = 'ABM_Requisitions';
var coll_settings_camc = 'CAMC_Settings';
var coll_req_camc      = 'CAMC_Requisitions';

var sCPSchema = '{"type" : "", "label" : "", "val": "", "allowEdit" : 0, "defaultVal" : "", "allVals" : []}';
function getUIPropSchema (type, label, val, defaultVal, allowEdit, allVals) {
  var cp = JSON.parse(sCPSchema);
  cp.type = type;
  cp.label = label;
  cp.val = val;
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
    arr.push(prefix + '-' + i);
  return arr;
}

var settings_abm = {
	setup : {
		primary : {
			req_name : {
				ui : getUIPropSchema('string', 'Requsition Name', '', '', 0, []),
				db : {}
			},

		},
		custom : {
			erp_order_type : {
				ui : getUIPropSchema('ddlist', 'ERP Order Type', null, null, 1, ['Internal Order','Sales Order','Cost Centre Order','MRP Order','Work Order'])
			}
		}
	},
	item : {
		primary : {

		},
		custom : {
			
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
		req_name : getRandomItemFromArray(getArrayWithPrefix('Req Name ', 5))
	}
}


var req_abm_ui = {};
var req_abm_mongo = {};

for (var pk in settings_abm.setup.primary){
	var pv = settings_abm.setup.primary[pk].ui;
	if(randomVals.abm[pk]) 
		pv.val = randomVals.abm[pk];
	req_abm_ui[pk] = pv;
	req_abm_mongo[pk] = pv.val;
}

req_abm_ui.customProps = [];
req_abm_mongo.customProps = {};

for (var ck in settings_abm.setup.custom){
	var cv = settings_abm.setup.custom[ck].ui;
	if(randomVals.abm[ck]) 
		cv.val = randomVals.abm[ck];
	cv.key = ck;
	req_abm_ui.customProps.push(cv);
	req_abm_mongo.customProps[ck] = cv.val;
}

console.log(JSON.stringify([req_abm_mongo, req_abm_ui]));