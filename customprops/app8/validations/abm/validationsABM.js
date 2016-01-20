var ValidationsBase = require('./../base/validationsBase');

function ValidationsABM(){
	ValidationsBase.call(this);
	return this;
}

ValidationsABM.prototype = Object.create(ValidationsBase.prototype);
ValidationsABM.constructor = ValidationsABM;

module.exports = ValidationsABM;

