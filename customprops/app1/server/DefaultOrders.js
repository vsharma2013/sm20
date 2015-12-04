var order = {
  "Id": 1,
  "PartnerId": 1,
  "CreatedOn": "2015-11-11",
  "CreatedBy": 1,
  "Currency": "USD",
  "PaymentTerm": 1,
  "BusinessUnit": 1,
  "Number": "2015-0000001",
  "Name": "Direct",
  "Items": [{
    "Id": 1,
    "SortOrder": 10,
    "Name": "iPhone6",
    "UnitPrice": 610.00,
    "Taxes": 52.18,
    "Shipping": 5.34,
    "OtherCharges": 0.00,
    "Quantity": 3.00,
    "UOM": "EA",
    "Partner": "e-Zone",
    "Manufacturer": "Apple",
    "Contracted": false,
    "ContractedPrice": null,
    "SplitType": "#",
    "AccountingSplits": [{
      "Id": 1,
      "SortOrder": 100,
      "SplitValue": "1",
      "Project": "",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    },
    {
      "Id": 2,
      "SortOrder": 101,
      "SplitValue": "2",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    }]
  },
  {
    "Id": 2,
    "SortOrder": 15,
    "Name": "Nestle Milk",
    "UnitPrice": 1.00,
    "Taxes": 0.08,
    "Shipping": 0.04,
    "OtherCharges": 0.01,
    "Quantity": 20.00,
    "UOM": "GA",
    "Partner": "CostCo",
    "Manufacturer": "Nestle",
    "Contracted": true,
    "ContractedPrice": 0.98,
    "SplitType": "%",
    "AccountingSplits": [{
      "Id": 3,
      "SortOrder": 102,
      "SplitValue": "20",
      "Project": "P-2",
      "CostCenter": "CC2",
      "LegalEntity": "A-001",
      "Department": "A-0000002" 
    },
    {
      "Id": 4,
      "SortOrder": 100,
      "SplitValue": "40",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    },
    {
      "Id": 5,
      "SortOrder": 101,
      "SplitValue": "40",
      "Project": "P-10",
      "CostCenter": "CC10",
      "LegalEntity": "A-002",
      "Department": "A-2000001" 
    }]
  },
  {
    "Id": 3,
    "SortOrder": 18,
    "Name": "LED Bulb Phillips",
    "UnitPrice": 52.28,
    "Taxes": 2.18,
    "Shipping": 5.34,
    "OtherCharges": 0.00,
    "Quantity": 2.00,
    "UOM": "DZ",
    "Partner": "BestBuy",
    "Manufacturer": "GE",
    "Contracted": true,
    "ContractedPrice": 52.28,
    "SplitType": "#",
    "AccountingSplits": [{
      "Id": 6,
      "SortOrder": 100,
      "SplitValue": "2",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000011" 
    }]
  }]
}

var customPropsOrder = {
  "Id": 2,
  "PartnerId": 1,
  "CreatedOn": "2015-11-11",
  "CreatedBy": 1,
  "Currency": "USD",
  "PaymentTerm": 1,
  "BusinessUnit": 1,
  "Number": "2015-0000001",
  "Name": "Direct",
  "Items": [{
    "Id": 1,
    "SortOrder": 10,
    "Name": "iPhone6",
    "UnitPrice": 610.00,
    "Taxes": 52.18,
    "Shipping": 5.34,
    "OtherCharges": 0.00,
    "Quantity": 3.00,
    "UOM": "EA",
    "Partner": "e-Zone",
    "Manufacturer": "Apple",
    "Contracted": false,
    "ContractedPrice": null,
    "SplitType": "#",
    "AccountingSplits": [{
      "Id": 1,
      "SortOrder": 100,
      "SplitValue": "1",
      "Project": "",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    },
    {
      "Id": 2,
      "SortOrder": 101,
      "SplitValue": "2",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    }]
  },
  {
    "Id": 2,
    "SortOrder": 15,
    "Name": "Nestle Milk",
    "UnitPrice": 1.00,
    "Taxes": 0.08,
    "Shipping": 0.04,
    "OtherCharges": 0.01,
    "Quantity": 20.00,
    "UOM": "GA",
    "Partner": "CostCo",
    "Manufacturer": "Nestle",
    "Contracted": true,
    "ContractedPrice": 0.98,
    "SplitType": "%",
    "AccountingSplits": [{
      "Id": 3,
      "SortOrder": 102,
      "SplitValue": "20",
      "Project": "P-2",
      "CostCenter": "CC2",
      "LegalEntity": "A-001",
      "Department": "A-0000002" 
    },
    {
      "Id": 4,
      "SortOrder": 100,
      "SplitValue": "40",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    },
    {
      "Id": 5,
      "SortOrder": 101,
      "SplitValue": "40",
      "Project": "P-10",
      "CostCenter": "CC10",
      "LegalEntity": "A-002",
      "Department": "A-2000001" 
    }]
  },
  {
    "Id": 3,
    "SortOrder": 18,
    "Name": "LED Bulb Phillips",
    "UnitPrice": 52.28,
    "Taxes": 2.18,
    "Shipping": 5.34,
    "OtherCharges": 0.00,
    "Quantity": 2.00,
    "UOM": "DZ",
    "Partner": "BestBuy",
    "Manufacturer": "GE",
    "Contracted": true,
    "ContractedPrice": 52.28,
    "SplitType": "#",
    "AccountingSplits": [{
      "Id": 6,
      "SortOrder": 100,
      "SplitValue": "2",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000011" 
    }]
  }]
}

customPropsOrder.customProps = [{
		key : 'order_category',
		label : 'Category',
		value : 'OC-2',
		type : 'ddlist',
		allValues : ['OC-1', 'OC-2', 'OC-3']
	},
	{
		key : 'order_priority',
		label : 'Is Urgent',
		value : 1,
		type : 'bool',
		allValues : [0, 1]
	},
	{
		key : 'order_comments',
		label : 'Comments',
		value : 'Send to marketing',
		type : 'text',
		allValues : []
	}
];

customPropsOrder.Items[0].customProps = [{
	key : 'item_recurrence',
	label : 'Repeat',
	value : 'weekly',
	type : 'singleoptionlist',
	allValues : ['daily', 'weekly', 'monthly']
}];
customPropsOrder.Items[1].customProps = [{
	key : 'item_notify_to',
	label : 'Notify',
	value : ['Legal', 'Admin'],
	type : 'multivaluelist',
	allValues : ['HR', 'Legal', 'Accounts', 'Admin', 'Marketing']
}];

customPropsOrder.Items[2].customProps = [{
	key : 'item_expiry',
	label : 'Expiry Date',
	value : '2016/06/30',
	type : 'date',
	allValues : []
}];

var customPropsUISchema = {
  order_category : {
    type : 'ddlist',
    label : 'Category',
    allValues : ['OC-1', 'OC-2', 'OC-3']
  },
  order_priority :{
    type : 'bool',
    label : 'Is Urgent',
    allValues : [0,1]
  },
  order_comments : {
    type : 'text',
    label : 'Comments',   
    allValues : []
  },
  item_recurrence : {
    type : 'singleoptionlist',
    label : 'Repeat',
    allValues : ['daily', 'weekly', 'monthly']
  },
  item_notify_to : {
    type : 'multivaluelist',
    label : 'Notify',
    allValues : ['HR', 'Legal', 'Accounts', 'Admin', 'Marketing']
  },
  item_expiry : {
    type : 'date',
    label : 'Expiry Date',
    allValues : []
  }
}

var customPropsOrder2 = {
  "Id": 3,
  "PartnerId": 1,
  "CreatedOn": "2015-11-11",
  "CreatedBy": 1,
  "Currency": "USD",
  "PaymentTerm": 1,
  "BusinessUnit": 1,
  "Number": "2015-0000001",
  "Name": "Direct",
  "Items": [{
    "Id": 1,
    "SortOrder": 10,
    "Name": "iPhone6",
    "UnitPrice": 610.00,
    "Taxes": 52.18,
    "Shipping": 5.34,
    "OtherCharges": 0.00,
    "Quantity": 3.00,
    "UOM": "EA",
    "Partner": "e-Zone",
    "Manufacturer": "Apple",
    "Contracted": false,
    "ContractedPrice": null,
    "SplitType": "#",
    "AccountingSplits": [{
      "Id": 1,
      "SortOrder": 100,
      "SplitValue": "1",
      "Project": "",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    },
    {
      "Id": 2,
      "SortOrder": 101,
      "SplitValue": "2",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    }]
  },
  {
    "Id": 2,
    "SortOrder": 15,
    "Name": "Nestle Milk",
    "UnitPrice": 1.00,
    "Taxes": 0.08,
    "Shipping": 0.04,
    "OtherCharges": 0.01,
    "Quantity": 20.00,
    "UOM": "GA",
    "Partner": "CostCo",
    "Manufacturer": "Nestle",
    "Contracted": true,
    "ContractedPrice": 0.98,
    "SplitType": "%",
    "AccountingSplits": [{
      "Id": 3,
      "SortOrder": 102,
      "SplitValue": "20",
      "Project": "P-2",
      "CostCenter": "CC2",
      "LegalEntity": "A-001",
      "Department": "A-0000002" 
    },
    {
      "Id": 4,
      "SortOrder": 100,
      "SplitValue": "40",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000001" 
    },
    {
      "Id": 5,
      "SortOrder": 101,
      "SplitValue": "40",
      "Project": "P-10",
      "CostCenter": "CC10",
      "LegalEntity": "A-002",
      "Department": "A-2000001" 
    }]
  },
  {
    "Id": 3,
    "SortOrder": 18,
    "Name": "LED Bulb Phillips",
    "UnitPrice": 52.28,
    "Taxes": 2.18,
    "Shipping": 5.34,
    "OtherCharges": 0.00,
    "Quantity": 2.00,
    "UOM": "DZ",
    "Partner": "BestBuy",
    "Manufacturer": "GE",
    "Contracted": true,
    "ContractedPrice": 52.28,
    "SplitType": "#",
    "AccountingSplits": [{
      "Id": 6,
      "SortOrder": 100,
      "SplitValue": "2",
      "Project": "P-1",
      "CostCenter": "CC1",
      "LegalEntity": "A-001",
      "Department": "A-0000011" 
    }]
  }]
}

customPropsOrder2.customProps = {
  order_category : 'OC-2',
  order_priority : 1,
  order_comments : 'Send to marketing'
}

customPropsOrder2.Items[0].customProps = {
  item_recurrence : 'weekly'
}

customPropsOrder2.Items[1].customProps = {
  item_notify_to : ['HR', 'Admin']
}

customPropsOrder2.Items[2].customProps = {
  item_expiry : '2016/06/30'
}

module.exports = {
	order : order,
	customPropsOrder : customPropsOrder,
  customPropsOrder2 : customPropsOrder2,
  customPropsUISchema : customPropsUISchema
}