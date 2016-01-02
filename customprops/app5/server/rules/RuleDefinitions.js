import utils from './../services/utilityService';

export default class {
	constructor(){

	}

	checkItemContractNumberAndExpiryDate (req){
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

	checkDocumentForAutoApproval (req){
		if (req.tenantId === 1)
			return  utils.getDocumentValue(req) <= 500 ? true : false;
		else if (req.tenantId === 2)
			return  utils.getDocumentValue(req) <= 250 ? true : false;
	}

	checkSendRequisitionToAllManagers (req){
		return utils.getDocumentValue(req) > 500 ? true : false;;
	}
}

