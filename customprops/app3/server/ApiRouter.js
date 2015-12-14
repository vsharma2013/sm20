var express = require('express');
var router = express.Router();
var dbMgr = require('./DBManager');
var validations = require('./Validations');
var RuleFlow = require('./rules/RuleFlow');
var reqDecorator = require('./RequisitionDecorator');

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
	var requisition = req.body;
	reqDecorator.removeUISchemaFromCutomProps(requisition);
	console.log(JSON.stringify(requisition));
	var result = validations.validateRequisition(requisition);
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

ApiController.prototype.handleSubmitRequisitionRequest = function(req, res){
	var ruleFlow = new RuleFlow();
	ruleFlow.run(req.body, function(result){
		if(result.success)
			res.json({success : true, message : result.results.join('\n')});
		else
			res.json({success : false, message : 'Error in executing submit rules'});
	});
}


var apiController = new ApiController();
router.get('/req', apiController.handleGetRequisitionRequest.bind(apiController));
router.get('/reqraw', apiController.handleGetRawRequisitionRequest.bind(apiController));
router.get('/cpuischema', apiController.handleCustomPropsUISchemaRequest.bind(apiController));
router.post('/req/save', apiController.handleSaveRequisitionRequest.bind(apiController));
router.post('/req/submit', apiController.handleSubmitRequisitionRequest.bind(apiController));
module.exports = router;