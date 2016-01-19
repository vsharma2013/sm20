var fs = require('fs');
var compression = require('compression')
var express = require('express');
var app = new express();
var port = process.env.port || 4000;
var abm_new = fs.readFileSync('./ABM_new.JSON');

function shouldCompress(req, res){
	return true;
}

app.use(compression({filter : shouldCompress}));

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({success:false, data:'internal server error'});
});

app.use('/api', function(req, res){
	res.end(abm_new);
});

app.use('/', function(req, res){
	res.end('Hello World!!!');
});



app.listen(port);
console.log('server running at port - ' + port);


// var fs = require('fs');
// var abm_org = require('./ABM');
// var http = require('http');

// function saveABMNew(){
// 	var abm_new = JSON.parse(JSON.stringify(abm_org));

// 	for(var i = 0 ; i < 1000; i++){
// 		abm_new.Items.push(abm_org.Items[0]);
// 		abm_new.Items.push(abm_org.Items[1]);
// 	}


// 	fs.writeFile('./ABM_new.json', JSON.stringify(abm_new), function(err, res){
// 		if(err) 
// 			console.log('**** Error in saving the json docment *****');
// 		else 
// 			console.log('Saved document successfully!!!');
// 	});
// }

// //saveABMNew();
