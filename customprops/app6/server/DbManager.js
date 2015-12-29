var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/requisitiondb';
var ObjectID = require('mongodb').ObjectID;
var reqUtils = require('./RequisiitionUtils');
var reqCollection = 'requisitions';
var settingsCollection = 'settings';

function DbManager(){
	var self = this;
	mongodb.connect(mongoConnString, function(err, db){
		db.collection(settingsCollection).count(function(err, res){
			if(!res)
				self.addDefaultSettings(db);
		});		
	});
}

var gDBMgr = new DbManager();

module.exports = gDBMgr;

//TODO: Implement caching here.
DbManager.prototype.getSettings = function (id, cbOnDone) {
    mongodb.connect(mongoConnString, function (connectErr, db) {
	    var query = { "id": id.toString() };
        var res = db.collection(settingsCollection).findOne(query, function (fetchErr, result) {
            cbOnDone(result);
            db.close();
        });
    });
}

DbManager.prototype.getRequisitionById = function(reqId, tenantId, sett, addUIschema, cbOnDone){
	var self = this;
	mongodb.connect(mongoConnString, function (err, db) {
	    var dbJson = { "Id": reqId };
        var res = db.collection(reqCollection).findOne(dbJson, function (err, result) {
            if (!result)
                result = reqUtils.getNewRandomRequisition(reqId, sett);
            else
                result = reqUtils.applySchema(result, sett);

            result.tenantId = tenantId;
            cbOnDone(result);
            db.close();
        });
    });
}

DbManager.prototype.addDefaultSettings = function(db){
	var docs = new Array();
	docs.push(reqUtils.getSettings('1'));
	docs.push(reqUtils.getSettings('2'));
	db.collection(settingsCollection).insertMany(docs, {safe:true}, function(err, result){
		if(err)
			console.log('Error in adding default settings');
		else
			console.log('Added settings successfully');
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

DbManager.prototype.saveSettingsDocument = function(settings, cbOnDone){
	settings._id = ObjectID(settings._id);
	mongodb.connect(mongoConnString, function(connectErr, db){
		if(connectErr){
			cbOnDone(connectErr);			
		} 
		else{
			db.collection(settingsCollection).save(settings, function(dbErr, res){
				if(dbErr)
					cbOnDone(dbErr);
				else
					cbOnDone(null, true);
				db.close();
			});
		}
	});
}