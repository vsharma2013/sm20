'use strict';

var mongodb = require('mongodb').MongoClient;
var co = require('co');
var needle = require('needle');
var fs = require('fs');
var Q = require('q');

var r_id = 1;
var server_ip = 'http://smartdev2.azurewebsites.net/api/';

var fs_readFile = Q.denodeify(fs.readFile);
var needle_post = Q.denodeify(needle.post);
var needle_put = Q.denodeify(needle.put);
var needle_get = Q.denodeify(needle.get);


function CoTester(){

}

CoTester.prototype.run = function* (){
	
	var url = server_ip + 'req/abm';
			
	let postRes = yield needle_post(url, {});
	
	let req = postRes[1].result;

	req.requisitionID = 'REQ-ABM-0000' + r_id; r_id++;
	req.requisitionName = 'ABM-Lenovo-00' + r_id; r_id++;

	let putRes = yield needle_put(url, req);

	let nReq = putRes[1].result;

	url = `${url}/${nReq.id}`;

	let getRes = yield needle_get(url);
	
	nReq = getRes[1].result;

	nReq.name = 'CO - Req -001';

	url = server_ip + 'req/abm';

	putRes = yield needle_put(url, { name : 'CO - Req -001', id : nReq.id, version : nReq.version });

	console.log(putRes[1].result);

	return 'Co Tested';
}

let gCoTester = new CoTester();

module.exports = {
	runCO : gCoTester.run.bind(gCoTester)
}