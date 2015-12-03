var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
var DO = require('./DefaultOrders');

function DbManager(){

}

var gDBMgr = new DbManager();

module.exports = gDBMgr;

DbManager.prototype.getOrderById = function(orderId, cbOnDone){
	mongodb.connect(mongoConnString, function (err, db) {

        var dbJson = { "Id": orderId };
        var res = db.collection('orders').findOne(dbJson, function (err, result) {
            cbOnDone(result);
        });
    });
}

DbManager.prototype.addDefaultOrders = function(){
	mongodb.connect(mongoConnString, function(err, db){
		if(err){
			console.log('Error in connecting to mongodb');
			return;
		}

		db.collection('orders').insert(DO.order, {safe:true}, function(err, result){
			if(err){
				console.log('Error in adding default order');
				return;
			}
			console.log('Added order successfully');
		});
		db.collection('orders').insert(DO.customPropsOrder, {safe:true}, function(err, result){
			if(err){
				console.log('Error in adding custom properties order');
				return;
			}
			console.log('Added custom props order successfully');
		});
	});
}

