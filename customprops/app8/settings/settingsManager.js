function getSettings(tenantId){
	if(tenantId === 'abm')
		return require('./settings/abm/settings');
	else if(tenantId === 'camc')
		return require('./settings/camc/settings');
}

module.exports = {
	getSettings : getSettings
}