function RuleActions(cache){
	this.cache = cache;
}

RuleActions.prototype.runActionRule1 = function(req){
	this.cache.push({success : true, message : 'Ran Action Rule1 for req id = ' + req.id});
}

module.exports = RuleActions;