var settings_abm = require('./settings/abm/settings');
var req_abm = require('./ABM');
var validationMgr = require('./validations/validationManager');

var validator = validationMgr.getValidator('abm');

validator.validate(req_abm, settings_abm);

console.log(JSON.stringify(settings_abm));