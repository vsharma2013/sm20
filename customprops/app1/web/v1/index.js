function App(){

}
var app = new App();

$(document).ready(function(){
	app.run();
})


App.prototype.run = function(){
	$.getJSON('/api/order', function(res){
		console.log(res);
	});
}