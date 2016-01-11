

var mongodb = require('mongodb').MongoClient;
var mongoConnString1 = 'mongodb://localhost:27017/camc';
var mongoConnString2 = 'mongodb://localhost:27017/abm';
var ObjectID = require('mongodb').ObjectID;
var reqUtils = require('./RequisiitionUtils');
var reqCollection = 'requisitions';
var settingsCollection = 'settings'

function init(){
	
	mongodb.connect(mongoConnString1, function(err, db){
		db.collection(settingsCollection).count(function(err, res){
			if(!res){
				var docs = new Array();
				docs.push(reqUtils.getSettings('1'));
				db.collection(settingsCollection).insertMany(docs, {safe:true}, function(err, result){
					if(err)
						console.log('Error in adding default settings');
					else
						console.log('Added settings successfully');
				});
				docs = new Array();
				docs.push(reqUtils.getNewRandomRequisition('1', reqUtils.getSettings('1')));
				docs.push(reqUtils.getNewRandomRequisition('2', reqUtils.getSettings('1')));
				db.collection(reqCollection).insertMany(docs, {safe:true}, function(err, result){
					if(err)
						console.log('Error in adding default requisitions');
					else
						console.log('Added requisitions successfully');
				});
			}
		});		
	});

	mongodb.connect(mongoConnString2, function(err, db){
		db.collection(settingsCollection).count(function(err, res){
			if(!res){
				var docs = new Array();
				docs.push(reqUtils.getSettings('2'));
				reqUtils.getNewRandomRequisition('1', docs[0]);
				db.collection(settingsCollection).insertMany(docs, {safe:true}, function(err, result){
					if(err)
						console.log('Error in adding default settings');
					else
						console.log('Added settings successfully');
				});
				docs = new Array();
				docs.push(reqUtils.getNewRandomRequisition('1', reqUtils.getSettings('2')));
				docs.push(reqUtils.getNewRandomRequisition('2', reqUtils.getSettings('2')));
				db.collection(reqCollection).insertMany(docs, {safe:true}, function(err, result){
					if(err)
						console.log('Error in adding default requisitions');
					else
						console.log('Added requisitions successfully');
				});
			}
		});		
	});
	
}

export default init;