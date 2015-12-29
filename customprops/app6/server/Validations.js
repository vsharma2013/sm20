var utils = require('./Utils');

function validateRequisition(requisition, sett) {
	//TODO: Write validations not part of settings here.

	return validateRequisitionForSettings(requisition, sett);
}

function runValidations (obj, setui, validationErrors) {
	for (var key in setui) {
		if (setui.hasOwnProperty(key)) {
			//Handle mandatory.
			if(setui[key].ui.isMandatory && (obj[key] === undefined || obj[key] === null || obj[key].toString().length <= 0))
				validationErrors.push(key + ' is mandatory');
				
			//Handle valid values set.
			if(setui[key].ui.dataType != 'bool' && setui[key].ui.allVals && Array.isArray(setui[key].ui.allVals) && setui[key].ui.allVals.length > 0) {
				var isValid = false;
				for (var i = 0; i < setui[key].ui.allVals.length; i++) {
					if(obj[key] == setui[key].ui.allVals[i]) {
						isValid = true;
					}
				}

				if(!isValid) {
					validationErrors.push(key + ' value is not from the valid values list');
					obj[key] = null;
				}
			}

			//Handle data type.
			if(obj[key]) {
				switch(setui[key].ui.dataType) {
					case 'bool':
						var b = utils.getBoolean(obj[key])
						obj[key] = b.value;
						if(!b.success)
							validationErrors.push(key + ' cannot be converted to a boolean value');

						break;
					case 'int':
						var i = utils.getInt(obj[key])
						obj[key] = i.value;
						if(!i.success)
							validationErrors.push(key + ' cannot be converted to an integer value');

						break;
					case 'decimal':
						var d = utils.getFloat(obj[key])
						obj[key] = d.value;
						if(!d.success)
							validationErrors.push(key + ' cannot be converted to a decimal value');

						//TODO: Handle num decimals if required on server, as of now this is being skipped in save.
						break;
					case 'date':
						if(!utils.hasDate(obj[key])) {
							obj[key] = null;
							validationErrors.push(key + ' cannot be converted to a date value');
						}

						break;
					case 'string':
					default:
						var s = utils.getString(obj[key]);
						obj[key] = s.value;
						if(!s.success)
							validationErrors.push(key + ' cannot be converted to a string value');

						// Handle max length.
						if(setui[key].ui.maxLength && setui[key].ui.maxLength > 0 && setui[key].ui.maxLength < obj[key].length) {
							validationErrors.push(key + ' string length is more than permissible limit');
							obj[key] = obj[key].substring(obj[key], setui[key].ui.maxLength);
						}
				}
			}
		}
	}
}

function validateRequisitionForSettings(requisition, settings) {
	//TODO handle non-editable from security perspective.
	var validationErrors = [];

	if (requisition) {
		runValidations(requisition, settings.setup.primary, validationErrors);		
		runValidations(requisition.customProps, settings.setup.custom, validationErrors);
		if(requisition.Items && Array.isArray(requisition.Items) && requisition.Items.length > 0) {
			for(var i = 0; i < requisition.Items.length; i++) {
				runValidations(requisition.Items[i], settings.item.primary, validationErrors);
				runValidations(requisition.Items[i].customProps, settings.item.custom, validationErrors);
				if(requisition.Items[i].Splits && Array.isArray(requisition.Items[i].Splits) && requisition.Items[i].Splits.length > 0) {
					for(var j = 0; j < requisition.Items[i].Splits.length; j++) {
						runValidations(requisition.Items[i].Splits[j], settings.split.primary, validationErrors);
						runValidations(requisition.Items[i].Splits[j].customProps, settings.split.custom, validationErrors);
					}
				}
				else
					validationErrors.push('Item ' + i + ' does not have any splits.')
			}
		}
		else		
			validationErrors.push('Requisition does not have any items.')
	}
	else
		validationErrors.push('Empty requisition will not be saved.')

	return {
		success : validationErrors.length > 0 ? false : true,
		message : validationErrors.join('\n')
	}
}

module.exports = {
	validateRequisition : validateRequisition
};