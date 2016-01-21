var _ = require('underscore');

var settingsSchema = {
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
	section : null,
	sort : null
};

function getPropSettings(params){
	var template = _.extend({}, settingsSchema);
	var cp = _.extend(template, params);
	return cp;
}

module.exports = {
	getPropSettings : getPropSettings
}