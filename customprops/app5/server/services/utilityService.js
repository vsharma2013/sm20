import _ from 'underscore';

function getString(s){
	try {
		return {success: true, value: s.toString()};
	}
	catch (e) {
	}
	
	return {success: false, value: null};
}

function getBoolean(b) {
	var yes = ['YES', 'yes', 'Yes'];
	var no = ['NO', 'no', 'No'];

	try {
		if (typeof(b) === 'boolean')
			return {success: true, value: b};
		else if (b === 1 || b === '1' || _.contains(yes, b))
			return {success: true, value: true};
		else if (b === 0 || b === '0' || _.contains(no, b))
			return {success: true, value: false};
		else {
			var t = JSON.parse(b);
			if (typeof(t) === 'boolean')
				return {success: true, value: t};
		}
	}
	catch (e) {
	}

	return {success: false, value: null};
}

function getInt(i){
	//TODO: handle leading 0s.
	try {
		if(!isNaN(i))
			return {success: true, value: parseInt(i, 10)};
	}
	catch(e) {
	}

	return {success: false, value: null};
}

function getFloat(f){
	//TODO: handle leading 0s.
	try {
		if(!isNaN(f))
			return {success: true, value: parseFloat(f, 10)};
	}
	catch(e) {
	}

	return {success: false, value: null};
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

function getDocumentValue(req){
	var val = 0;
	req.Items.forEach(function(item){
		val += (item.quantity * item.unit_price);
		val += item.taxes ? item.taxes : 0;
		val += item.shipping ? item.shipping : 0;
		val += item.other_charges ? item.other_charges : 0;
	});
	return val;
}

let utils = {
	getBoolean: getBoolean,
	getString : getString,
	getInt : getInt,
	getFloat : getFloat,
	hasDate : hasDate,
	getDocumentValue : getDocumentValue
}

export default utils;
