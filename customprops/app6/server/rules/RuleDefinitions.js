var utils = require('./../Utils');

function RuleDefinitions(){
}

RuleDefinitions.prototype.checkItemContractNumberAndExpiryDate = function(req){
	if(!req.Items) return false;

	for(var i = 0 ; i < req.Items.length; i++){
		var item = req.Items[i];
		if(item.contract_number && item.contract_number.length > 0 && utils.hasDate(item.contract_expiry_date) && Date.parse(item.contract_expiry_date) < Date.now()){
			req.actionObjects['check_item_contract_number_and_expiry_date'] = { index : i + 1, name : item.item_name };
			return true;             
		}
	}

	return false;
}

RuleDefinitions.prototype.checkDocumentForAutoApproval = function(req){
	if (req.tenantId === 1)
		return  utils.getDocumentValue(req) <= 500 ? true : false;
	else if (req.tenantId === 2)
		return  utils.getDocumentValue(req) <= 250 ? true : false;
}

RuleDefinitions.prototype.checkSendRequisitionToAllManagers = function(req){
	return utils.getDocumentValue(req) > 500 ? true : false;;
}

module.exports = RuleDefinitions;