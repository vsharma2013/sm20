function getSettings(tenantId){
	if(tenantId === 'abm')
		return require('./abm/settings');
	else if(tenantId === 'camc')
		return require('./camc/settings');
}

module.exports = {
	getSettings : getSettings
}