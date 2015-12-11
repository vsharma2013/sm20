function RuleActions(cache){
	this.cache = cache;
}

RuleActions.prototype.returnErrorForItemContractNumberAndExpiryDate = function(req){
	var data = this.cache.actionObjects['check_item_contract_number_and_expiry_date'];
	if(!data) return;

	var r = 'Line item # ' + data.index + ' \"' + data.name + '\"cannot be submitted as contract for the same has expired';
	this.cache.results.push(r);	
	console.log('returnErrorForItemContractNumberAndExpiryDate');
}

RuleActions.prototype.returnStatusForAutoApproval = function(req){
	this.cache.results.push('Document value < 500, auto-approved and orders for the same have been created.');
	console.log('returnStatusForAutoApproval');
}

RuleActions.prototype.returnStatusForRequsitionSentToAllManagers = function(req){
	this.cache.results.push('Document value > 500, sent requsition to managers [Manager1, Manager2, Manager3]');
	console.log('returnStatusForRequsitionSentToAllManagers');
}


module.exports = RuleActions;