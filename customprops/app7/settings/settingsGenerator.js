var _ = require('underscore');

var settingsSchema = '{"dataType" : "", "uiType": "", "label" : "", "defaultVal": "", "allowEdit" : "true",' +
                     ' "isMandatory" : "false", "maxLength": "", "numDecimals": "", "autoSuggestURL": "",' + 
                     ' "allVals" : [], "uiGroup": "", "icon": "", "section": "", "sort": ""}';

function getCustomProperty(params){
	var template = JSON.parse(settingsSchema);
	var cp = _.extend(template, params);
	return cp;
}