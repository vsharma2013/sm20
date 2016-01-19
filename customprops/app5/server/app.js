import koa from 'koa';
import fs from 'fs';
import https from 'https';
import cors from 'kcors';
import mongoose from 'mongoose'; 	
import koaJsonLogger from 'koa-json-logger';
import common from 'koa-common';
import enforceHttps from 'koa-sslify';
import gzip from 'koa-gzip';
// import auth from 'koa-basic-auth';
import * as routes from './routes';
import view from './views/jsonresponseview'; 
import * as config from '../config';

var app = koa();


export function start() {

	var db = mongoose.createConnection(config.connectionString, config.dbOptions); 

	db.on('connected', function () {  
	  console.log('Mongoose connection open ');
	}); 

	db.on('error',function (err) {  
	  console.log('Mongoose connection error: ' + err);
	}); 

	db.on('disconnected', function () {  
	  console.log('Mongoose connection disconnected'); 
	});
 
	app.use(koaJsonLogger({
		name: 'myApp',
		path: 'log',
		jsonapi: false
	}));
	
	app.use(gzip());

	app.use(enforceHttps());

	app.use(common.static(__dirname+'./../web'));

	app.use(cors(config.corsOptions));

	app.use(function *(next){
	  this.db = db;
	  this.type = 'application/json';
	  yield next;
	  // this.body = "Hello World";
	  console.log('%s - %s', this.method, this.url);
	});

	app.use(function *(next){
		try{
		    yield next; 
		} catch (err) { //executed only when an error occurs & no other middleware responds to the request
			// view.onError(this, 'application failed to respond', 22);
			//delegate the error back to application
			// this.app.emit('error', err, this);
			this.throw('error occurred in application: %s', err);
		}
	});

	// app.use(auth({ name: 'username', pass: 'userkey' }));	

	routes.configure(app);

	app.listen(process.env.PORT || config.localPort);
	
	var sslOptions = {
		key: fs.readFileSync(config.ssl.keyPath),
		cert: fs.readFileSync(config.ssl.certPath)
	};

	https.createServer(sslOptions, app.callback()).listen(process.env.SSLPORT || config.securePort);

	console.log('https server started listening on port %s', process.env.SSLPORT || config.securePort);
}

