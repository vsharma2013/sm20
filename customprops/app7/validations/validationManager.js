var ValidationsABM = require('./abm/validationsABM');
var ValidationsCAMC = require('./camc/validationsCAMC');

function getValidator(tenantId){
	if(tenantId === 'abm')
		return new ValidationsABM();
	else if(tenantId === 'camc')
		return new ValidationsCAMC();
}

module.exports = {
	getValidator : getValidator
}