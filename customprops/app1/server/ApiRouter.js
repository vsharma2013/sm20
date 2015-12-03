var express = require('express');
var router = express.Router();
var dbMgr = require('./DBManager');

function ApiController(){

}

ApiController.prototype.handleGetOrderRequest = function(req, res){
	var id = parseInt(req.query.o);
	dbMgr.getOrderById(id, function(doc){
        res.json(doc);
	})	
}


var apiController = new ApiController();
router.get('/order', apiController.handleGetOrderRequest.bind(apiController));
module.exports = router;