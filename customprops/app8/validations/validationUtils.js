var _ = require('underscore');

function ValidationUtils(){

}


ValidationUtils.prototype.checkString = function(str, maxLength){	
	return this.getString(str).success;
}

ValidationUtils.prototype.checkStringMaxLength = function(str, maxLength){
	var r = this.getString(str);
	return r.success && maxLength && this.checkInt(maxLength) && r.value.length <= maxLength
}

ValidationUtils.prototype.getString = function(str){
	var res = { success : false, value : null };
	if(typeof(str) === 'string'){
		res = { success : true, value : str };
	}
	return res;
}

ValidationUtils.prototype.getNonEmptyString = function(str){
	var res = this.getString(str);
	res.success = res.success ? /([^\s])/.test(str) : false;
	return res;
}

ValidationUtils.prototype.checkInt = function(i){
	return this.getInt(i).success;
}

ValidationUtils.prototype.getInt = function(i){
	try{
		parseInt(i);
		return {success : true, value : i };
	}
	catch(e){
	}
	return { success : false, value : null };
}

ValidationUtils.prototype.checkFloat = function(f){
	this.getFloat(f).success;
}

ValidationUtils.prototype.checkFloatWithDecimal = function(f, numDecimals){
	var r = this.getFloat(f);
	return r.success && this.getFloat(numDecimals) && r.value.toString().split('.')[1].length <= numDecimals;
}

ValidationUtils.prototype.getFloat = function(f){
	try{
		parseFloat(f);
		return {success : true, value : f };
	}
	catch(e){
	}
	return { success : false, value : null };	
}

ValidationUtils.prototype.checkBool = function(b){
	return this.getBool(b).success;
}

ValidationUtils.prototype.getBool = function(b){
	var aTrue = [true, 'true', 'yes', 'Yes', 'YES', 1, '1'];
	var aFalse = [false, 'false', 'no', 'No', 'NO', 0, '0'];

	if(_.contains(aTrue, b))
		return { success : true, value : true };

	if(_.contains(aFalse, b))
		return {success : true, value : false };

	return {success : false, value : null };
}

ValidationUtils.prototype.checkDate = function(d){
	return this.getDate(d).success;
}

ValidationUtils.prototype.checkDateWithExpiry = function(d, exp){
	var r1 = this.getDate(d);
	var r2 = this.getDate(exp);
	return r1.success && r2.success && r1.value > r2.value;
}

ValidationUtils.prototype.getDate = function(d){
	try{
		var dt = Date.parse(d);
		return { success : true, value : dt };
	}
	catch(e){
	}
	return { success : false, value : null };
}

ValidationUtils.prototype.isArrayOrObject = function(srcObj){
	if(!srcObj) return false;
	if(Array.isArray(srcObj)) return true;
	if(typeof(srcObj) === 'object') return true;
}

ValidationUtils.prototype.isEmptyArray = function(arr){
	if(arr && Array.isArray(arr) && arr.length > 0 ) 
		return true;
	return false;
}

module.exports = new ValidationUtils();