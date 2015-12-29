import * as requisition from '../models/requisition';

export function * getRequisition(db, params){
	let data = yield requisition.getRequisition(db, params);
	return data;
}

export function * saveRequisition(db, params){
	//run rules here
	let data = yield requisition.saveRequisition(db, params);
	return data;
}

export function * updateRequisition(db, params){
	//run rules here
	let data = yield requisition.updateRequisition(db, params);
	return data;
}