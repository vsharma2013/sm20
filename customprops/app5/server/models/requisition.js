import mongoose from 'mongoose';
import * as Schema from './commonSchema';
import * as config from '../../config';
let model = 'requisition';

var ReqSchema = new mongoose.Schema({
	req_name : String,
	req_number : String,
	requester : String,
	obo : String,
	shipto : String,
	shipto_address : String,
	billto : String,
	billto_address : String,
	currency : String,
	customProps : mongoose.Schema.Types.Mixed,
	Items : [mongoose.Schema.Types.Mixed],	
  	id : String
});	


export function * getRequisition(db, params) {
	
	var db2 = db.useDb(config.tenants[params.tenantId]);
	var Requisition = db2.model(model, ReqSchema);
	let result = yield Requisition.findOne({'id': params.id}).exec();
	return result;

}

export function * saveRequisition(db, params) {

	var db2 = db.useDb(config.tenants[params.tenantId]);
	var Requisition = db2.model(model, ReqSchema);
	var req = new Requisition(params.data);
	let result = yield [req.validate(), req.save()];
	return result;

}

export function * updateRequisition(db, params) {

	delete params.data._id;
	var db2 = db.useDb(config.tenants[params.tenantId]);
	var Requisition = db2.model(model, ReqSchema);
	var options = { runValidators: true }
	let result = yield Requisition.findOneAndUpdate({'id': params.id}, params.data, options);
	return result;

}	