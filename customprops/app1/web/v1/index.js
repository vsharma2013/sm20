function App(){
	this.order = null;
}
var app = new App();

$(document).ready(function(){
	app.run();
})


App.prototype.run = function(){
	$.getJSON('/api/order', (function(res){
		console.log(res);
		this.order = res;
		this.render();
	}).bind(this));
}

App.prototype.render = function(){
	this.renderLeftContainer();
	this.renderRightContainer();
}

App.prototype.renderLeftContainer = function(){
	if(!this.order.Items) return;
	if(!this.order.Items.length) return;

	var self = this;
	var $ul = $('#item-list');
	for(var i = 0; i < this.order.Items.length; i++){
	  var $li = $('<li class="list-group-item"></li');
	  $li.attr('idx',  this.order.Items[i].Id - 1);
	  $li.text(this.order.Items[i].Name);
	  $li.appendTo($ul);
	}
	$('.list-group-item').first().addClass('active');
	$('#item-list .list-group-item').on('click', function(){
		$('.list-group-item').removeClass('active');
		$(this).addClass('active');
		self.renderItemProps(parseInt($(this).attr('idx')));
	});
}

App.prototype.renderRightContainer = function(){
	this.renderOrderProps();
	this.renderItemProps(0);
}

App.prototype.renderOrderProps = function(){
	for(var key in this.order){
		if(typeof(this.order[key]) !== 'object'){
			var html = '<div class="col-md-6"><div class="pull-left">ID_KEY</div><div class="pull-right prim-right">ID_VAL</div></div>';
			html = html.replace('ID_KEY', key).replace('ID_VAL', this.order[key]);
			$(html).appendTo($('.primary-container'));
		}
	}
}

App.prototype.renderItemProps = function(idx){
	if(!this.order.Items) return;
	if(!this.order.Items.length) return;

	var item = this.order.Items[idx];
	var $itemContainer = $('.item-container');
	$('.item-container').empty();

	for(var key in item){
		if(typeof(item[key]) !== 'object'){
			var html = '<div class="col-md-6"><div class="pull-left">ID_KEY</div><div class="pull-right prim-right">ID_VAL</div></div>';
			html = html.replace('ID_KEY', key).replace('ID_VAL', item[key]);
			$(html).appendTo($itemContainer);
		}
	}
}

