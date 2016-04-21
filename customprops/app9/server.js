'use strict';

var express = require('express');
var app = new express();
var apiRouter = require('./ApiRouter');
var co = require('co');
var cp = require("child_process");
var worker = cp.fork(__dirname + "/worker");

app.use(require('body-parser').json())

require('./demo');
require('./app');


app.use('/demo', function(req, res, next){
	var url = 'http://localhost:4445' + req.url.replace('http://localhost:4444/demo', '');
	res.redirect(url);
	next();
});

app.use('/app', function(req, res, next){
	var url = 'http://localhost:4446' + req.url.replace('http://localhost:4444/app', '');
	res.redirect(url);
	next();
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({success:false, data:'internal server error'});
});

app.use('/api', function(req, res, next){
	worker.send("start");
	setTimeout(function(){
		res.json({m : 'this is done'});
		next();
		//db.close();
	}, 5000)
});

var port = 4444;
app.listen(port);
console.log('server running at port - ' + port);



var csvGen = require('./CsvGen');
var coTest = require('./CoTester');

function* buildCsv(){
	var res = yield csvGen.buildCsv();
	console.log(res);
}

function* updateDate(){
	yield csvGen.updateLastDate();
	console.log('Done !!!')
}

function* runCO(){
	var res = yield coTest.runCO();
	console.log(res);
}

function success(val){
	//console.log(val);
}

function error(err){
	console.error(err.stack);
}

//co(buildCsv).then(success, error);

function restartNode(){
	var cmd = `node ${__dirname}/server.js`;
	console.log(cmd);
	cp.exec(cmd, function(){
		console.log(arguments);
	});
}

process.on('uncaughtException', function(){
	console.log('uncaughtException in server.js');
	cp.exec("pkill -f node", function(){
		setTimeout(restartNode, 30000);
	});
	process.exit();
});

process.on('SIGTERM', function(){
	console.log('SIGTERM in server');
});

