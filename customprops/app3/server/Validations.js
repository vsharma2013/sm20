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

function hasFloat(f){
	try{
		parseFloat(f);
		return true;
	}
	catch(){
		return false;
	}
}

function hasDate(d){
	try{
		Date.parse(d);
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
	Linenumber: {
		validate : function(item){
			return item.hasOwnProperty('Linenumber') && hasInt(item.Linenumber);
		},
		err : 'Line number should be an integer value.'
	},
	Itemnumber : {
		validate : function(item){
			if(!item.Itemnumber) return true;
			return item.Itemnumber.length <= 100;
		},
		err : 'Item number can have max 100 characters.'
	},
	Item : {
		validate : function(item){
			return item.hasOwnProperty('Item') && hasString(item.Item) && item.Item.length <= 500;
		},
		err : 'Item should be a non-empty string value with max 500 characters.'
	},
	Partneritemnumber : {
		validate : function(item){
			if(!item.Partneritemnumber) return true;
			return item.Partneritemnumber.length <= 100;
		},
		err : 'Partner item number can have max 100 characters.'
	},
	Quantity : {
		validate : function(item){
			return item.hasOwnProperty('Quantity') && hasFloat(item.Quantity) && item.Quantity > 0;
		},
		err : 'Quantity should be a non-negative floating point value.'
	},
	UOM : {
		validate : function(item){
			return item.hasOwnProperty('UOM') && hasString(item.UOM);
		},
		err : 'Item UOM should be a non-empty string value.'
	},
	Unitprice : {
		validate : function(item){
			return item.hasOwnProperty('Unitprice') && hasFloat(item.Unitprice) && item.Unitprice > 0;
		},
		err : 'Item unit price should be a non-zero poistive floating point value.'
	},
	Total : {
		validate : function(item){
			return item.hasOwnProperty('Total') && hasFloat(item.Total) && item.Total > 0;
		},
		err : 'Item total should be a non-zero poistive floating point value.'
	},
	Requesteddate : {
		validate : function(item){
			return item.hasOwnProperty('Requesteddate') && hasDate(item.Requesteddate);
		},
		err : 'Item request date is a mandatory date type field.'
	},
	abc : {
		validate : function(){

		},
		err : ''
	}
}