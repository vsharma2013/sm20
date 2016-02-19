'use strict';

var mongodb = require('mongodb').MongoClient;
var co = require('co');
var _ = require('underscore');
var fs = require('fs');

var c_str = 'mongodb://localhost:27017/riteaid'
var empty = `,""`;

function CsvGen(){

}

CsvGen.prototype.run = function* (){
	let db = yield mongodb.connect(c_str);

	let hDoc = yield db.collection('requisitions').findOne({id : 20770});
	
	let allHeaders = this.getHeaders(hDoc);

	let csvs = [];
	
	csvs.push(this.getHeaderRow(allHeaders));
	
	//let docs = [hDoc];
	let docs = yield db.collection('requisitions').find().toArray();

	docs.map(doc => {
		csvs = csvs.concat(this.getCsvRows(allHeaders, doc));
	});
	
	fs.writeFileSync('./req.csv', csvs.join('\n'));
	
	return 'Done !!!';
}

CsvGen.prototype.getHeaders = function(doc){
	var items = doc.items;
	delete doc.items;
	let allHeaders = { header : [], item : [], split : [] };

	allHeaders.header = this.getHeadersFromObj(doc);
	
	if(!_.isEmpty(items)){
		
		let splits = items[0].splits;
		
		if(!_.isEmpty(splits)) delete items[0].splits;
		
		allHeaders.item = this.getHeadersFromObj(items[0]);
				
		if(!_.isEmpty(splits)){
			allHeaders.split = this.getHeadersFromObj(splits[0]);
			items[0].splits = splits
		}
	}
	doc.items = items;
	return allHeaders;
}

CsvGen.prototype.getHeadersFromObj = function(obj, prefix){
	let headers = [];
	for(let k in obj){
		if(k.indexOf('_') !== -1) continue;

		let val = obj[k];
		
		if(_.isObject(val)){
			for ( let k2 in val ){
				let h = prefix ? `${prefix}_${k}_${k2}` : `${k}_${k2}`;
				headers.push(h);
			}
		}
		else{
			let h = prefix ? `${prefix}_${k}` : k;
			headers.push(h);
		}
	}
	return headers;
}

CsvGen.prototype.getHeaderRow = function(allHeaders){
	let header = '';
	allHeaders.header.map(h => {
		header += `"${h}",`;
	});
	allHeaders.item.map(i => {
		header += `"item_${i}",`;
	});
	allHeaders.split.map(s => {
		header += `"split_${s}",`;
	});
	return this.trimStr(header);
}

CsvGen.prototype.getCsvRows = function(allHeaders, doc){
	let csvs = [];
	let csv = '';

	let h = this.getCsvFromObject(allHeaders.header, doc);
	if(_.isEmpty(doc.items)){
		allHeaders.item.map(item => {
			let i = h + empty;
			allHeaders.split.map(s => {
				csv = i + empty;
				csvs.push(csv);
			}); 
		});
		return csvs;
	}

	doc.items.map(item => {
		let i = h + ',' + this.getCsvFromObject(allHeaders.item, item);
		if(_.isEmpty(item.splits)){
			allHeaders.split.map(s => {
				csv = i + empty;
				csvs.push(csv);
			}); 
		}
		else{
			item.splits.map(s => {
				csv = i + ',' + this.getCsvFromObject(allHeaders.split, s);
				csvs.push(csv);
			});
		}
		
	});
	return csvs;
}

CsvGen.prototype.getCsvFromObject = function(csvHeaders, obj){
	let csv = '';
	csvHeaders.map(h => {
		let v = this.getKeyValueFromObj(h, obj);
		csv += v ? `"${v}",` : `"",`;
	});
	return this.trimStr(csv);
}

CsvGen.prototype.trimStr = function(str){
	return str.substr(0, str.length - 1);
}

CsvGen.prototype.getKeyValueFromObj = function(key, obj){
	var v = obj;
	var arr = key.split('_').reverse();
	var k = arr.pop();
	while (k) {
		v = v[k];
		if (!v) return null;
		k = arr.pop();
	}
	if (!v) return null;
	return v;
}

var csvGen = new CsvGen();
csvGen.run();


function success(val){
	console.log(val)
}

function error(err){
	console.error(err.stack);
}

co(csvGen.run.bind(csvGen)).then(success, error);


module.exports = {};
