function RuleDefinitions(cache){
	this.cache = cache;
}

RuleDefinitions.prototype.checkRule1 = function(req){
	this.cache.push({success : false, message : 'Rule def passed checkRule1 for req id = ' + req.id});
	return req.id % 2 === 0 ? true : false;
}

module.exports = RuleDefinitions;