var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
var cpSchema = require('./custPropsSchema');
var itemSchema = require('./itemPropsSchema');
var orderSchema = require('./orderPropsSchema');
var fs = require('fs');

var orderKeys = Object.keys(orderSchema);
var itemKeys = Object.keys(itemSchema);
var custKeys = Object.keys(cpSchema);
var allKeys = orderKeys.concat(itemKeys).concat(custKeys);

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
	    			var order = orders[i];
	    			var oVals = [];
	    			orderKeys.forEach(function(ok){
	    				oVals.push(order[ok]);
	    			});	    			
	    			for(var j = 0; j < order.Items.length; j++){
	    				var iVals = [];
	    				var item = order.Items[j];
	    				itemKeys.forEach(function(ik){
	    					var iok = ik.replace('item_', '');
	    					iVals.push(item[iok]);
	    				});
	    				if(order.customProps){
	    					custKeys.forEach(function(ck){
	    						var v = order.customProps[ck] ? order.customProps[ck] : '';
		    					iVals.push(v);
		    				});
	    				}
	    				else{
	    					custKeys.forEach(function(ck){
	    						iVals.push('');
		    				});
	    				}
	    				var vals = oVals.concat(iVals);
	    				//console.log(allKeys.length, vals.length);
	    				csvs.push(vals.join(','));
	    			}
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