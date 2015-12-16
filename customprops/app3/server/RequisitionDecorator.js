var utils = require('./Utils');
var _ = require ('underscore');

function RequisitionDecorator(){

}

var gReqDec = new RequisitionDecorator();

module.exports = gReqDec;

RequisitionDecorator.prototype.addUISchemaToCustomProps = function(requisition, customPropsUISchema){
	this.customPropsUISchema = customPropsUISchema;
	this.convertCustomPropsObjectToArray(requisition);
	if(!utils.hasArray(requisition.Items)) return;

	requisition.Items.forEach((function(item){
		this.convertCustomPropsObjectToArray(item.shipping);
		this.convertCustomPropsObjectToArray(item.others);

		if(utils.hasArray(item.accounting)){
			item.accounting.forEach((function(acc){
		  		this.convertCustomPropsObjectToArray(acc);
		  	}).bind(this));
		}		
	}).bind(this));
}

RequisitionDecorator.prototype.removeUISchemaFromCutomProps = function(requisition){
	this.convertCustomPropsArrayToObject(requisition);	
	if(!utils.hasArray(requisition.Items)) return;

	requisition.Items.forEach((function(item){
		this.convertCustomPropsArrayToObject(item.shipping);
		this.convertCustomPropsArrayToObject(item.others);

		if(utils.hasArray(item.accounting)){
			item.accounting.forEach((function(acc){
		  		this.convertCustomPropsArrayToObject(acc);
		  	}).bind(this));
		}
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

