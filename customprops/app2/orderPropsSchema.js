var orderPropsSchema = {
	Id : {
		ui : {

		},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	PartnerId : {
		ui : {

		},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	CreatedOn : {
		ui : {

		},
		db : {
			type : 'date',
			size : null,
			allValues : null
		}
	},
	CreatedBy : {
		ui : {

		},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	Currency : {
		ui : {

		},
		db : {
			type : 'varchar',
			size : '(10)',
			allValues : null
		}
	},
	PaymentTerm : {
		ui : {

		},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	BusinessUnit : {
		ui : {

		},
		db : {
			type : 'int',
			size : '(11)',
			allValues : null
		}
	},
	'Number' : {
		ui : {

		},
		db : {
			type : 'varchar',
			size : '(50)',
			allValues : null
		}
	},
	Name : {
		ui : {

		},
		db : {
			type : 'varchar',
			size : '(50)',
			allValues : null
		}
	},
	Items : {
		ui : {

		},
		db : {
			type : 'int',
			size : '(1)',
			allValues : null
		}
	},
}

module.exports = orderPropsSchema;