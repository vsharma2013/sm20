var validationMgr = require('./validations/validationManager');
var settingsMgr = require('./settings/settingsManager');

var reqDoc_abm = require('./ABM');

var settings_abm = settingsMgr.getSettings('abm');
var validator = validationMgr.getValidator('abm');

validator.validate(reqDoc_abm, settings_abm);

console.log(JSON.stringify(settings_abm));