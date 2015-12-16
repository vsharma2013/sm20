var utils = require('./Utils');
var _ = require ('underscore');

function RequisitionDecorator(){

}

var gReqDec = new RequisitionDecorator();

module.exports = gReqDec;

RequisitionDecorator.prototype.addUISchemaToCustomProps = function(requisition, customPropsUISchema){
	this.customPropsUISchema = customPropsUISchema;
	this.decorateRequisitionWithOperation(requisition, this.convertCustomPropsObjectToArray.bind(this));	
}

RequisitionDecorator.prototype.removeUISchemaFromCutomProps = function(requisition){
	this.decorateRequisitionWithOperation(requisition, this.convertCustomPropsArrayToObject.bind(this));
}

RequisitionDecorator.prototype.decorateRequisitionWithOperation = function(requisition, decorator){
	decorator(requisition);	
	if(!utils.hasArray(requisition.Items)) return;

	requisition.Items.forEach((function(item){
		decorator(item.shipping);
		decorator(item.others);
		if(!utils.hasArray(item.accounting)) return;
			
		item.accounting.forEach((function(acc){
	  		decorator(acc);
	  	}).bind(this));
	}).bind(this));
}

RequisitionDecorator.prototype.convertCustomPropsObjectToArray = function(parentItem){
	if(!parentItem) return;
	var cProps = parentItem.customProps;
	if(!cProps) return;

	var cps = [];
	for(var key in cProps){
		cps.push(this.getUICustomPropFromKeyVal(key, parentItem.customProps[key]));
	}
	parentItem.customProps = cps;
}

RequisitionDecorator.prototype.convertCustomPropsArrayToObject = function(parentItem){
	if(!parentItem) return;
	var cProps = parentItem.customProps;
	if(!utils.hasArray(cProps)) return;

	var cps = {};
	cProps.forEach(function(cp){
		cps[cp.key] = cp.val;
	});
	parentItem.customProps = cps;
}

RequisitionDecorator.prototype.getUICustomPropFromKeyVal = function(key, val){
	var cp = {key : key};
	cp = _.extend(cp, this.customPropsUISchema[key]);
	cp.val = val;
	return cp;
}

