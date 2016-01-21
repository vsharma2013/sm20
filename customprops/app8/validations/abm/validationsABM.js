var ValidationsBase = require('./../base/validationsBase');

function ValidationsABM(){
	ValidationsBase.call(this);
	return this;
}

ValidationsABM.prototype = Object.create(ValidationsBase.prototype);
ValidationsABM.constructor = ValidationsABM;

ValidationsABM.prototype.validate = function(document, settings){
	ValidationsBase.prototype.validate.call(this, document, settings);
}

module.exports = ValidationsABM;

