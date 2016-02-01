'use strict';

var mongodb = require('mongodb').MongoClient;
var express = require('express');
var apiRouter = express.Router();
var co = require('co');
var needle = require('needle');
var rest = require('restler');
var http = require('http');
var Q = require('q');

var latest_id = 1;
var r_id = 1;
var c_str = 'mongodb://192.168.1.109:27017/riteaid';


var server_ip = 'http://192.168.1.210:9090/api/'

function createRequisitionDocument(req, res){
	var url = server_ip + 'req/abm';

	needle.post(url, {}, function(e, srvResp){

		var req = getDocOrSendErrResponse(res, srvResp, 'error in creating requisition document');

		if(!req) return;
		
		req.requisitionID = 'REQ-ABM-0000' + r_id; r_id++;
		req.requisitionName = 'ABM-Lenovo-00' + r_id; r_id++;

		needle.put(url, req, function(e, srvResp2){

			var req2 = getDocOrSendErrResponse(res, srvResp2, 'error in saving requisition document');

			if(!req2) return;

			latest_id = req2.id;

			return res.json({success: true, req : req2});
		});		
	});
}

function getRequisitionDocument(req, res){
	var url = server_ip + 'req/riteaid/' + getRandomInt();

	rest.get(url).on('complete', function(result) {
  	if (result instanceof Error) {
	    console.log('Error:', result.message);
	    res.json({success: false, result : 'error in reading the requisition document'});
	  } else {
	    res.send(result);
	  }
	});

}

function saveRequisitionDocument(req, res){
	var url = server_ip + 'req/riteaid';
	var getDoc = {
		send : function(data){
			var req = getDocOrSendErrResponse(res, data, 'error in reading the requisition document');

			if(!req) return;
req.id = parseInt(req.id);
req.version = parseInt(req.version);
			needle.put(url, req, function(e, rs2){
				var req2 = getDocOrSendErrResponse(res, rs2, 'error in saving the requisition document');
				
				if(!req2) return;

				return res.json({success: true, req : req2});
			});	
		}
	};

	getRequisitionDocument(req, getDoc);
}

function getDocOrSendErrResponse(httpResp, srvResp, err){
	if(srvResp && srvResp.body && srvResp.body.success && srvResp.body.req && srvResp.body.req.hasOwnProperty('requisitionID'))
		return srvResp.body.req;
	else if(srvResp && srvResp.body && srvResp.body.success && srvResp.body.result && srvResp.body.result.hasOwnProperty('requisitionID'))
		return srvResp.body.result;	
	else if(srvResp && typeof(srvResp) === 'object' && srvResp.hasOwnProperty('id') && srvResp.hasOwnProperty('version'))
		return srvResp;
	else{
		httpResp.status(500).send(err);
		return null;
	}
}

function checkCO(req, res){

	Q.async(function* (){
	
		var db = yield mongodb.connect(c_str);

		console.log('connected to db');

		db.collection('requisitions').find({}, {id : true, _id:false}).sort({id:1}).toArray(function(e, docs){
			var ids = [];
			docs.forEach(function(d){
				ids.push(d.id);
			});
			res.json(ids);
		});
		
	})().done();
}
var gIds = [1,2,3,4,6,7,10,30,42,43,45,51,54,78,79,87,90,91,93,94,100,102,104,106,108,109,110,111,112,114,116,119,121,123,125,126,127,128,129,130,131,132,133,145,146,149,150,151,154,155,156,157,160,167,168,169,176,178,179,10178,10180,10181,10182,10183,10184,10185,10187,10189,10190,10193,10194,10195,10208,10210,10219,10220,10221,10224,10226,10227,10228,10231,10233,10236,10237,10240,20241,20242,20244,20246,20248,20249,20250,20251,20252,20253,20255,20260,20265,20267,20268,20269,20270,20271,20272,20273,20274,20277,20278,20279,20280,20329,20331,20336,20337,20339,20344,20350,20360,20361,20362,20364,20365,20371,20372,20373,20374,20376,20377,20378,20379,20380,20381,20382,20383,20384,20385,20386,20387,20388,20390,20391,20392,20393,20394,20395,20396,20397,20412,20413,20414,20415,20417,20419,20421,20428,20429,20431,20432,20438,20439,20442,20445,20447,20452,20453,20458,20459,20460,20461,20464,20465,20466,20467,20468,20507,20508,20509,20511,20535,20537,20545,20563,20626,20634,20713,20744,20756,20759,20760,20768,20770,20773,20779,20790,20791,20792,20793,20794,20798,20802,20804,20820,20849];

function randomIntFromInterval(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}
function getRandomItemFromArray (arr){
	return arr[randomIntFromInterval(0,arr.length-1)];
}

function getRandomInt(){
	return getRandomItemFromArray(gIds);
}



apiRouter.post('/req/:tenantId', createRequisitionDocument);
apiRouter.get('/req/:tenantId/:id', getRequisitionDocument);
apiRouter.put('/req/:tenantId', saveRequisitionDocument);

apiRouter.get('/co', checkCO);

module.exports = apiRouter;