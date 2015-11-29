var nools = require('nools');
var _ = require('underscore');

var oe = require('./orderEntities');


var flow = nools.compile("orderFlow.nools", {
    define: {
        item : oe.item,
        _ : _
    }
});

var session = flow.getSession();

function runMatch(cbOnDone){

	session.match(function(err){
	    if(err){
	        console.error(err.stack);
	        cbOnDone(false);
	    }else{
	        cbOnDone(true);
	    }
	})
}

function runItemRules(){
	oe.defaultOrder.Items.forEach(function(item){
		session.assert(new oe.item(item));
	});
	runMatch(runAllComplete)
}

function runAllComplete(){
	console.log('executed all rules !!!!\n');
}

console.log('\n');
runItemRules();