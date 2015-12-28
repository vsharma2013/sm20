import * as requisition from '../models/requisition';

export function * getRequisition(db, params){
	let data = yield requisition.getRequisition(db, params);
	return data;
}