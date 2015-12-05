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

module.exports = {
	order : order
}