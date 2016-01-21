var _ = require('underscore');
var vUtils = require('./../validationUtils');

function ValidationsBase(){

}

ValidationsBase.prototype.validate = function(doc, settings){
	var setUp = _.extend({}, doc);
	var items = doc.Items;
	var itemAccSplits = {};

	setUp = _.extend(setUp, doc.customProps);

	if(!vUtils.isEmptyArray(items)){
		items.forEach(function(item, index){
			var key = 'Item - ' + item.item_name + ' Split# - ' + index + ' : ';
			itemAccSplits[key] = item.Splits;
		});
	}

	var v1 = this.validateSetup(setUp, settings.setup);
	var v2 = this.validateItems(items, settings.item);
	var v3 = this.validateSplits(itemAccSplits, settings.split);

	var errors =  v1;//.concat(v2).concat(v3);
	console.log('');
	console.log(errors.join('\n\n'));
	console.log('');
	return errors;
}

ValidationsBase.prototype.validateSetup = function(obj, settings){
	return this.validateObjectFromSettings(obj, settings);
}

ValidationsBase.prototype.validateItems = function(items, settings){
	var errors = [];
	items.forEach((function(item){
		var suffix = 'Item - ' + item.item_name + ' : ';
		var tItem = _.extend({}, item);
		tItem = _.extend(tItem, tItem.customProps);
		var err = this.validateObjectFromSettings(tItem, settings, suffix);
		errors = errors.concat(err);
	}).bind(this));
	return errors;
}

ValidationsBase.prototype.validateSplits = function(itemAccSplits, settings){
	var errors = [];
	for(var key in itemAccSplits){
		var split = itemAccSplits[key];
		var tSplit = _.extend({}, split);
		tSplit = tSplit.extend(tSplit, tSplit.customProps);
		var err = this.validateObjectFromSettings(tSplit, settings, key);
	}
	return errors;
}

ValidationsBase.prototype.validateObjectFromSettings = function(obj, settings, errPrefix){
	if(!errPrefix) errPrefix = '';

	var errors = [];
	for(var key in obj){
		var propSettings = settings[key];
		if(vUtils.isArrayOrObject(obj[key])) continue;
		if(propSettings){
			var res = this.validatePropValFromSetting(key, obj[key], propSettings);
			if(!res.success)
				errors.push(errPrefix + res.value);
		}
		else
			errors.push('Save error: invalid key value pair : ' + key + ' - ' + obj[key]);
	}
	return errors;
}


ValidationsBase.prototype.validatePropValFromSetting = function(key, value, setting){
	switch(setting.dataType){
		case 'string' : return this.validateString(key, value, setting); break;
		case 'decimal' : return this.validateDecimal(key, value, setting); break;
		case 'bool' : return this.validateBool(key, value, setting); break;
		case 'int' : return this.validateInt(key, value, setting); break;
		case 'date' : return this.validateDate(key, value, setting); break;
	}
}

ValidationsBase.prototype.validateString = function(key, value, setting){
	var r = vUtils.getString(value);
	if(r.success){
		if(setting.maxLength && value.length > setting.maxLength)
			return { success : false, value : setting.label + ' can have maximum ' + setting.maxLength + ' characters.'};
	}
	else{
		var msg = setting.isMandatory ? setting.label + ' is a non-empty mandatory string value. ' : 
		                                setting.label + ' should be a string value. ';
		return { success : false, value : msg };
	}
	return { success : true, value : null };
}

ValidationsBase.prototype.validateDecimal = function(key, value, setting){
	var r = vUtils.getFloat(value);
	if(r.success){
		if(setting.numDecimals && !vUtils.checkFloatWithDecimal(value, setting.numDecimals))
			return { success : false, value : setting.label + ' can have maximum ' + setting.numDecimals + ' decimal digits.'};
	}
	else{
		var msg = setting.isMandatory ? setting.label + ' is a mandatory floating point value. ' : 
		                                setting.label + ' should be a floating point value. ';
		return { success : false, value : msg };
	}
	return { success : true, value : null };
}

ValidationsBase.prototype.validateBool = function(key, value, setting){
	var r = vUtils.getBool(value);
	if(!r.success){
		var msg = setting.isMandatory ? setting.label + ' is a mandatory boolean value. ' : 
										setting.label + ' should be a boolean value. ';
		return { success : false, value : msg };								
	}
	return { success : true, value : null };
}

ValidationsBase.prototype.validateInt = function(key, value, setting){
	var r = vUtils.getInt(value);
	if(!r.success){
		var msg = setting.isMandatory ? setting.label + ' is a mandatory integer value. ' : 
										setting.label + ' should be an integer value. ';
		return { success : false, value : msg };
	}
	return { success : true, value : null };
}

ValidationsBase.prototype.validateDate = function(key, value, setting){
	var r = vUtils.getDate(value);
	if(!r.success){
		var msg = setting.isMandatory ? setting.label + ' is a mandatory date type value. ' : 
										setting.label + ' should be an date type value. ';
		return { success : false, value : msg };
	}
	return { success : true, value : null };
}

module.exports = ValidationsBase;