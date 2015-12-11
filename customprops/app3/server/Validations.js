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

var validations_requisition = {
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
	Workorder : {
		validate : function(req){
			if(!requisition.customProps) return true;
			if(!requisition.customProps.ERPOrderType) return true;
			if(!requisition.customProps.ERPOrderType.val) return true;

			return req.customProps.hasOwnProperty('Workorder') && hasString(req.customProps.Workorder) && req.customProps.Workorder.length <= 500;
		},
		err : 'Requsition work order field should a non-empty string value with max 500 characters.'
	}
};

var validations_item = {
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
	Needbydate : {
		validate : function(item){
			return item.hasOwnProperty('Needbydate') && hasDate(item.Needbydate) && Date.parse(item.Needbydate) > Date.now();
		},
		err : 'Item need by date is a mandatory date type field. It should be greater current date' 
	}
};

var validations_partner = {
	Partnername : {
		validate : function(partner){
			return partner.hasOwnProperty('Partnername') && hasString(partner.Partnername);
		},
		err : 'Partner name should be a non-empty string value.'
	},
	Partnercode : {
		validate : function(partner){
			return partner.hasOwnProperty('Partnercode') && hasString(partner.Partnercode);
		},
		err : 'Partner code should be a non-empty string value.'
	}
};

var validations_shipping = {
	Shiptoname : {
		validate : function(shipping){
			return shipping.hasOwnProperty('Shiptoname') && hasString(shipping.Shiptoname);
		},
		err : 'Ship to name should be a non-empty string value.'
	},
	Shiptoaddress : {
		validate : function(shipping){
			return shipping.hasOwnProperty('Shiptoaddress') && hasString(shipping.Shiptoaddress);
		},
		err : 'Ship to address should be a non-empty string value.'
	},
	Deliverto : {
		validate : function(shipping){
			if(!shipping.customProps) return true;
			if(!shipping.customProps.Deliverto) return true;
			return shipping.customProps.Deliverto.length <= 2000;
		},
		err : 'Shipping deliver to field can have max 2000 characters.'
	}
};

var validations_others = {
	Procurementoption : {
		validate : function(others){
			if(!others.customProps) return false;
			return others.customProps.hasOwnProperty('Procurementoption') && hasInt(others.customProps.Procurementoption);
		},
		err : 'Others procurement option should be a non-empty integer value.'
	},
	Capitalized : {
		validate : function(others){
			if(!others.customProps) return false;
			var values = ['yes', 'no'];
			return others.customProps.hasOwnProperty('Capitalized') && hasString(others.customProps.Capitalized)
			       && _.contains(values, other.customProps.Capitalized.toLowerCase());
		},
		err : 'Others capitalized field should only have only Yes/No values.'
	},
	Billable : {
		validate : function(others){
			if(!others.customProps) return false;
			var values = ['yes', 'no'];
			return others.customProps.hasOwnProperty('Billable') && hasString(others.customProps.Billable)
			       && _.contains(values, other.customProps.Billable.toLowerCase());
		},
		err : 'Others Billable field should only have only Yes/No values.'
	},
	Inventorytype : {
		validate : function(others){
			if(!others.customProps) return false;
			return others.customProps.hasOwnProperty('Inventorytype') && hasInt(others.customProps.Inventorytype);
		},
		err : 'Others inventory type option should be a non-empty integer value.'
	}
};

var validations_accounting = {
	Type : {
		validate : function(accounting){
			return accounting.hasOwnProperty('Type') && hasInt(accounting.Type);
		},
		err : 'Accounting type should be a non-empty integer value.'
	},
	Quantity : {
		validate : function(accounting){
			return accounting.hasOwnProperty('Quantity') && hasFloat(accounting.Quantity) && accounting.Quantity > 0;
		},
		err : 'Accounting quantity should be a positive floating point value.'
	},
	Amount : {
		validate : function(){
			if(!accounting.Amount) return true;
			return hasFloat(accounting.Amount);
		},
		err : 'Accounting amount should be a floating point value'
	}
};

var validations_contract = {
	Contractnumber : {
		validate : function(contract){
			if(!contract.Contractnumber) return true;
			return hasString(contract.Contractnumber) && contract.Contractnumber.length <= 400;
		},
		err : 'Contract number should be a string value with max 400 characters'.
	},
	Contractname : {
		validate : function(contract){
			if(!contract.Contractname) return true;
			return hasString(contract.Contractname) && contract.Contractname.length <= 400;
		},
		err : 'Contract name should be a string value with max 400 characters'.
	},
	Contractvalue : {
		validate : function(contract){
			if(!contract.Contractvalue) return true;
			return hasFloat(contract.Contractvalue) && contract.Contractvalue > 0;
		},
		err : 'Contract value should be a positive floating point value'
	}
};

function validateRequisition(requisition){
	var items = [];
	var requisitions = [requisition];
	var partners = [];
	var shippings = [];
	var others = [];
	var accountings = [];
	var contracts = [];
	var validationErrors = [];

	for(var i = 0; i < requisition.Items.length; i++){
		var item = requisition.Items[i]; items.push(item);
		if(item.partner)    partners.push(partner);
		if(item.shipping)   shippings.push(shipping);
		if(item.others)     others.push(others);
		if(item.accounting) accountings.push(accounting);
		if(item.contract)   contracts.push(contract);
	}

	var vals = [];
	vals = runValidation(requisitions, validations_requisition);   validationErrors = validationErrors.concat(vals);
	vals = runValidation(items, validations_item);                 validationErrors = validationErrors.concat(vals);
	vals = runValidation(partners, validations_partner);           validationErrors = validationErrors.concat(vals);
	vals = runValidation(shippings, validations_shipping);         validationErrors = validationErrors.concat(vals);
	vals = runValidation(others, validations_others);              validationErrors = validationErrors.concat(vals);
	vals = runValidation(accountings, validations_accounting);     validationErrors = validationErrors.concat(vals);
	vals = runValidation(contracts, validations_accounting);       validationErrors = validationErrors.concat(vals);

	return {
		success : validationErrors.length > 0 ? false : true,
		message : validationErrors.join('\n');
	}
}

function runValidation(validationObjects, validations){
	if(!Array.isArray(validationObjects)) return [];

	var validationErrors = [];
	validationObjects.forEach(function(vObj){
		for(var v in validations){
			if(!v.validate(vObj))
				validationErrors.push(v.err);
		}
	});
	return validationErrors;
}

module.exports = {
	validateRequisition : validateRequisition
};