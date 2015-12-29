import koa from 'koa';
import mongoose from 'mongoose'; 	
import koaJsonLogger from 'koa-json-logger';
import * as routes from './routes';
import * as view from './views/jsonresponseview'; 
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
		name: 'my App',
		path: 'log',
		jsonapi: true
	}));

	app.use(function *(next){
	  this.db = db;
	  yield next;
	  console.log('%s - %s', this.method, this.url);
	});

	app.use(function *(next){
		try{
		    yield next; 
		} catch (err) { //executed only when an error occurs & no other middleware responds to the request
			view.onError(this, 'application failed to respond', 22);
			//delegate the error back to application
			// this.app.emit('error', err, this);
			this.throw('error occurred in application: %s', err);
		}
	});

	routes.configure(app);

	app.listen(3000);

	console.log('server started listening on port 3000');
}

