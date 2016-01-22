var _ = require('underscore');

var propSchema = {
	dataType : null,
	uiType : null,
	label : null,
	defaultVal : null,
	allowEdit : true,
	isMandatory : false,
	maxLength : null,
	numDecimals : null,
	autoSuggestURL : null,
	allVals : null,
	uiGroup : null,
	icon : null,
	section : 0,
	sort : 0,
	isCustom : false
};

function getPropSettings(params){
	var template = _.extend({}, propSchema);
	var cp = _.extend(template, params);
	return cp;
}

module.exports = {
	getPropSettings : getPropSettings
}