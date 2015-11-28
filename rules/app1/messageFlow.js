var nools = require("nools");

function Message(message) {
    this.text = message;
};

var flow = nools.compile("messageFlow.nools", {
    define: {
        Message: Message
    }
});

var session = flow.getSession();

session.assert(new Message("hello"));
session.assert(new Message("hello world"));
session.assert(new Message("goodbye"));


session.match(function(err){
    if(err){
        console.error(err.stack);
    }else{
        console.log("done");
    }
})