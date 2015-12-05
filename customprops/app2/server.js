var cpMgr = require('./customPropsManager');
var cpSchema = require('./custPropsSchema');

var arr = [];
var i = 0;
Object.keys(cpSchema).forEach(function(key){
	arr.push(i);
	i++
});

var cProps = [];

for(var i = 0 ; i < 1000 ; i++){
	var cp = cpMgr.getRandomCustomProperties(cpMgr.getRandomItemFromArray(arr));
	if(cp)
		cProps.push(cp);
}

console.log(JSON.stringify(cProps));