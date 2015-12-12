var _ = require('underscore');

function hasString(str){
	return /([^\s])/.test(str);
}

function hasInt(i){
	try{
		parseInt(i);
		return true;
	}
	catch(e){
		return false;
	}
}

function hasFloat(f){
	try{
		parseFloat(f);
		return true;
	}
	catch(e){
		return false;
	}
}

function hasDate(d){
	try{
		Date.parse(d);
		return true;
	}
	catch(e){
		return false;
	}
}

function hasYesNo(v){
	var values = ['yes', 'no'];
	return _.contains(values, v.toLoserCase());
}

function getDocumentValue(req){
	var val = 0;
	req.Items.forEach(function(item){
		val += (item.Quantity * item.Unitprice);
		val += item.Taxes ? item.Taxes : 0;
		val += item.Shippingcharges ? item.Shippingcharges : 0;
		val += item.Othercharges ? item.Othercharges : 0;
	});
	return val;
}

module.exports = {
	hasString : hasString,
	hasInt : hasInt,
	hasFloat : hasFloat,
	hasString : hasString,
	hasDate : hasDate,
	getDocumentValue : getDocumentValue
}
