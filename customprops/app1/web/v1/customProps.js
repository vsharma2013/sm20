function CustomProps(){

}

CustomProps.prototype.getHtml = function(customProp, options){
	var html = '';
	switch(customProp.type){
		case 'ddlist' : html = this.getDDListHtml(customProp, options); break;
		case 'bool'   : html = this.getCheckBoxHtml(customProp, options); break;
	}
	return html;
}

CustomProps.prototype.getDDListHtml = function(customProp, options){
	var html = '<div><span>ID_LABEL</span><select>ID_OPTIONS</select></div>';
	var options = '';
	customProp.allValues.forEach(function(v){
		options += '<option>' + v + '</option>';
	});
	html = html.replace('ID_LABEL', customProp.label).replace('ID_OPTIONS', options);
	return html;
}

CustomProps.prototype.getCheckBoxHtml = function(customProp, options){
	return '<div></div>';
}

