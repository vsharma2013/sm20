var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/requisitiondb';
var ObjectID = require('mongodb').ObjectID;
var reqUtils = require('./RequisiitionUtils');
var reqCollection = 'requisitions';
var schemaCollection = 'reqCustomProps';

function DbManager(){
	var self = this;
	mongodb.connect(mongoConnString, function(err, db){
		db.collection(schemaCollection).count(function(err, res){
			res >  0 ? self.cacheUISchema(db) : self.addCustomPropsUISchema(db);
		})
		db.collection(reqCollection).count(function(err, res){
			if(!res)
				self.addDefaultRequisitions(db);
		});			
	});
}

var gDBMgr = new DbManager();

module.exports = gDBMgr;

DbManager.prototype.getRequisitionById = function(reqId, addUIschema, cbOnDone){
	var self = this;
	mongodb.connect(mongoConnString, function (err, db) {
        var dbJson = { "Id": reqId };
        var res = db.collection(reqCollection).findOne(dbJson, function (err, result) {
        	self.addUISchemaToCustomProps(result);
            cbOnDone(result);
            db.close();
        });
    });
}

DbManager.prototype.addDefaultRequisitions = function(db){
	var req1 = reqUtils.getRequisition({itemCount : 5, client : 'ABM'}); req1.Id = 1;
	var req2 = reqUtils.getRequisition({itemCount : 3, client : 'CAMC'}); req2.Id = 2;
	var arrDocs = [req1, req2];
	db.collection(reqCollection).insertMany(arrDocs, {safe:true}, function(err, result){
		if(err){
			console.log('Error in adding default requisitions');
			return;
		}
		console.log('Added requisitions orders successfully');
	});
}

DbManager.prototype.addCustomPropsUISchema = function(db){
	var self = this;
	var arrDoc = [reqUtils.custPropsSchema, reqUtils.primaryPropsDefaultValues];
	db.collection(schemaCollection).insert(arrDoc, {safe:true}, function(err, result){
		if(err){
			console.log('Error in adding customPropsUISchema');
			return;
		}
		console.log('Added customPropsUISchema successfully');
		self.cacheUISchema(db);
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

DbManager.prototype.cacheUISchema = function(db){
	var self = this;
	db.collection(schemaCollection).find({}).toArray(function(err, docs){
		self.customPropsUISchema = docs[0].hasOwnProperty('Markasurgent') ? docs[0] : docs[1];
	});
}

DbManager.prototype.saveRequisitionDocument = function(requisition, cbOnDone){
	requisition._id = ObjectID(requisition._id);
	mongodb.connect(mongoConnString, function(err, db){
		db.collection(reqCollection).save(requisition, function(err, res){
			if(err)
				cbOnDone(err, null);
			else
				cbOnDone(null, true);
			db.close();
		});
	});
}