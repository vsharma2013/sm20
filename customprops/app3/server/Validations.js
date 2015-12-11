var _ = require('underscore');

function hasString(str){
	return /([^\s])/.test(str);
}

function hasInt(i){
	try{
		parseInt(i);
		return true;
	}
	catch(){
		return false;
	}
}

var validations = {
	RequisitionName : {
		validate : function(req){
			return req.hasOwnProperty('RequisitionName') && hasString(req.RequisitionName) && req.RequisitionName.length <=200;
		},
		err : 'Requsition name cannot be empty and can have max 200 characters.'
	},
	RequisitionNumber : {
		validate : function(req){
			return req.hasOwnProperty('RequisitionNumber') && hasString(req.RequisitionNumber);
		},
		err : 'Requsition number cannot be empty.'
	},
	Shiptoid : {
		validate : function(req){
			return req.hasOwnProperty('Shiptoid') && hasInt(req.Shiptoid);
		},
		err : 'Ship to id should be an integer value.'
	},
	Billtoid : {
		validate : function(req){
			return req.hasOwnProperty('Billtoid') && hasInt(req.Billtoid);
		},
		err : 'Bill to id should be an integer value.'
	},
	Currency : {
		validate : function(req){
			return req.hasOwnProperty('Currency') && hasString(req.Currency);
		},
		err : 'Currency number cannot be empty.'
	},
	Markasurgent : {
		validate : function(req){
			if(!req.customProps) return false;
			return req.customProps.hasOwnProperty('Markasurgent') && hasInt(req.customProps.Markasurgent);
		},
		err : 'Mark as urgent is a mandatory boolean field.'
	},

}