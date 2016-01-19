var fs = require('fs');
var abm_org = require('./ABM');
var http = require('http');

function readFile () {
	fs.readFile('/Users/vishal/devapps/bd/sales.csv', function(err, data){
		throw '*** exception from callback';
	});
	throw 'exception from primary thread';
}

function run(){
	try{
		readFile();
	}
	catch(err){
		console.log(err);
	}
}

//setInterval(function(){ run(); }, 3000);

function saveABMNew(){
	var abm_new = JSON.parse(JSON.stringify(abm_org));

	for(var i = 0 ; i < 1000; i++){
		abm_new.Items.push(abm_org.Items[0]);
		abm_new.Items.push(abm_org.Items[1]);
	}


	fs.writeFile('./ABM_new.json', JSON.stringify(abm_new), function(err, res){
		if(err) 
			console.log('**** Error in saving the json docment *****');
		else 
			console.log('Saved document successfully!!!');
	});
}

//saveABMNew();

function runHttp(){
	var abm_new = fs.readFileSync('./ABM_new.JSON');

	http.createServer(function(req, res){
		if(req.url === '/api'){
			res.writeHead(200, 'text/json');
			res.end(abm_new);
		}
		else{
			res.writeHead(200, 'text/json');
			res.end('hello world');
		}
	}).listen(4000);

	console.log('server running at 4000');
}

runHttp();