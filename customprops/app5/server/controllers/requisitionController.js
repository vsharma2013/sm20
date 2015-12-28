import * as requisitionService from '../services/requisitionService';

export function * getRequisition(db, params){
	return yield requisitionService.getRequisition(db, params);	
}

export function * saveRequisition(db, params){
	return yield requisitionService.saveRequisition(db, params);	
}