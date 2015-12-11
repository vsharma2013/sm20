var nools = require('nools');
var ro = require('./RuleObjects');
var RuleDefinitions = require('./RuleDefinitions');
var RuleActions = require('./RuleActions');
var cache = {actionObjects : {}, results : []};
var noolsOptions = {
    define: {
    	Requisition : ro.Requisition
    },
    scope:{
        ruleDef : new RuleDefinitions(cache),
        ruleAct : new RuleActions(cache)
    }
};

var flow = nools.compile("./server/rules/RuleFlow.nools", noolsOptions);
var session = null;

function RuleFlow (){
}

RuleFlow.prototype.run = function(requisition, cbOnDone){
	cache = {actionObjects : {}, results : []};
	session = flow.getSession();
	session.assert(new ro.Requisition(requisition));
	this.runMatch(cbOnDone)
}

RuleFlow.prototype.runMatch = function(cbOnDone){
	var res = false;
	session.match(function(err){
	    if(err)
	        console.error(err.stack);
	    else
	    	res = true;

	    session.dispose();
	    cbOnDone({success: res, results : cache.results.splice(0)});
	})
}

module.exports = RuleFlow;