import mongoose from 'mongoose';
import * as Schema from './commonSchema';
import * as config from '../../config';
let model = 'requisition';

var ReqSchema = new mongoose.Schema({
	RequisitionName : String,
	RequisitionNumber : String,
	RequesterId : Number,
	RequestorName : String,
	OBO_Id : Number,
	OBO_Name : String,
	Shiptoid : Number,
	Shiptoname : String,
	Shiptoaddress : String,
	Billtoid : Number,
	Billtoname : String,
	Billtoaddress : String,
	Currency : String,
	customProps : mongoose.Schema.Types.Mixed,
	Items : [mongoose.Schema.Types.Mixed],
  	id : Number
});	


export function * getRequisition(db, params) {
	
	var db2 = db.useDb(config.tenants[params.tenantId]);
	var Requisition = db2.model(model, ReqSchema);
	let result = yield Requisition.find({'Id': parseInt(params.id)}).exec();
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
	let result = yield Requisition.update({'Id': parseInt(params.id)}, params.data, options);
	return result;

}
	