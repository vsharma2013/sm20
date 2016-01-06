import router from 'koa-router';
import bodyParser from 'koa-body';
// import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import * as requisitionController from './controllers/requisitionController';
import * as configurationController from './controllers/configurationController';
import view from './views/jsonresponseview'; 

var controllerMethods = {
	getrequisition : requisitionController.getRequisition,
	saverequisition : requisitionController.saveRequisition,
	updaterequisition : requisitionController.updateRequisition,
	submitRequisition : requisitionController.submitRequisition,
	getconfiguration : configurationController.getConfiguration,
	saveconfiguration : configurationController.saveConfiguration,
	updateconfiguration : configurationController.updateConfiguration
}

function * getHandler(){
	var params = this.params;
	let data = yield controllerMethods['get'+params.type](this.db, params);
	view.onSuccess(this, data, 1);
}

function * postHandler(){
	var params = this.params;
	params.data = this.request.body;
	// console.log(this.request.body);
	let data;
	if(!params.id){
		data = yield controllerMethods['save'+params.type](this.db, params);
	} else{
		data = yield controllerMethods['update'+params.type](this.db, params);
	}
	view.onSuccess(this, data, 1);
}

function * submitHandler(){
	var params = this.params;
	params.data = this.request.body;
	let data = yield controllerMethods.submitRequisition(this.db, params);
	view.onSuccess(this, data, 1);
}

export function configure(app) {
	var parser = new bodyParser();
	var APIv1 = new router();
	APIv1.use('', auth({ name: 'username', pass: 'userkey' }));
	APIv1.get('/:type/:tenantId/:id', getHandler);
	APIv1.post('/:type/:tenantId/:id', parser, postHandler);
	APIv1.post('/:type/:tenantId/:id/submit', parser, submitHandler);
	APIv1.post('/:type/:tenantId', parser, postHandler);	 
	// app.use(mount('/p2p', APIv1.middleware()));
	var ReqRouter = new router();
	ReqRouter.use('/p2p', APIv1.routes(), APIv1.allowedMethods());	
	app.use(ReqRouter.routes());
	app.use(ReqRouter.allowedMethods());
}
