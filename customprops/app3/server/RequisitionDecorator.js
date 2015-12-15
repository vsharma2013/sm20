var utils = require('./Utils');

function RequisitionDecorator(){

}

var gReqDec = new RequisitionDecorator();

module.exports = gReqDec;

RequisitionDecorator.prototype.addUISchemaToCustomProps = function(requisition, customPropsUISchema){
	this.customPropsUISchema = customPropsUISchema;
	var cps = [];
	if(requisition.customProps){
		for(var key in requisition.customProps){
			cps.push(this.getCustomPropFromKeyVal(key, requisition.customProps[key]));
		}
		requisition.customProps = cps;
	}
	requisition.Items.forEach((function(item){
		this.addUISchemaToItemDetailCustomProps(item, 'shipping');
		this.addUISchemaToItemDetailCustomProps(item, 'others');
		this.addUISchemaToItemDetailCustomPropsAccounting(item);
	}).bind(this));
}

RequisitionDecorator.prototype.addUISchemaToItemDetailCustomProps = function(item, itemDetailKey){
	var cProps = item[itemDetailKey].customProps;
	if(!cProps) return;

	var cps = [];
	for(var key in cProps){
		cps.push(this.getCustomPropFromKeyVal(key, item[itemDetailKey].customProps[key]));
	}
	item[itemDetailKey].customProps = cps;
}

RequisitionDecorator.prototype.addUISchemaToItemDetailCustomPropsAccounting = function(item){
	if(!item.accounting) return;
  	if(!Array.isArray(item.accounting)) return;
  	item.accounting.forEach((function(acc){
  		var obj = {
  			acc : {
  				customProps : acc.customProps
  			}
  		};
  		this.addUISchemaToItemDetailCustomProps(obj, 'acc');
  		acc.customProps = obj.acc.customProps;
  	}).bind(this));
}

RequisitionDecorator.prototype.removeUISchemaFromCutomProps = function(requisition){
	var self = this;	
	if(utils.hasArray(requisition.customProps)){
		var cps = {};
		requisition.customProps.forEach(function(cp){
			cps[cp.key] = cp.val;
		});
		requisition.customProps = cps;
	}

	if(utils.hasArray(requisition.Items)){
		requisition.Items.forEach(function(item){
			self.removeUISchemaFromItemDetailCustomProps(item, 'shipping');
			self.removeUISchemaFromItemDetailCustomProps(item, 'others');
			self.removeUISchemaFromItemDetailCustomPropsAccounting(item);
		});
	}
}

RequisitionDecorator.prototype.removeUISchemaFromItemDetailCustomProps = function(item, itemDetailKey){
	var cProps = item[itemDetailKey].customProps;
	if(!utils.hasArray(cProps)) return;

	var cps = {};
	cProps.forEach(function(cp){
		cps[cp.key] = cp.val;
	});
	item[itemDetailKey].customProps = cps;
}

RequisitionDecorator.prototype.removeUISchemaFromItemDetailCustomPropsAccounting = function(item){
	if(!utils.hasArray(item.accounting)) return;

	item.accounting.forEach(function(acc){
		if(utils.hasArray(acc.customProps)){
			var cps = {};
			acc.customProps.forEach(function(cp){
				cps[cp.key] = cp.val;	
			});
			acc.customProps = cps;
		}
	});
}

RequisitionDecorator.prototype.getCustomPropFromKeyVal = function(key, val){
	//TBD: this is a quick n dirty fix, right way to do it is to remove "val" property
	//     in customProp Object and change the dummy data generation logic to not use a random
	//     proerty "val" from customProp object. For sure customProp schema has to used as reference AND NOT AS VALUE
	//     Refer "app4" where this has already been implemented
	return {
		key : key,
		val : val,
		type : this.customPropsUISchema[key].type,
		label : this.customPropsUISchema[key].label,
		allowEdit : this.customPropsUISchema[key].allowEdit,
		defaultVal : this.customPropsUISchema[key].defaultVal,
		allVals : this.customPropsUISchema[key].allVals
	}
}