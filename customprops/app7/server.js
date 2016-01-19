
var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017,192.168.1.106:27107,192.168.1.103:27107/repldb?replicaSet=rs-1';
var sObj = '{"id" : 0, "name" : "", "ts" : 0}';

var id = 1;

function getRecords () {
	var objs = [];
	for(var i = 0; i < 100; i++){
		var jObj = JSON.parse(sObj);
		jObj.id = id;
		jObj.name = 'Object - ' + id;
		jObj.ts = Date.now();
		id++;
		objs.push(jObj);
	}
	return objs;
}

function run(db){
	var arrDocs = getRecords();
	db.collection('replObjects').insertMany(arrDocs, {safe:true}, function(err, result){
		if(err){
			console.log(err);
			return;
		}
		console.log('Added repl objects successfully count = ' + id);
	});
}

mongodb.connect(mongoConnString, function(err, db){
	if(err){
		console.log(err);
		return;
	}
	var tInt = setInterval(function(){
		run(db);
	}, 3000);		
});

