var _ = require('underscore');
var vUtils = require('./../validationUtils');
var msgs = require('./../validationMessages');

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

	var errors =  v1.concat(v2);//.concat(v3);
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
	var validatorFn = setting.isMandatory ? vUtils.getNonEmptyString : vUtils.getString;
	var r = this.validateType(value, setting, validatorFn.bind(vUtils), msgs.string_mandatory, msgs.string_required);
	if(r.success){
		if(setting.maxLength && value.length > setting.maxLength){
			r.success = false;
			r.value = msgs.getMaxCharMsg(setting)
		}
	}
	return r;
}

ValidationsBase.prototype.validateDecimal = function(key, value, setting){
	var r = this.validateType(value, setting, vUtils.getFloat, msgs.float_mandatory, msgs.float_required);
	if(r.success){
		if(setting.numDecimals && !vUtils.checkFloatWithDecimal(value, setting.numDecimals)){
			r.success = false;
			r.value = msgs.getMaxDecimalMsg(setting);
		}
	}
	return r;
}

ValidationsBase.prototype.validateBool = function(key, value, setting){
	return this.validateType(value, setting, vUtils.getBool, msgs.bool_mandatory, msgs.bool_required);
}

ValidationsBase.prototype.validateInt = function(key, value, setting){
	return this.validateType(value, setting, vUtils.getInt, msgs.int_mandatory, msgs.int_required);
}

ValidationsBase.prototype.validateDate = function(key, value, setting){
	return this.validateType(value, setting, vUtils.getDate, msgs.date_mandatory, msgs.date_required);
}

ValidationsBase.prototype.validateType = function(value, setting, validatorFn, msg_mandatory, msg_general){
	var r = validatorFn(value);
	if(!r.success){
		var msg = setting.isMandatory ? setting.label + msg_mandatory : setting.label + msg_general;
		return { success : false, value : msg };
	}
	return { success : true, value : null};
}

module.exports = ValidationsBase;