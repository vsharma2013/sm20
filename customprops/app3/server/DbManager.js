var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
var ObjectID = require('mongodb').ObjectID;
var DO = require('./DefaultOrders');

function DbManager(){
	var self = this;
	mongodb.connect(mongoConnString, function(err, db){
		db.collection('customPropsUISchema').find({}).toArray(function(err, docs){
			self.customPropsUISchema = docs[0];
		});
	});
}

var gDBMgr = new DbManager();

module.exports = gDBMgr;

DbManager.prototype.getOrderById = function(orderId, addUIschema, cbOnDone){
	var self = this;
	mongodb.connect(mongoConnString, function (err, db) {
        var dbJson = { "Id": orderId };
        var res = db.collection('orders').findOne(dbJson, function (err, result) {
        	if(orderId > 2 && addUIschema){
        		self.addUISchemaToCustomProps(result);
        	}
            cbOnDone(result);
            db.close();
        });
    });
}

DbManager.prototype.addDefaultOrders = function(){
	var arrDocs = [DO.order, DO.customPropsOrder, DO.customPropsOrder2];
	mongodb.connect(mongoConnString, function(err, db){
		if(err){
			console.log('Error in connecting to mongodb');
			return;
		}

		db.collection('orders').insertMany(arrDocs, {safe:true}, function(err, result){
			if(err){
				console.log('Error in adding default orders');
				return;
			}
			console.log('Added default orders successfully');
			db.close();
		});
	});
}

DbManager.prototype.addCustomPropsUISchema = function(){
	mongodb.connect(mongoConnString, function(err, db){
		if(err){
			console.log('Error in connecting to mongodb');
			return;
		}
		db.collection('customPropsUISchema').insert(DO.customPropsUISchema, {safe:true}, function(err, result){
			if(err){
				console.log('Error in adding customPropsUISchema');
				return;
			}
			console.log('Added customPropsUISchema successfully');
		});
	});
}

DbManager.prototype.addUISchemaToCustomProps = function(order){
	var cps = [];
	if(order.customProps){
		for(var key in order.customProps){
			var cp = this.customPropsUISchema[key];
			cp.key = key;
			cp.value = order.customProps[key];
			cps.push(cp);
		}
		order.customProps = cps;
	}
	order.Items.forEach((function(item){
		var cps = [];
		if(item.customProps){
			for(var key in item.customProps){
				var cp = this.customPropsUISchema[key];
				cp.key = key;
				cp.value = item.customProps[key];
				cps.push(cp);
			}
			item.customProps = cps;
		}
	}).bind(this));
}

DbManager.prototype.saveOrderDocument = function(order, cbOnDone){
	order._id = ObjectID(order._id);
	mongodb.connect(mongoConnString, function(err, db){
		db.collection('orders').save(order, function(err, res){
			if(err)
				cbOnDone(err, null);
			else
				cbOnDone(null, true);
			db.close();
		});
	});
}