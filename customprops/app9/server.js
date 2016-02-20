'use strict';

var express = require('express');
var app = new express();
var apiRouter = require('./ApiRouter');
var co = require('co');

app.use(require('body-parser').json())

app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
  console.log(err.stack);
  //res.status(500).json({success:false, data:'internal server error'});
});

// var port = 4444;
// app.listen(port);
// console.log('server running at port - ' + port);



var csvGen = require('./CsvGen');
var coTest = require('./CoTester');

function* buildCsv(){
	var res = yield csvGen.buildCsv();
	console.log(res);
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

co(buildCsv).then(success, error);
