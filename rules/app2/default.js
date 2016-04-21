// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var ruleResults = '';

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            //Reteive the button and register the evnt handler
            var execRulesButton = document.getElementById("execRules");
            execRulesButton.addEventListener("click", execRulesClickHandler, false);
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function execRulesClickHandler(eventInfo) {
        //Clear output results
        ruleResults = '';
        document.getElementById("outputText").value = '';

        //Execute rules via node.js or on the client?
        var useNodeJs = document.getElementById("useNodeJs").checked;

        //Get the number transactions to execute
        var transactionCount = document.getElementById("inputCount").value;

        var start = Date.now();

        for (var i = 1; i <= transactionCount; i++) {
            //Sample order + line item transaction
            var json = { "ID": 1, "Date": "2016-01-06T09:09:32.8044446-06:00", "Total": 0.0, "LineItems": [{ "ID": 1, "Description": null, "Quantity": 19, "PricePerUnit": 26.0, "Total": 0.0, "QualifiesForDiscount": false, "DiscountPercent": 0.0 }, { "ID": 2, "Description": null, "Quantity": 19, "PricePerUnit": 26.0, "Total": 0.0, "QualifiesForDiscount": false, "DiscountPercent": 0.0 }, { "ID": 3, "Description": null, "Quantity": 19, "PricePerUnit": 26.0, "Total": 0.0, "QualifiesForDiscount": false, "DiscountPercent": 0.0 }, { "ID": 4, "Description": null, "Quantity": 19, "PricePerUnit": 26.0, "Total": 0.0, "QualifiesForDiscount": false, "DiscountPercent": 0.0 }] };

            if (useNodeJs) {
                execRuleUsingNodeJs(i, json);
            }
            else {
                var session = new inrule.createRuleSession();

                var entity = session.createEntity("Order", json);

                session.applyRules();

                ruleResults += "Transaction #" + i + " Order Total:" + entity.getField("Total").getValue();
                ruleResults += "\n";
            }            
        }

        document.getElementById("outputText").value = ruleResults;

        var end = Date.now();
        var diff = end - start;

        document.getElementById("executionTime").innerText = "Total Execution Time: " + diff + "ms";
    }

    function execRuleUsingNodeJs(number, order) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(order),
            complete: function (response) {
                var retOrder = JSON.parse(response.responseText);

                ruleResults += "Transaction #" + number + " Order Total:" + retOrder.Total;
                ruleResults += "\n";

                document.getElementById("outputText").value = ruleResults;
            }
        })
    }

    app.start();
})();
