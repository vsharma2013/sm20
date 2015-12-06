//require('./orderCollectionCreator');

var createOrdersCsv = require('./orderCsvCreator');
var createOrdersSql = require('./orderSqlCreator');

function onOrdersCsvCreated(success){
	if(!success) return;

	createOrdersSql(onOrdersSqlCreated);
}

function onOrdersSqlCreated(success){

}

createOrdersCsv(onOrdersCsvCreated);  

//createOrdersSql(onOrdersSqlCreated);