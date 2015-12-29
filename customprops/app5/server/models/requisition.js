import mongoose from 'mongoose';
import * as config from '../../config';
let model = 'requisition';

var ReqSchema = new mongoose.Schema({
	bUID: {type:Number, required:true},
	Id: {type:Number, required:true},
	// _id: mongoose.Schema.Types.ObjectId,
  	baseCurrency: {type:String, required:true}
});	


export function * getRequisition(db, params) {
	
	var db2 = db.useDb(config.tenants[params.tenant]);
	var Requisition = db2.model(model, ReqSchema);
	let result = yield Requisition.find({'Id': parseInt(params.req)}).exec();
	return result;

}

export function * saveRequisition(db, params) {

	var db2 = db.useDb(config.tenants[params.tenant]);
	var Requisition = db2.model(model, ReqSchema);
	var req = new Requisition(params.data);
	let result = yield [req.validate(), req.save()];
	return result;

}

export function * updateRequisition(db, params) {

	var db2 = db.useDb(config.tenants[params.tenant]);
	var Requisition = db2.model(model, ReqSchema);
	var options = { runValidators: true }
	let result = yield Requisition.update({'Id': parseInt(params.req)}, params.data, options);
	return result;

}
	