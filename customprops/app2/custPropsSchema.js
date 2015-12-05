var custPropsSchema = {
	order_category : {
		ui : {
			type : 'ddlist',
		    label : 'Category',
		    allValues : ['OC-1', 'OC-2', 'OC-3']
		},
		db : {
			type : 'enum',
			size : null,
			allValues : ['OC-1', 'OC-2', 'OC-3']
		}
	},
	order_priority :{
		ui : {
			type : 'bool',
		    label : 'Is Urgent',
		    allValues : [0, 1]
		},
		db : {
			type : 'tinyint',
			size : '(1)',
			allValues : null
		}    
    },
    order_comments : {
    	ui : {
    		type : 'text',
		    label : 'Comments',   
		    allValues : []
    	},
    	db : {
    		type : 'varchar',
    		size : '(255)',
    		allValues : null
    	}
    },
    order_recurrence : {
    	ui : {
    		type : 'singleoptionlist',
		    label : 'Repeat',
		    allValues : ['daily', 'weekly', 'monthly']
    	},
    	db : {
    		type : 'enum',
    		size : null,
    		allValues : ['daily', 'weekly', 'monthly']
    	}
    },
    order_expiry : {
    	ui : {
			type : 'date',
		    label : 'Expiry Date',
		    allValues : []
    	},
    	db : {
    		type : 'date',
    		size : null,
    		allValues : null
    	}
    }
}



module.exports = custPropsSchema;