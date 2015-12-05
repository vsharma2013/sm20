var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
var cpSchema = require('./custPropsSchema');
var DO = require('./defaultOrders');
var fs = require('fs');

var primKeys = Object.keys(DO.order);
var custKeys = Object.keys(cpSchema);
var allKeys = primKeys.concat(custKeys);

var csvs = [];

csvs.push(allKeys.join(','));

function createOrdersCsv(cbOnDone){
	mongodb.connect(mongoConnString, function (err, db) {
	    var query = { 
	    	Id : {
	    		$gte : 1,
	    		$lte : 100000
	    	} 
	    };
	    var res = db.collection('orders2').find(query).toArray(function (err, orders) {
	    	db.close();
	    	if(err) console.log(err);
	    	else{
	    		console.log('Read documents successfully count = ' + orders.length);
	    		for(var i = 0; i < orders.length; i++){
	    			var vals = [];
	    			primKeys.forEach(function(pk){
	    				var v = (typeof(orders[i][pk]) !== 'object') ? orders[i][pk] : '';
	    				vals.push(v)
	    			});
	    			if(orders[i].customProps){
	    				custKeys.forEach(function(ck){
	    					var v = orders[i].customProps[ck] ? orders[i].customProps[ck] : '';
	    					vals.push(v);
	    				});
	    			}
	    			else{
	    				custKeys.forEach(function(ck){
	    					vals.push('');
	    				});
	    			}
	    			csvs.push(vals.join(','));
	    		}
	    	}                
	        fs.writeFile('./orders.csv', csvs.join('\n'), function(err, res){
	        	if(err) console.log(err);
	        	cbOnDone(true);
	        });
	    });
	});
}


module.exports = createOrdersCsv;