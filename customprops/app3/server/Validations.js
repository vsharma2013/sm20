var utils = require('./Utils');
var client = null;

var validations_requisition = {
	RequisitionName : {
		validate : function(req){
			return req.hasOwnProperty('RequisitionName') && utils.hasString(req.RequisitionName) && req.RequisitionName.length <=200;
		},
		err : 'Requsition name cannot be empty and can have max 200 characters.'
	},
	RequisitionNumber : {
		validate : function(req){
			return req.hasOwnProperty('RequisitionNumber') && utils.hasString(req.RequisitionNumber);
		},
		err : 'Requsition number cannot be empty.'
	},
	Shiptoid : {
		validate : function(req){
			return req.hasOwnProperty('Shiptoid') && utils.hasInt(req.Shiptoid);
		},
		err : 'Ship to id should be an integer value.'
	},
	Billtoid : {
		validate : function(req){
			return req.hasOwnProperty('Billtoid') && utils.hasInt(req.Billtoid);
		},
		err : 'Bill to id should be an integer value.'
	},
	Currency : {
		validate : function(req){
			return req.hasOwnProperty('Currency') && utils.hasString(req.Currency);
		},
		err : 'Currency number cannot be empty.'
	},
	Markasurgent : {
		validate : function(req){
			if(!req.customProps) return false;
			return req.customProps.hasOwnProperty('Markasurgent') && utils.hasInt(req.customProps.Markasurgent);
		},
		err : 'Mark as urgent is a mandatory boolean field.'
	},
	Workorder : {
		validate : function(req){
			if(!req.customProps) return true;
			if(!req.customProps.ERPOrderType) return true;
			if(!req.customProps.ERPOrderType.val) return true;

			return req.customProps.hasOwnProperty('Workorder') && utils.hasString(req.customProps.Workorder) && req.customProps.Workorder.length <= 500;
		},
		err : 'Requsition work order field should a non-empty string value with max 500 characters.'
	}
};

var validations_item = {
	Linenumber: {
		validate : function(item){
			return item.hasOwnProperty('Linenumber') && utils.hasInt(item.Linenumber);
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
			return item.hasOwnProperty('Item') && utils.hasString(item.Item) && item.Item.length <= 500;
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
			return item.hasOwnProperty('Quantity') && utils.hasFloat(item.Quantity) && item.Quantity > 0;
		},
		err : 'Quantity should be a non-negative floating point value.'
	},
	UOM : {
		validate : function(item){
			return item.hasOwnProperty('UOM') && utils.hasString(item.UOM);
		},
		err : 'Item UOM should be a non-empty string value.'
	},
	Unitprice : {
		validate : function(item){
			return item.hasOwnProperty('Unitprice') && utils.hasFloat(item.Unitprice) && item.Unitprice > 0;
		},
		err : 'Item unit price should be a non-zero poistive floating point value.'
	},
	Total : {
		validate : function(item){
			return item.hasOwnProperty('Total') && utils.hasFloat(item.Total) && item.Total > 0;
		},
		err : 'Item total should be a non-zero poistive floating point value.'
	},
	Requesteddate : {
		validate : function(item){
			return item.hasOwnProperty('Requesteddate') && utils.hasDate(item.Requesteddate);
		},
		err : 'Item request date is a mandatory date type field.'
	},
	Needbydate : {
		validate : function(item){
			return item.hasOwnProperty('Needbydate') && utils.hasDate(item.Needbydate) && Date.parse(item.Needbydate) > Date.now();
		},
		err : 'Item need by date is a mandatory date type field. It should be greater current date' 
	}
};

var validations_partner = {
	Partnername : {
		validate : function(partner){
			return partner.hasOwnProperty('Partnername') && utils.hasString(partner.Partnername);
		},
		err : 'Partner name should be a non-empty string value.'
	},
	Partnercode : {
		validate : function(partner){
			return partner.hasOwnProperty('Partnercode') && utils.hasString(partner.Partnercode);
		},
		err : 'Partner code should be a non-empty string value.'
	}
};

var validations_shipping = {
	Shiptoname : {
		validate : function(shipping){
			return shipping.hasOwnProperty('Shiptoname') && utils.hasString(shipping.Shiptoname);
		},
		err : 'Ship to name should be a non-empty string value.'
	},
	Shiptoaddress : {
		validate : function(shipping){
			return shipping.hasOwnProperty('Shiptoaddress') && utils.hasString(shipping.Shiptoaddress);
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
			return others.customProps.hasOwnProperty('Procurementoption') && utils.hasString(others.customProps.Procurementoption);
		},
		err : 'Others procurement option should be a non-empty string value.'
	},
	Capitalized : {
		validate : function(others){
			if(client === 'CAMC') return true;
			if(!others.customProps) return false;
			return others.customProps.hasOwnProperty('Capitalized') && utils.hasString(others.customProps.Capitalized)
			       && utils.hasYesNo(others.customProps.Capitalized);
		},
		err : 'Others capitalized field should only have only Yes/No values.'
	},
	Billable : {
		validate : function(others){
			if(client === 'CAMC') return true;
			if(!others.customProps) return false;
			return others.customProps.hasOwnProperty('Billable') && utils.hasString(others.customProps.Billable)
			       && utils.hasYesNo(others.customProps.Billable);
		},
		err : 'Others Billable field should only have only Yes/No values.'
	},
	Inventorytype : {
		validate : function(others){
			if(client === 'ABM') return true;
			if(!others.customProps) return false;
			return others.customProps.hasOwnProperty('Inventorytype') && utils.hasString(others.customProps.Inventorytype);
		},
		err : 'Others inventory type option should be a non-empty string value.'
	}
};

var validations_accounting = {
	Type : {
		validate : function(accounting){
			return accounting.hasOwnProperty('Type') && utils.hasAccountingType(accounting.Type);
		},
		err : 'Accounting type should be a non-empty integer value.'
	},
	Quantity : {
		validate : function(accounting){
			return accounting.hasOwnProperty('Quantity') && utils.hasFloat(accounting.Quantity) && accounting.Quantity > 0;
		},
		err : 'Accounting quantity should be a positive floating point value.'
	},
	Amount : {
		validate : function(accounting){
			if(!accounting.Amount) return true;
			return utils.hasFloat(accounting.Amount);
		},
		err : 'Accounting amount should be a floating point value'
	}
};

var validations_contract = {
	Contractnumber : {
		validate : function(contract){
			if(!contract.Contractnumber) return true;
			return utils.hasString(contract.Contractnumber) && contract.Contractnumber.length <= 400;
		},
		err : 'Contract number should be a string value with max 400 characters'
	},
	Contractname : {
		validate : function(contract){
			if(!contract.Contractname) return true;
			return utils.hasString(contract.Contractname) && contract.Contractname.length <= 400;
		},
		err : 'Contract name should be a string value with max 400 characters'
	},
	Contractvalue : {
		validate : function(contract){
			if(!contract.Contractvalue) return true;
			return utils.hasFloat(contract.Contractvalue) && contract.Contractvalue > 0;
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
	client = Object.keys(requisition.customProps).length > 2 ? 'ABM' : 'CAMC';

	for(var i = 0; i < requisition.Items.length; i++){
		var item = requisition.Items[i]; items.push(item);
		if(item.partner)    partners.push(item.partner);
		if(item.shipping)   shippings.push(item.shipping);
		if(item.others)     others.push(item.others);
		if(utils.hasArray(item.accounting)){
			item.accounting.forEach(function(acc){
				accountings.push(acc);
			});
		} 
		if(item.contract)   contracts.push(item.contract);
	}

	var vals = [];
	vals = runValidation(requisitions, validations_requisition);   validationErrors = validationErrors.concat(vals);
	vals = runValidation(items, validations_item);                 validationErrors = validationErrors.concat(vals);
	vals = runValidation(partners, validations_partner);           validationErrors = validationErrors.concat(vals);
	vals = runValidation(shippings, validations_shipping);         validationErrors = validationErrors.concat(vals);
	vals = runValidation(others, validations_others);              validationErrors = validationErrors.concat(vals);
	vals = runValidation(accountings, validations_accounting);     validationErrors = validationErrors.concat(vals);
	vals = runValidation(contracts, validations_contract);         validationErrors = validationErrors.concat(vals);

	return {
		success : validationErrors.length > 0 ? false : true,
		message : validationErrors.join('\n')
	}
}

function runValidation(validationObjects, validations){
	if(!Array.isArray(validationObjects)) return [];

	var validationErrors = [];
	validationObjects.forEach(function(vObj){
		for(var vk in validations){
			var v = validations[vk];
			if(!v.validate(vObj))
				validationErrors.push(v.err);
		}
	});
	return validationErrors;
}

module.exports = {
	validateRequisition : validateRequisition
};