var nools = require('nools');
var order = require('./order');


var flow = nools.compile("orderFlow.nools", {
    define: {
        order: order
    }
});

var session = flow.getSession();

session.assert(order);


session.match(function(err){
    if(err){
        console.error(err.stack);
    }else{
        console.log("done");
    }
})