var nools = require('nools');
var oe = require('./orderEntities');
var ruleUtils = require('./ruleUtils');

function orderFlow(){
	console.log('\n');
	this.init();
}

orderFlow.prototype.init = function(){
	var noolsOptions = {
	    define: {
	    	order : oe.order,
	        item : oe.item
	    },
	    scope:{
	        ruleUtils : ruleUtils
	    }
	};
	this.flow = nools.compile("orderFlow.nools", noolsOptions);
	this.session = this.flow.getSession();
}

orderFlow.prototype.run = function(){
	this.runItemRules();
}

orderFlow.prototype.runItemRules = function(){
	oe.defaultOrder.Items.forEach((function(item){
		this.session.assert(new oe.item(item));
	}).bind(this));
	this.runMatch(this.runOrderRules.bind(this));
}

orderFlow.prototype.runOrderRules = function(){
	this.session.dispose();
	this.session = this.flow.getSession();
	this.session.assert(new oe.order(oe.defaultOrder));
	this.runMatch(this.runAllComplete.bind(this));
}

orderFlow.prototype.runAllComplete = function(){
	console.log('executed all rules !!!!\n');
}

orderFlow.prototype.runMatch = function(cbOnDone){
	this.session.match(function(err){
	    if(err){
	        console.error(err.stack);
	        cbOnDone(false);
	    }else{
	        cbOnDone(true);
	    }
	})
}

new orderFlow().run();