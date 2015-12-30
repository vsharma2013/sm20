import * as configurationService from '../services/configurationService';

export function * getConfiguration(db, params){
	return yield configurationService.getConfiguration(db, params);	
}

export function * saveConfiguration(db, params){
	return yield configurationService.saveConfiguration(db, params);	
}

export function * updateConfiguration(db, params){
	return yield configurationService.updateConfiguration(db, params);	
}