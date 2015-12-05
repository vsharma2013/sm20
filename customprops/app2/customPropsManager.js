var _ = require('underscore');
var cpSchema = require('./custPropsSchema');
var someComments = ['send to marketing', 'order is for medical', 'order value too high', 'send approvals to audit group', 'itmes count too high'];
var someDates = ['2010/12/10', '2011/11/11', '2012/10/12', '2013/09/21', '2014/08/22', '2015/07/23', '2016/06/24'];

function customPropsManager(){

}

var gCPMgr = new customPropsManager();

module.exports = gCPMgr;

customPropsManager.prototype.getRandomCustomProperties = function(propCnt){
	if(!propCnt) return null;

	var custProps = {};
	var keys = this.getKeys(propCnt);
	keys.forEach((function(key){
		custProps[key] = this.getCustomPropValueForKey(key);
	}).bind(this));
	return custProps;
}

customPropsManager.prototype.getKeys = function(propCnt){
	var allKeys = Object.keys(cpSchema);
	var keys = [];		
	while(keys.length < propCnt){
		var key = this.getRandomItemFromArray(allKeys);
		if(!_.contains(keys, key))
			keys.push(key);
	} 
	return keys;
}

customPropsManager.prototype.getCustomPropValueForKey = function(key){
	var val = null;
	switch(key){
		case 'order_category'   : val = this.getRandomItemFromArray(cpSchema[key].ui.allValues); break;
		case 'order_priority'   : val = this.getRandomItemFromArray(cpSchema[key].ui.allValues); break;
		case 'order_comments'   : val = this.getRandomItemFromArray(someComments); break;
		case 'order_recurrence' : val = this.getRandomItemFromArray(cpSchema[key].ui.allValues); break;
		case 'order_expiry'     : val = this.getRandomItemFromArray(someDates); break;
	}
	return val;
}

customPropsManager.prototype.getRandomArrayIndex = function(arr){
	return this.randomIntFromInterval(0, arr.length-1);
}

customPropsManager.prototype.getRandomItemFromArray = function(arr){
	return arr[this.randomIntFromInterval(0,arr.length-1)];
}

customPropsManager.prototype.randomIntFromInterval = function(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

customPropsManager.prototype.shuffleArray = function(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
