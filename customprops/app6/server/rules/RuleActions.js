function RuleActions(){
	this.results = [];
}

RuleActions.prototype.returnErrorForItemContractNumberAndExpiryDate = function(req){
	var data = req.actionObjects['check_item_contract_number_and_expiry_date'];
	if(!data) return;

	var r = 'Line item # ' + data.index + ' \"' + data.name + '\" cannot be submitted as contract for the same has expired';
	this.results.push(r);	
}

RuleActions.prototype.returnStatusForAutoApproval = function(req){
	if(req.tenantId === 1)
		this.results.push('Document value < 500, auto-approved and orders for the same have been created.');
	else if(req.tenantId === 2)
		this.results.push('Document value < 250, auto-approved and orders for the same have been created.');
}

RuleActions.prototype.returnStatusForRequsitionSentToAllManagers = function(req){
	this.results.push('Document value > 500, sent requsition to managers [Manager1, Manager2, Manager3]');
}

RuleActions.prototype.getResults = function(){
	return this.results.splice(0);
}

RuleActions.prototype.clear = function(){
	this.results = [];
}
module.exports = RuleActions;