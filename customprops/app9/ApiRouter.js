'use strict';

var express = require('express');
var apiRouter = express.Router();
var co = require('co');
var needle = require('needle');
var rest = require('restler');
var latest_id = 1;
var r_id = 1;

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
	var url = server_ip + 'req/abm/' + latest_id;

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
	var url = server_ip + 'req/abm';
	var getDoc = {
		send : function(data){
			var req = getDocOrSendErrResponse(res, data, 'error in reading the requisition document');

			if(!req) return;

			needle.put(url, data, function(e, rs2){
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



apiRouter.post('/req/:tenantId', createRequisitionDocument);
apiRouter.get('/req/:tenantId/:id', getRequisitionDocument);
apiRouter.put('/req/:tenantId', saveRequisitionDocument);

module.exports = apiRouter;