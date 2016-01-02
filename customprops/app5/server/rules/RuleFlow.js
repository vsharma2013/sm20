import nools from 'nools';
import ro from './RuleObjects';
import RuleDefinitions from './RuleDefinitions';
import RuleActions from './RuleActions';

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

class RuleFlow{
	constructor(){

	}

	run(requisition, cbOnDone){
		session = flow.getSession();
		session.assert(new ro.Requisition(requisition));
		this.runMatch(cbOnDone);
	}

	runMatch(cbOnDone){
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
}

export default RuleFlow;