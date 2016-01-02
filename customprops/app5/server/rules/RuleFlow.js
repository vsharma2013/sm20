import nools from 'nools';
import ro from './RuleObjects';
import co from 'co';
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

	* run(requisition){
		session = flow.getSession();
		session.assert(new ro.Requisition(requisition));
		return yield this.runMatch();
	}

	* runMatch(){
		var res = false;
		var fn = co.wrap(function* (val) {
			return session.match(function(err){
				console.log("err", err);
			});
		});
		return yield fn().then(function (val) {
		    res = true;
		    session.dispose();
		    var r = ruleAct.getResults();
		    ruleAct.clear();
		    return {success: res, results : r};
		}, function (err) {
			console.log('err',err);
		  	console.error(err.stack);
		  	session.dispose();
		    var r = ruleAct.getResults();
		    ruleAct.clear();
		    return {success: res, results : r};
		});
	}
}

export default RuleFlow;