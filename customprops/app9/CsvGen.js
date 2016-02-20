'use strict';

var mongodb = require('mongodb').MongoClient;
var co = require('co');
var _ = require('underscore');
var fs = require('fs');

var c_str = 'mongodb://localhost:27017/riteaid'; var file = './req-ra-local.csv'; var id = 30;
//c_str = 'mongodb://gep:gep123@ds060968.mongolab.com:60968/riteaid'; file = './req-ra-ci.csv'; id = 54;
//c_str = 'mongodb://gep:gep123@ds060968.mongolab.com:60968/riteaid_qc'; file = './req-ra-qc.csv'; id = 54;
var empty = `,""`;

function CsvGen(){

}

CsvGen.prototype.run = function* (){
	let db = yield mongodb.connect(c_str);

	let docs = yield db.collection('requisitions').find().toArray();

	let docIdVsFlatDocs = {};
	let hDoc = {};
	let maxKeyCount = 0;

	docs.map(doc => {
		let fDocs = this.getFlatDocs(doc);
		docIdVsFlatDocs[doc.id] = fDocs;
		fDocs.map(fd => {
			hDoc = _.extend(hDoc, fd);
		});
	});
	
	let csvs = [];
	let hRow = this.getHeaderRow(hDoc);
	let allHeaders = Object.keys(hDoc);
	//csvs.push(hRow);

	for(var docId in docIdVsFlatDocs){
		let fDocs = docIdVsFlatDocs[docId];
		fDocs.map(fd => {
			csvs.push(this.getCsvRow(allHeaders, fd));
		});
	}

	let sCsvs = _.sortBy(csvs, function(csv){
		let arr = csv.split(',');
		let cnt = 0;
		arr.map(a => {
			cnt = /([^\s])/.test(a) ? (cnt+1) : cnt;
		});
		return cnt;
	}).reverse();

	csvs = [hRow].concat(sCsvs);
	
	fs.writeFileSync(file, csvs.join('\n'));
	
	return 'Done !!!';
}

CsvGen.prototype.getFlatDocs = function(doc){
	let fObjs = [];

	let items = _.isEmpty(doc.items) ? [] : doc.items;
	if(!_.isEmpty(items)) delete doc.items;

	let itemIdVsSplits = {};

	items.map(item => {
		let splits = _.isEmpty(item.splits) ? [] : item.splits;
		if(!_.isEmpty(splits)) {			
			itemIdVsSplits[item.id] = splits;
			delete item.splits;
		};
	});

	let hObj = {};
	for(let hKey in doc){
		if(hKey.indexOf('_') === -1)
			hObj = _.extend(hObj, this.deflateObject(hKey, doc[hKey]));		
	}

	if(_.isEmpty(items))
		fObjs.push(hObj);
	else{
		items.map(item => {
			let iObj = _.extend({}, hObj);
			for(let iKey in item){
				iObj = _.extend(iObj, this.deflateObject('item_' + iKey, item[iKey]));
				let splits = itemIdVsSplits[item.id];
				if(_.isEmpty(splits)){
					fObjs.push(iObj);
				}
				else{
					splits.map(split => {
						let sObj = _.extend({}, iObj);
						for(let sKey in split){
							sObj = _.extend(sObj, this.deflateObject('split_' + sKey, split[sKey]));
						}
						fObjs.push(sObj);
					});
				}
			}
		});
	}

	doc.items = items;
	items.map(item => {
		item.splits = itemIdVsSplits[item.id];
	});
	return fObjs;
}

CsvGen.prototype.deflateObject = function(key, obj){
	if(!_.isObject(obj)){
		let dObj = {};
		dObj[key] = obj;
		return dObj;
	}

	let dObj = {};
	for(let k in obj){
		dObj[`${key}_${k}`] = obj[k];
	}
	return dObj;
}

CsvGen.prototype.getHeaderRow = function(hDoc){
	let hRow = '';
	let toDelete = [];
	for(let hKey in hDoc){
		if(_.isObject(hDoc[hKey])) {
			toDelete.push(hKey); 
			continue;
		}
		hRow += `"${hKey}",`;
	}
	toDelete.map(d => {
		delete hDoc[d];
	});
	return this.trimStr(hRow);
}

CsvGen.prototype.getCsvRow = function(allHeaders, doc){
	let csv = '';
	allHeaders.map(h => {
		let v = doc[h];
		csv += v ? `"${v}",` : `"",`;
	});
	return this.trimStr(csv);
}

CsvGen.prototype.trimStr = function(str){
	return str.substr(0, str.length - 1);
}

var csvGen = new CsvGen();

module.exports = {
	buildCsv : csvGen.run.bind(csvGen)
};
