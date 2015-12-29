var nools = require('nools');
var ro = require('./RuleObjects');
var RuleDefinitions = require('./RuleDefinitions');
var RuleActions = require('./RuleActions');

var ruleDef = new RuleDefinitions();
var ruleAct = new RuleActions();

var noolsOptions = {
    define: {
    	Requisition : ro.Requisition
    },
    scope:{
        ruleDef : ruleDef,
        ruleAct : ruleAct
    }
};

var flow = nools.compile("./server/rules/RuleFlow.nools", noolsOptions);
var session = null;

function RuleFlow (){
}

RuleFlow.prototype.run = function(requisition, cbOnDone){
	session = flow.getSession();
	session.assert(new ro.Requisition(requisition));
	this.runMatch(cbOnDone);
}

RuleFlow.prototype.runMatch = function(cbOnDone){
	var res = false;
	session.match(function(err){
	    if(err)
	        console.error(err.stack);
	    else
	    	res = true;

	    session.dispose();
	    var r = ruleAct.getResults();
	    ruleAct.clear();
	    cbOnDone({success: res, results : r});
	})
}

module.exports = RuleFlow;