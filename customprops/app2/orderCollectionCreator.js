var mongodb = require('mongodb').MongoClient;
var mongoConnString = 'mongodb://localhost:27017/orderdb';
//mongoConnString = 'mongodb://192.168.1.36:27017/orderdb';
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
var OneMillion = HundredK * 10 ;
var total = 0;
var j = HundredK + 1;
var dtmStart = null;

function add100KOrders(){
	if(!dtmStart) dtmStart = Date.now();
		
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
			console.log('Added orders successfully count = ' + total + '    t = ' + ((Date.now() - dtmStart)/1000));
			db.close();
			if(total < OneMillion)
				add100KOrders();
		});
	});
}

add100KOrders();

//console.log(JSON.stringify(orders));
