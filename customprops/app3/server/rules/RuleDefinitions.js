var utils = require('./../Utils');

function RuleDefinitions(){
}

RuleDefinitions.prototype.checkItemContractNumberAndExpiryDate = function(req){
	if(!req.Items) return false;

	for(var i = 0 ; i < req.Items.length; i++){
		var item = req.Items[i];
		var bValid = item.contract && 
					 item.contract.Contractnumber &&
		             utils.hasString(item.contract.Contractnumber) && 
		             utils.hasDate(item.contract.Contractexpirydate) &&
		             Date.parse(item.contract.Contractexpirydate) < Date.now();
		if(bValid){
			req.actionObjects['check_item_contract_number_and_expiry_date'] = { index : i + 1, name : item.Item };
			return true;             
		}
	}
	return false;
}

RuleDefinitions.prototype.checkDocumentForAutoApproval = function(req){
	return utils.getDocumentValue(req) <= 500 ? true : false;
}

RuleDefinitions.prototype.checkSendRequisitionToAllManagers = function(req){
	return utils.getDocumentValue(req) > 500 ? true : false;;
}

module.exports = RuleDefinitions;