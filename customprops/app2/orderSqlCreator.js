var fs = require('fs');
var cpSchema = require('./custPropsSchema');
var orderSchema = require('./orderPropsSchema');
var itemSchema = require('./itemPropsSchema');


function createOrdersSql(cbOnDone){
	var sql = '';
	var sqlTableStart = 'CREATE TABLE `ORDERS` (  ';
	var sqlTableEnd = ') ENGINE=InnoDB DEFAULT CHARSET=latin1;';
	var sqlCols = [];
	var pCols = Object.keys(orderSchema);
	var iCols = Object.keys(itemSchema);
	var cpCols = Object.keys(cpSchema);

	pCols.forEach(function(c){
		var col = orderSchema[c];
		var s = '`' + c + '`' + '  ' + col.db.type;
		s += col.db.size ? col.db.size : '';

		s += ' DEFAULT NULL'
		sqlCols.push(s);
	});

	iCols.forEach(function(c){
		var col = itemSchema[c];
		var s = '`' + c + '`' + '  ' + col.db.type;
		s += col.db.size ? col.db.size : '';
		if(col.db.type == 'enum' && col.db.allValues && col.db.allValues.length > 0){
			s += '(\'' + col.db.allValues.join('\' , \'') + '\' ) ';
		}
		s += ' DEFAULT NULL'
		sqlCols.push(s);
	});

	cpCols.forEach(function(c){
		var col = cpSchema[c];
		var s = '`' + c + '`' + '  ' + col.db.type;
		s += col.db.size ? col.db.size : '';
		if(col.db.type == 'enum' && col.db.allValues && col.db.allValues.length > 0){
			s += '(\'' + col.db.allValues.join('\' , \'') + '\' ) ';
		}
		s += ' DEFAULT NULL'
		sqlCols.push(s);
	});

	sql = sqlTableStart+ sqlCols.join(',') + sqlTableEnd;

	//console.log(sql);
	fs.writeFile('./orders.sql', sql, function(err, res){});
}

module.exports = createOrdersSql;
