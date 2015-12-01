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
	$itemContainer.empty();
	$('<h4>Item properties</h4>').appendTo($itemContainer);
	for(var key in item){
		if(typeof(item[key]) !== 'object'){
			var html = '<div class="col-md-6"><div class="pull-left">ID_KEY</div><div class="pull-right prim-right">ID_VAL</div></div>';
			html = html.replace('ID_KEY', key).replace('ID_VAL', item[key]);
			$(html).appendTo($itemContainer);
		}
	}
	this.renderAccountSplit(item);
}

App.prototype.renderAccountSplit = function(item){	
	var accSplits = item.AccountingSplits;
	if(!accSplits) return;
	if(!accSplits.length) return;

	var $itemContainer = $('.item-container');
	var $table =  $('<div class="acc-split-table"><h4>Accounting splits</h4>'+
					'<table class="table table-bordered">'+
				    '<thead><tr></tr></thead>' +
				    '<tbody></tbody></table></div>');
	$table.appendTo($itemContainer);
	var $thead = $('.acc-split-table table thead tr');
	var $tbody = $('.acc-split-table table tbody');
	var hAdded = false;
	accSplits.forEach(function(as){
		var $tr = $('<tr></tr>');
		for(var key in as){
			if(typeof(as[key]) !== 'object'){
				if(!hAdded){
					var $h = $('<th>' + key + '</th>');
					$h.appendTo($thead);
				}
				var $td = $('<td>' + as[key] + '</td>');
				$td.appendTo($tr);				
			}
		}
		$tr.appendTo($tbody);				
		hAdded = true;
	})
	
}

