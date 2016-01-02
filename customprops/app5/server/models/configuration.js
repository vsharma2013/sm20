import mongoose from 'mongoose';
import * as Schema from './commonSchema';
import * as config from '../../config';
let model = 'setting';

var SettingsSchema = new mongoose.Schema({
	// setup : Schema.basicSchema,
	// item : Schema.basicSchema,
	// split : Schema.basicSchema,
	setup : mongoose.Schema.Types.Mixed,
	item : mongoose.Schema.Types.Mixed,
	split : mongoose.Schema.Types.Mixed,
	id : String
});	


export function * getConfiguration(db, params) {
	
	var db2 = db.useDb(config.tenants[params.tenantId]);
	var configuration = db2.model(model, SettingsSchema);
	let result = yield configuration.findOne({'id': params.id}).exec();
	return result;

}

export function * saveConfiguration(db, params) {

	var db2 = db.useDb(config.tenants[params.tenantId]);
	var configuration = db2.model(model, SettingsSchema);
	var conf = new configuration(params.data);
	let result = yield [conf.validate(), conf.save()];
	return result;

}

export function * updateConfiguration(db, params) {

	var db2 = db.useDb(config.tenants[params.tenantId]);
	delete params.data._id;
	var configuration = db2.model(model, SettingsSchema);
	var options = { runValidators: true }
	let result = yield configuration.findOneAndUpdate({'id': params.id}, params.data, options);
	return result;

}
	