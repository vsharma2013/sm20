var msgs = {
	bool_mandatory : ' is a mandatory boolean value. ',  
	bool_required : ' should be a boolean value. ',
	string_mandatory : ' is a non-empty mandatory string value. ', 
	string_required : ' should be a string value. ',
	float_mandatory : ' is a mandatory floating point value. ', 
	float_required :' should be a floating point value. ',
	int_mandatory : ' is a mandatory integer value. ',  
	int_required : ' should be an integer value. ',
	date_mandatory : ' is a mandatory date type value. ',  
	date_required : ' should be a date type value. ',
	getMaxCharMsg : function(setting) { return setting.label + ' can have maximum ' + setting.maxLength + ' characters.'},
	getMaxDecimalMsg : function(setting) { return setting.label + ' can have maximum ' + setting.numDecimals + ' decimal digits.'}
}

module.exports = msgs;