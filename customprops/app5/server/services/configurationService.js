import * as configuration from '../models/configuration';

export function * getConfiguration(db, params){
	let data = yield configuration.getConfiguration(db, params);
	return data;
}

export function * saveConfiguration(db, params){
	//run rules here
	let data = yield configuration.saveConfiguration(db, params);
	return data;
}

export function * updateConfiguration(db, params){
	//run rules here
	let data = yield configuration.updateConfiguration(db, params);
	return data;
}