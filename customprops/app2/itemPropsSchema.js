var itemPropsSchema = {
	item_Id : {
		ui : {},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	item_SortOrder : {
		ui : {},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	item_Name : {
		ui : {},
		db : {
			type : 'varchar',
			size : '(50)',
			allValues : null
		}
	},
	item_UnitPrice : {
		ui : {},
		db : {
			type : 'float',
			size : '(10,2)',
			allValues : null
		}
	},
	item_Taxes : {
		ui : {},
		db : {
			type : 'float',
			size : '(10,2)',
			allValues : null
		}
	},
	item_Shipping : {
		ui : {},
		db : {
			type : 'float',
			size : '(10,2)',
			allValues : null
		}
	},
	item_OtherCharges : {
		ui : {},
		db : {
			type : 'float',
			size : '(10,2)',
			allValues : null
		}
	},
	item_Quantity : {
		ui : {},
		db : {
			type : 'float',
			size : '(10,2)',
			allValues : null
		}
	},
	item_UOM : {
		ui : {},
		db : {
			type : 'varchar',
			size : '(10)',
			allValues : null
		}
	},
	item_Partner : {
		ui : {},
		db : {
			type : 'varchar',
			size : '(25)',
			allValues : null
		}
	},
	item_Manufacturer : {
		ui : {},
		db : {
			type : 'varchar',
			size : '(25)',
			allValues : null
		}
	},
	item_Contracted : {
		ui : {},
		db : {
			type : 'varchar',
			size : '(10)',
			allValues : null
		}
	},
	item_ContractedPrice : {
		ui : {},
		db : {
			type : 'float',
			size : '(10,2)',
			allValues : null
		}
	},
	item_SplitType : {
		ui : {},
		db : {
			type : 'varchar',
			size : '(2)',
			allValues : null
		}
	}
};

module.exports = itemPropsSchema;
