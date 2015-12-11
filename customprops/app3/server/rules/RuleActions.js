function RuleActions(cache){
	this.cache = cache;
}

RuleActions.prototype.returnErrorForItemContractNumberAndExpiryDate = function(req){
	this.cache.push({success : true, message : 'Ran Action Rule1 for req id = ' + req.id});
}

RuleActions.prototype.returnStatusForAutoApproval = function(req){

}

RuleActions.prototype.returnStatusForRequsitionSentToAllManagers = function(req){

}


module.exports = RuleActions;