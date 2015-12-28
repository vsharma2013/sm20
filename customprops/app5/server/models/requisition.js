import mongoose from 'mongoose';
import * as config from '../../config';
let model = 'requisition';

var ReqSchema = new mongoose.Schema({
  
});	


export function * getRequisition(db, params) {
	
	var db2 = db.useDb(config.tenants[params.tenant]);
	var Requisition = db2.model(model, ReqSchema);
	let docs = yield Requisition.find({'Id': parseInt(params.req)}).exec();
	// console.log(docs);
	return docs;

}

export function * saveRequisition(db, params) {

	var db2 = db.useDb(config.tenants[params.tenant]);
	var Requisition = db2.model(model, ReqSchema);
	yield [Requisition.validate(), Requisition.save()];

}

	