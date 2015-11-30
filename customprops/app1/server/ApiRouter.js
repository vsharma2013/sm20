var express = require('express');
var router = express.Router();

function ApiController(){

}

ApiController.prototype.handleGetOrderRequest = function(req, res){

}


var apiController = new ApiController();
router.get('/order', apiController.handleGetOrderRequest.bind(apiController));
module.exports = router;