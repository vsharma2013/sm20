
export let tenants = {
	tenant1 : 'camc',
	tenant2 : 'abm',
	tenant3 : 'mylan'
};	

export let configdb = 'configdb';

export let localPort = 3000;

export let connectionString = 'mongodb://localhost/'+configdb; 

export let dbOptions = {
	db: { native_parser: true }
	, server: { poolSize: 5, socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
	// , replset: { rs_name: 'myReplicaSetName' }
	// , user: 'myUserName'
	// , pass: 'myPassword'
}