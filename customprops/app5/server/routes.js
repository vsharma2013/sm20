import router from 'koa-router';
import bodyParser from 'koa-body';
import mount from 'koa-mount';
import * as requisitionController from './controllers/requisitionController';
import * as view from './views/jsonresponseview'; 

var controllerMethods = {
	getRequisition : requisitionController.getRequisition
}

function * getHandler(){
	var params = this.params;
	let data = yield controllerMethods.getRequisition(this.db, params);
	view.onSuccess(this, data, 1);
}

function * postHandler(){
	var params = this.params;
	params.data = this.request.body;
	// console.log(this.request.body);
	let data = yield controllerMethods.saveRequisition(this.db, params);
	view.onSuccess(this, data, 1);
}

export function configure(app) {
	var parser = new bodyParser();
	var APIv1 = new router();
	var ReqRouter = new router();
	APIv1.get('/:tenant/:req', getHandler);
	APIv1.post('/:tenant/:req', parser, postHandler);	 	 
	// app.use(mount('/p2p', APIv1.middleware()));
	ReqRouter.use('/p2p', APIv1.routes(), APIv1.allowedMethods())
	app.use(ReqRouter.routes());
	app.use(ReqRouter.allowedMethods());
}
