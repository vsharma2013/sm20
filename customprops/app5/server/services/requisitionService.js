import * as requisition from '../models/requisition';
import * as configuration from '../models/configuration';
import validations from './validationService';
import RuleFlow from './../rules/RuleFlow';

export function * getRequisition(db, params){
	let data = yield requisition.getRequisition(db, params);
	return data;
}

export function * saveRequisition(db, params){
	let settings = yield configuration.getConfiguration(db, params);
	var validationResult = validations.validateRequisition(params.data, settings);
	if(!validationResult.success){
		return validationResult.message;
	}
	let data = yield requisition.saveRequisition(db, params);
	return data;
}

export function * updateRequisition(db, params){
	let settings = yield configuration.getConfiguration(db, params);
	var validationResult = validations.validateRequisition(params.data, settings);
	if(!validationResult.success){
		return validationResult.message;
	}
	let data = yield requisition.updateRequisition(db, params);
	return data;
}

export function * submitRequisition(db, params){
	let settings = yield configuration.getConfiguration(db, params);
	var validationResult = validations.validateRequisition(params.data, settings);
	if(!validationResult.success){
		return {success : true, message : validationResult.message};
	} 
	var ruleFlow = new RuleFlow();
	let data = yield ruleFlow.run(params.data);
	return data;
}