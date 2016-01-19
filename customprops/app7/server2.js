
var mongodb = require('mongodb').MongoClient;
//var mongoConnString = 'mongodb://localhost:27017,192.168.1.106:27107,192.168.1.103:27107/repldb?replicaSet=rs-1';
var mongoConnString = 'mongodb://localhost:27017/repldb';
var sObj = '{"id" : 0, "name" : "", "ts" : 0}';

var id = 1;

var showOptions = { _id : 0, ts : 0, name : 0 };

function run(db){
	db.collection('replObjects').find({}, showOptions).sort({id: -1}).limit(10).toArray(function(err, docs){
		console.log(JSON.stringify(docs));
	});
}

mongodb.connect(mongoConnString, function(err, db){
	if(err){
		console.log(err);
		return;
	}
	var tInt = setInterval(function(){
		run(db);
	}, 5000);		
});

