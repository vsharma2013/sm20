var nools = require('nools');
var oe = require('./orderEntities');


var flow = nools.compile("orderFlow.nools", {
    define: {
        item : oe.item
    }
});

var session = flow.getSession();

oe.defaultOrder.Items.forEach(function(item){
	session.assert(new oe.item(item));
});

session.match(function(err){
    if(err){
        console.error(err.stack);
    }else{
        console.log("done");
    }
})