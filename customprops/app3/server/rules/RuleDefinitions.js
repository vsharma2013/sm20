function RuleDefinitions(){
}

RuleDefinitions.prototype.checkItemContractNumberAndExpiryDate = function(req){
	if(!req.Items) return false;

	for(var i = 0 ; i < req.Items.length; i++){
		var item = req.Items[i];
		var bValid = item.contract && 
					 item.contract.Contractnumber &&
		             hasString(item.contract.Contractnumber) && 
		             hasDate(item.contract.Contractexpirydate) &&
		             Date.parse(item.contract.Contractexpirydate) < Date.now();
		if(bValid){
			req.actionObjects['check_item_contract_number_and_expiry_date'] = { index : i + 1, name : item.Item };
			return true;             
		}
	}
	return false;
}

RuleDefinitions.prototype.checkDocumentForAutoApproval = function(req){
	return getDocumentValue(req) <= 500 ? true : false;
}

RuleDefinitions.prototype.checkSendRequisitionToAllManagers = function(req){
	return getDocumentValue(req) > 500 ? true : false;;
}

function getDocumentValue(req){
	var val = 0;
	req.Items.forEach(function(item){
		val += (item.Quantity * item.Unitprice);
		val += item.Taxes ? item.Taxes : 0;
		val += item.Shippingcharges ? item.Shippingcharges : 0;
		val += item.Othercharges ? item.Othercharges : 0;
	});
	return val;
}

function hasString(str){
	return /([^\s])/.test(str);
}

function hasDate(d){
	try{
		Date.parse(d);
		return true;
	}
	catch(e){
		return false;
	}
}

module.exports = RuleDefinitions;