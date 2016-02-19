var express = require('express');
var app = new express();
var apiRouter = require('./ApiRouter');
var csvGen = require('./CsvGen');

app.use(require('body-parser').json())

app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
  console.log(err.stack);
  //res.status(500).json({success:false, data:'internal server error'});
});

// var port = 4444;
// app.listen(port);
// console.log('server running at port - ' + port);