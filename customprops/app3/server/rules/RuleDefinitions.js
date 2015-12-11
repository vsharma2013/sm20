function RuleDefinitions(cache){
	this.cache = cache;
}

RuleDefinitions.prototype.checkItemContractNumberAndExpiryDate = function(req){
	this.cache.push({success : false, message : 'Rule def passed checkRule1 for req id = ' + req.id});
	return req.id % 2 === 0 ? true : false;
}

RuleDefinitions.prototype.checkDocumentForAutoApproval = function(req){
	return true;
}

RuleDefinitions.prototype.checkSendRequisitionToAllManagers = function(req){
	return true;
}

module.exports = RuleDefinitions;