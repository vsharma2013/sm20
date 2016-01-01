import * as requisitionService from '../services/requisitionService';

export function * getRequisition(db, params){
	return yield requisitionService.getRequisition(db, params);	
}

export function * saveRequisition(db, params){
	return yield requisitionService.saveRequisition(db, params);	
}

export function * updateRequisition(db, params){
	return yield requisitionService.updateRequisition(db, params);	
}

export function * submitRequisition(db, params){
	return yield requisitionService.submitRequisition(db, params);	
}