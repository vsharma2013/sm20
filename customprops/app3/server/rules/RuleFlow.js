var nools = require('nools');
var ro = require('./RuleObjects');
var RuleDefinitions = require('./RuleDefinitions');
var RuleActions = require('./RuleActions');

function RuleFlow (){
	this.cache = [];
	var noolsOptions = {
	    define: {
	    	Requisition : ro.Requisition
	    },
	    scope:{
	        ruleDef : new RuleDefinitions(this.cache),
	        ruleAct : new RuleActions(this.cache)
	    }
	};
	this.flow = nools.compile("./server/rules/RuleFlow.nools", noolsOptions);
	this.session = this.flow.getSession();
}

RuleFlow.prototype.run = function(cbOnDone){
	this.session.assert(new ro.Requisition({id: 1, name: 'Req1'}));
	this.session.assert(new ro.Requisition({id: 2, name: 'Req2'}));
	this.session.assert(new ro.Requisition({id: 3, name: 'Req3'}));
	this.session.assert(new ro.Requisition({id: 4, name: 'Req4'}));
	this.runMatch(cbOnDone)
}

RuleFlow.prototype.runMatch = function(cbOnDone){
	var self = this;
	var res = false;

	this.session.match(function(err){
	    if(err)
	        console.error(err.stack);
	    else
	    	res = true;
	    
	    self.session.dispose();
	    cbOnDone({success: res, results : self.cache});
	})
}

module.exports = RuleFlow;