var express = require('express');
var router = express.Router();
var dbMgr = require('./DBManager');
//dbMgr.addDefaultOrders();

function ApiController(){

}

ApiController.prototype.handleGetOrderRequest = function(req, res){
	var id = parseInt(req.query.o);
	dbMgr.getOrderById(id, true, function(doc){
        res.json(doc);
	});	
}

ApiController.prototype.handleGetRawOrderRequest = function(req, res){
	var id = parseInt(req.query.o);
	dbMgr.getOrderById(id, false, function(doc){
        res.json(doc);
	});	
}

ApiController.prototype.handleCustomPropsUISchemaRequest = function(req, res){
	res.json(dbMgr.customPropsUISchema);
}

ApiController.prototype.handleSaveOrderRequest = function(req, res){
	dbMgr.saveOrderDocument(req.body);
	res.json({success: true, message: 'data saved successfully'});
}


var apiController = new ApiController();
router.get('/order', apiController.handleGetOrderRequest.bind(apiController));
router.get('/orderraw', apiController.handleGetRawOrderRequest.bind(apiController));
router.get('/cpuischema', apiController.handleCustomPropsUISchemaRequest.bind(apiController));
router.post('/order/save', apiController.handleSaveOrderRequest.bind(apiController));
module.exports = router;