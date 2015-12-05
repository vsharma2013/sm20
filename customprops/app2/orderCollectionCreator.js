var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
var cpMgr = require('./customPropsManager');
var cpSchema = require('./custPropsSchema');
var DO = require('./defaultOrders');

var arr = [];
var i = 0;
Object.keys(cpSchema).forEach(function(key){
	arr.push(i);
	i++
});
arr.push(i);
arr = cpMgr.shuffleArray(arr);
var sOrder = JSON.stringify(DO.order);
var HundredK = 100000;
var TenMillion = HundredK * 10 * 10;
var total = 0;
var j = 1;

function add100KOrders(){
	var orders = [];
	for(var i = 0 ; i < HundredK ; i++){
		var o = JSON.parse(sOrder);
		o.Id = j;
		j++;
		var cp = cpMgr.getRandomCustomProperties(cpMgr.getRandomItemFromArray(arr));
		if(cp){
			o.customProps = cp;
		}
		orders.push(o);
	}
	mongodb.connect(mongoConnString, function(err, db){
		if(err){
			console.log('Error in connecting to mongodb');
			return;
		}

		db.collection('orders2').insertMany(orders, {safe:true}, function(err, result){
			if(err){
				console.log('Error in adding default orders');
				console.log(err);
				return;
			}
			total += HundredK;
			console.log('Added orders successfully count = ' + total);
			db.close();
			if(total < HundredK)
				add100KOrders();
		});
	});
}

add100KOrders();

//console.log(JSON.stringify(orders));
