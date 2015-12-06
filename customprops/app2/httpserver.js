var http = require('http');
var cpMgr = require('./customPropsManager');
var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
var bMultiCluster = true;

if(bMultiCluster){
	var cluster = require('cluster');
	var numCPUs = require('os').cpus().length;
	if (cluster.isMaster) {
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
	} 
	else
		runSingle();	
}
else
	runSingle();

function runSingle(){
	var options = {
		server : {
			poolSize : 50
		}
	};
	http.createServer(function(req, res){
		var query = {Id : cpMgr.randomIntFromInterval(1, 1000000)};
		if(req.url === '/order'){
			mongodb.connect(mongoConnString, function(err, db){
				if(err){
					console.log(err);
					res.writeHead(200);
					res.end('Error in connecting to mongodb');
				}
				else{
					db.collection('orders2').findOne(query, function(err, result){
						res.writeHead(200);
						res.end(JSON.stringify(result));
						db.close();
					});
				}
			});			
		}
		else{
			res.writeHead(200);
			res.end('ok');
		}
	}).listen(9997);
}