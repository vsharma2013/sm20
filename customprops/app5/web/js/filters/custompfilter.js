'use strict';

angular.module('myApp')
    .filter('custompfilter', custompfilter);

function custompfilter(model) {
	if(model.val && model.val.toString())
		return model.val;
	else
		return model.defaultVal;
    return false;
}
