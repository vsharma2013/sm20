import mongoose from 'mongoose';

export let uiSchema = new mongoose.Schema({
	dataType : String,
	uiType : {type:String, enum:['input', 'ddlist', 'chkbox', 'autosuggest', 'calender', 'treepop']},
	label : String,
	defaultVal : String,
	allowEdit : Boolean,
	isMandatory : Boolean,
	maxLength : Number,
	numDecimals : Number,
	autoSuggestURL : String,
	allVals : [String],
	uiGroup : String,
	icon : String,
	section : Number,
	sort : Number
});

var uiModel = mongoose.model('uiModel', uiSchema);

export let dbSchema = new mongoose.Schema({});

var dbModel = mongoose.model('dbModel', uiSchema);

export let basicSchema = new mongoose.Schema({
	primary : {type : mongoose.Schema.Types.Mixed, validate : [validateDict, "validation failed in basic schema"]},
	custom : {type : mongoose.Schema.Types.Mixed, validate : [validateDict, "validation failed in basic schema"]}
});

function validateDict(value){
	var flag = true;
	console.log("value", value);
	for(let dynamicKey in value){
		console.log("dynamicKey", dynamicKey);
		uiModel.create(value[dynamicKey].ui, function(err){
			console.log("err", err);
			if(err){
				flag = false;
			}
		});
		dbModel.create(value[dynamicKey].db, function(err){
			if(err){
				flag = false;
			}
		});
	}; 
	
	return flag;
}