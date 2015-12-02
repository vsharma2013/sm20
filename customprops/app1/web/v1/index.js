function App(){
	this.order = null;
	this.cpMgr = new CustomProps();
}
var app = new App();

$(document).ready(function(){
	app.run();
})

App.prototype.isEmptyArray = function(arr){
	if(!arr) return true;
	if(!arr.length) return true;

	return false;
}

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
	if(this.isEmptyArray(this.order.Items)) return;

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
	this.renderOrderCustomProps();
}

App.prototype.renderItemProps = function(idx){
	if(this.isEmptyArray(this.order.Items)) return;

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
	if(this.isEmptyArray(accSplits)) return;

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

App.prototype.renderOrderCustomProps = function(){
	var customProps = this.order.customProps;
	if(this.isEmptyArray(customProps)) return;

	var $container = $('.primary-container');
	customProps.forEach((function(cProp){
		var $html = $(this.cpMgr.getHtml(cProp));
		switch(cProp.type){
			case 'ddlist' : 
				$html.addClass('col-md-6');
				$html.find('span').addClass('pull-left');
				var $select = $html.find('select');
				$select.addClass('pull-right prim-right');
				$select.val(cProp.value);
				$select.attr('id', cProp.key);
				break;
			case 'bool' : 
				$html.addClass('col-md-6');
				cProp.value? $html.find('input').attr('checked', '') : '';
				$html.find('input').attr('id', cProp.key);
				break;
			case 'text' :
				$html.addClass('col-md-6');
				$html.find('span').addClass('pull-left');
				$html.find('input').addClass('pull-right prim-right');
				$html.find('input').attr('id', cProp.key);
				break;
		}
		$html.appendTo($container);
	}).bind(this));
	
}

