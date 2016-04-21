var http = require('http');
var url = require('url');
var inrule = require('./OrderLineItemApplication.min.js');

const PORT = 8080;

function handleRequest(request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            //console.log(body);

            var session = inrule.createRuleSession();
            
            var order = JSON.parse(body);

            session.createEntity('Order', order);

            session.applyRules();
            
            //console.log(JSON.stringify(order));

            //response.writeHead(200, { 'Content-Type': 'text/plain' });
            //response.write(JSON.stringify(order));
            response.end(JSON.stringify(order));
        });
    }


    //response.end(request.body);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});