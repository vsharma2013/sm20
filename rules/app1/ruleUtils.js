var _ = require('underscore');

function ruleUtils(){

}

ruleUtils.prototype.checkItemAccSplitsForDepAndCC = function(item){
	var cnt = item.AccountingSplits.length;
	if(cnt > 1){
		var first = {
			cc : item.AccountingSplits[0].CostCenter,
			dep : item.AccountingSplits[0].Department
		};
		for(var i = 1 ; i < cnt; i++){
			if(first.cc !== item.AccountingSplits[i].CostCenter  ||  first.dep !== item.AccountingSplits[i].Department)
				return false;
		}
		return true;
	}
	return false;
}

ruleUtils.prototype.checkItemAccSplitsForEmptyProjectCostCenterAndLegalEntity = function(item, arrCC, arrLE){
	var arrAccSplitIds = [];
	item.AccountingSplits.forEach(function(as){
		if(as.Project.length === 0 && arrCC.indexOf(as.CostCenter) !== -1 && arrLE.indexOf(as.LegalEntity[0]) !== -1)
			arrAccSplitIds.push(as.Id);
	});
	if(arrAccSplitIds.length > 0)
		console.log('Empty project, cost center and legal entity validation error or for item Id : %s and account split Ids : %s\n', item.Id, arrAccSplitIds.join(','));
	
	return false;
}

ruleUtils.prototype.checkContractedItemApprovalForUnitPriceVsContractedPrice = function(item){
	if(item.Contracted && item.UnitPrice && item.ContractedPrice){
		return item.Contracted && (item.UnitPrice > item.ContractedPrice);
	}
	return false;
}

ruleUtils.prototype.sendApprovalToDepartmentManager = function(item){
	var managerSorted = _.sortBy(item.AccountingSplits, function(as) { return as.SortOrder;});
	console.log('Sending approval to manager of department : %s    for item : \"%s\" \n', managerSorted[0].Department, item.Name);
}

ruleUtils.prototype.sendApprovalToDistinctCostCenters = function(item){
	var allCC = _.pluck(item.AccountingSplits, 'CostCenter');
	var distinctCC = _.uniq(allCC);
	console.log('Sending approval to distinct cost centers : \"%s\"   for item : \"%s\"\n', distinctCC.join(','), item.Name );
}

ruleUtils.prototype.sendApprovalForTotalAccountingSplitValue = function(order){
	var ccVsTotalAccSplit = {};
	order.Items.forEach(function(item){
		item.AccountingSplits.forEach(function(as){
			if(!ccVsTotalAccSplit[as.CostCenter])
				ccVsTotalAccSplit[as.CostCenter] = 0;

			var accSplitValue = 0;
			if(item.SplitType === '#')
				accSplitValue = (as.SplitValue * item.UnitPrice) + item.Taxes + item.Shipping + item.OtherCharges;
			else if (item.SplitType === '%')
				accSplitValue = (((item.Quantity * item.UnitPrice) + item.Taxes + item.Shipping + item.OtherCharges) * as.SplitValue)/100;

			ccVsTotalAccSplit[as.CostCenter] += accSplitValue;
		});
	});
	console.log('Total accounting split for distinct cost centers : %s\n', JSON.stringify(ccVsTotalAccSplit));
	var ccAccSplitGT50K = [];
	for(var cc in ccVsTotalAccSplit){
		if(ccVsTotalAccSplit[cc] > 50000)
			ccAccSplitGT50K.push(cc);
	}

	if(ccAccSplitGT50K.length > 0)
		console.log('Sending approval to cost center auditors as TotalAccountingSplit > 50000 for : \"%s\"\n', ccAccSplitGT50K.join(','));
}

ruleUtils.prototype.sendApprovalToContactManagerGroup = function(order){
	var hasNoCC1 = true;
	for(var i = 0 ; i < order.Items.length; i++){
		if(!order.Items[i].Contracted) return false;

		for(var j = 0; j < order.Items[i].AccountingSplits.length; j++){
			if(order.Items[i].AccountingSplits[j].CostCenter === 'CC11' && hasNoCC1){
				hasNoCC1 = false;
				break;
			}
		}
	}
	return hasNoCC1;
}

ruleUtils.prototype.sendApprovalToAdhocCCGroup = function(order){
	var hasContractedItem = false;
	var hasCC10 = false;
	for(var i = 0 ; i < order.Items.length; i++){
		var item = order.Items[i];
		if(item.Contracted && !hasContractedItem)
			hasContractedItem = true;

		for(var j = 0 ; j < item.AccountingSplits.length; j++){
			var accSplit = item.AccountingSplits[j];
			if(accSplit.CostCenter === 'CC10' && !hasCC10){
				hasCC10 = true;
			}
		}
	}
	return hasContractedItem && hasCC10;
}

ruleUtils.prototype.sendApprovalToLoggerGroup = function(order){
	var hasNonContractedItem = false;
	var has1AccSplit = false;
	for(var i = 0 ; i < order.Items.length; i++){
		var item = order.Items[i];
		if(!item.Contracted && !hasNonContractedItem)
			hasNonContractedItem = true;

		for(var j = 0 ; j < item.AccountingSplits.length; j++){
			var accSplit = item.AccountingSplits[j];
			if(accSplit.length === 1 && !has1AccSplit){
				has1AccSplit = true;
			}
		}
	}
	return hasNonContractedItem || has1AccSplit;
}


module.exports = new ruleUtils();