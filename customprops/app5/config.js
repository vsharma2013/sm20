
export let tenants = {
	tenant1 : 'camc',
	tenant2 : 'abm',
	tenant3 : 'mylan'
};	

export const configdb = 'configdb';

export const localPort = 3000;

export const securePort = 3001;

export const connectionString = 'mongodb://localhost/'+configdb; 

export let dbOptions = {
	db: { native_parser: true }
	, server: { poolSize: 5, socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
	// , replset: { rs_name: 'myReplicaSetName' }
	// , user: 'myUserName'
	// , pass: 'myPassword'
};

export let corsOptions = {
	origin : '*',
	allowMethods : 'POST,GET,PUT,DELETE,OPTIONS',
	exposeHeaders : 'WWW-Authenticate, Server-Authorization',
	allowHeaders : 'x_radio_partnerid, x_radio_auth, Cache-Control, ragma, Origin, Authorization, Content-Type, X-Requested-With',
	// maxAge : '',
	credentials : true
}

export let ssl = {
	keyPath: 'key.pem',
	certPath: 'key-cert.pem'
};

