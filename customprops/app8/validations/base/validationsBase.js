var _ = require('underscore');

function ValidationsBase(){

}

ValidationsBase.prototype.validate = function(doc, settings){
	console.log('inside validations base!!!');
	var setUp = {};
	var items = document.Items;
	var itemAccSplits = {};

	for(var key in doc){
		var propVal = doc[key];
		if(!this.isArrayOrObject(propVal)){
			setUp[key] = propVal;
		}
	}
	setUp = _extend(setUp, doc.customProps);

	if(!this.isEmptyArray(items)){
		items.forEach(function(item){
			itemAccSplits[item.item_name] = item.Splits;
		});
	}

	var v1 = this.validateSetup(setUp, settings);
	var v2 = this.validateItems(items, settings);
	var v3 = this.validateSplits(itemAccSplits, settings);

	return v1.concat(v2).concat(v3);
}

ValidationsBase.prototype.validateSetup = function(setUp, settings){

}

ValidationsBase.prototype.validateItems = function(items, settings){

}

ValidationsBase.prototype.validateSplits = function(itemAccSplits, settings){

}

ValidationsBase.prototype.isArrayOrObject = function(srcObj){
	if(!srcObj) return false;
	if(Array.isArray(srcObj)) return true;
	if(typeof(srcObj) === 'object') return true;
}

ValidationsBase.prototype.isEmptyArray = function(arr){
	if(arr && Array.isArray(arr) && arr.length > 0 ) 
		return true;
	return false;
}

module.exports = ValidationsBase;