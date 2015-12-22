var express = require('express');
var router = express.Router();
var dbMgr = require('./DBManager');
var validations = require('./Validations');
var RuleFlow = require('./rules/RuleFlow');

function ApiController(){

}

ApiController.prototype.handleGetSettingsRequest = function (req, res) {
    dbMgr.getSettings(req.params.id, function (doc) {
        res.json(doc);
    });
}

ApiController.prototype.handleGetRequisitionRequest = function(req, res){
	var id = parseInt(req.query.r);
	var tid = parseInt(req.query.t);
        dbMgr.getSettings(tid, function (sett) {
	    dbMgr.getRequisitionById(id, tid, sett, true, function(doc){
                res.json(doc);
	    });	
        });
}

ApiController.prototype.handleSaveRequisitionRequest = function(req, res){
	var requisition = req.body;
        dbMgr.getSettings(requisition.tenantId, function (sett) {
		var result = validations.validateRequisition(requisition, sett);
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
	});	
}

ApiController.prototype.handleSaveSettingsRequest = function(req, res){
	var settings = req.body;

	// TODO: need to add validation
	dbMgr.saveSettingsDocument(settings, function(err, rs){
		if(err)
			res.json({success : false, err : err});
		else {
			res.json({success: true, message: 'Settings saved successfully'});
		}
	});	
}

ApiController.prototype.handleSubmitRequisitionRequest = function(req, res){
	var requisition = req.body;
	reqDecorator.removeUISchemaFromCutomProps(requisition);
	var vResults = validations.validateRequisition(requisition);
	if(vResults.success){
		var ruleFlow = new RuleFlow();
		ruleFlow.run(requisition, function(result){
			if(result.success)
				res.json({success : true, message : result.results.join('\n')});
			else
				res.json({success : false, message : 'Error in executing submit rules'});
		});
	}
	else
		res.json(vResults);
}


var apiController = new ApiController();
router.get('/req', apiController.handleGetRequisitionRequest.bind(apiController));
router.get('/settings/:id', apiController.handleGetSettingsRequest.bind(apiController));
router.post('/settings/save', apiController.handleSaveSettingsRequest.bind(apiController));
router.post('/req/save', apiController.handleSaveRequisitionRequest.bind(apiController));
router.post('/req/submit', apiController.handleSubmitRequisitionRequest.bind(apiController));
module.exports = router;