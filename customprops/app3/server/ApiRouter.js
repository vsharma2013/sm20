var express = require('express');
var router = express.Router();
var dbMgr = require('./DBManager');
var validations = require('./Validations');

function ApiController(){

}

ApiController.prototype.handleGetRequisitionRequest = function(req, res){
	var id = parseInt(req.query.r);
	dbMgr.getRequisitionById(id, true, function(doc){
        res.json(doc);
	});	
}

ApiController.prototype.handleGetRawRequisitionRequest = function(req, res){
	var id = parseInt(req.query.o);
	dbMgr.getRequisitionById(id, false, function(doc){
        res.json(doc);
	});	
}

ApiController.prototype.handleCustomPropsUISchemaRequest = function(req, res){
	res.json(dbMgr.customPropsUISchema);
}

ApiController.prototype.handleSaveRequisitionRequest = function(req, res){
	var result = validations.validateRequisition(req.body);
	if(result.success){
		dbMgr.saveRequisitionDocument(req.body, function(err, rs){
			if(err)
				res.json({success : false, err : err});
			else{
				res.json({success: true, message: 'Requisition saved successfully'});
			}
		});	
	}
	else
		res.json(result);	
}


var apiController = new ApiController();
router.get('/req', apiController.handleGetRequisitionRequest.bind(apiController));
router.get('/reqraw', apiController.handleGetRawRequisitionRequest.bind(apiController));
router.get('/cpuischema', apiController.handleCustomPropsUISchemaRequest.bind(apiController));
router.post('/req/save', apiController.handleSaveRequisitionRequest.bind(apiController));
module.exports = router;