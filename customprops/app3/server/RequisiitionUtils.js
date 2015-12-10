var SetUp = ['RequisitionName', 'RequisitionNumber', 'RequesterId', 'RequestorName', 'OBO_Id', 'OBO_Name', 
             'Shiptoid', 'Shiptoname', 'Shiptoaddress', 'Billtoid', 'Billtoname', 'Billtoaddress', 'Currency'];
 
var Item = ['Linenumber', 'Itemnumber', 'Item', 'Partneritemnumber', 'Quantity', 'UOM', 'Unitprice', 'Total', 
            'Requesteddate', 'Needbydate'];

var ItemDetails_partner = ['Partnerid', 'Partnername', 'Partnercode', 'Manufacturername', 'Manufacturerpartnumber'];

var ItemDetails_shipping = ['Shiptoid', 'Shiptoname', 'Shiptoaddress'];

var ItemDetails_others = ['Categoryid', 'Categoryname'];

var ItemDetails_accounting = ['Type', 'Quantity', 'Amount'];

var ItemDetails_contract = ['Contractnumber', 'Contractname', 'Contractvalue', 'Contractexpirydate', 'Paymentterms'];

//----------------------------------------------------------------------------------------------------------------------

var SetUp_custom_ABM = ['Markasurgent', 'Districtid', 'Districtname', 'Jobid', 'Jobname',  'ERPOrderType', 
                        'Workorder', 'Deliverto'];

var SetUp_custom_CAMC = ['Markasurgent', 'Corporationid', 'Corporationname'];

var ItemDetails_shipping_custom_ABM = ['Deliverto', 'Shippingmethod'];

var ItemDetails_shipping_custom_CAMC = ['Deliverto', 'Shippingmethod'];

var ItemDetails_others_custom_ABM = ['Procurementoption', 'Capitalized', 'Billable'];

var ItemDetails_others_custom_CAMC = ['Procurementoption', 'Inventorytype'];

var ItemDetails_accounting_custom_ABM = ['Requesterid', 'Requestername', 'Segmentid', 'Segmentname', 'Divisionid', 'Divisionname', 
                                         'Superregionid', 'Superregionname',  'Regionid', 'Regionname',  'Superbranchid', 
                                         'Superbranchname', 'Branchid', 'Branchname','Districtssidid', 'Districtssididname', 
                                         'Jobid', 'Jobname', 'GLAccountid', 'GLAccountname'];

var ItemDetails_accounting_custom_CAMC =  ['Requesterid', 'Requestername', 'Corporationid', 'Corporationname', 'Departmentid', 
                                           'Departmentname', 'Accountnumberid', 'Accountnumbername', 'Subaccountnumberid', 
                                           'Subaccountnumbername', 'ProjectActivitycodeid', 'ProjectActivitycodename',  
                                           'Accountcategoryid', 'Accountcategoryname'];


var defaulVals = {
  RequisitionName : ['Req Name 1', 'Req Name 2', 'Req Name 3', 'Req Name 4', 'Req Name 5', 'Req Name 6', 'Req Name 7'],
  RequisitionNumber : [10001, 10002, 10003, 10004, 10005, 10006, 10007],
  RequesterId : [11, 22, 33, 44, 55, 66],
  RequestorName : ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7'],
  OBO_Id : [11, 22, 33, 44, 55, 66],
  OBO_Name : ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7'],
  Shiptoid : [111, 112, 113, 114, 115, 116, 117],
  Shiptoname : ['ST-1', 'ST-2', 'ST-3', 'ST-4', 'ST-5', 'ST-6', 'ST-7'],
  Shiptoaddress : ['ATS-11', 'ATS-22', 'ATS-33', 'ATS-44', 'ATS-55', 'ATS-66', 'ATS-77'],
  Billtoid : [211, 212, 213, 214, 215, 216, 217],
  Billtoname : ['BT-1', 'BT-2', 'BT-3', 'BT-4', 'BT-5', 'BT-6', 'BT-7'],
  Billtoaddress : ['ATB-11', 'ATB-22', 'ATB-33', 'ATB-44', 'ATB-55', 'ATB-66', 'ATB-77'],
  Currency : ['USD', 'GBP', 'EUR'],
  Linenumber : [101, 102, 103, 104, 105, 106, 107],
  Itemnumber : [201, 202, 203, 204, 205, 206, 207],
  Item : ['Item-1', 'Item-2', 'Item-3', 'Item-4', 'Item-5', 'Item-6', 'Item-7'],
  Partneritemnumber : ['Pat-Item-1', 'Pat-Item-2', 'Pat-Item-3', 'Pat-Item-4', 'Pat-Item-5', 'Pat-Item-6', 'Pat-Item-7'],
  Quantity : [10, 20, 30, 40, 50, 60, 70],
  UOM : ['GZ', 'EA', 'DA', 'GB', 'HQ'], 
  Unitprice : [5, 7, 9, 11, 13, 15],  
  Total : [100, 200, 300, 400, 500, 600], 
  Requesteddate : ['2015/12/11', '2015/12/22', '2015/12/18', '2015/12/15', '2015/12/25'], 
  Needbydate : ['2016/01/11', '2016/02/22', '2016/03/18', '2016/04/15', '2016/05/25'], 
  Partnerid : [191, 192, 193, 194, 195, 196, 197],  
  Partnername : ['Partner-1', 'Partner-2', 'Partner-3', 'Partner-4', 'Partner-5', 'Partner-6'], 
  Partnercode : ['PC001', 'PC002', 'PC003', 'PC004', 'PC005', 'PC006'],  
  Manufacturername : ['Manuf-1', 'Manuf-2', 'Manuf-3', 'Manuf-4', 'Manuf-5', 'Manuf-6'],  
  Manufacturerpartnumber : ['MF11', 'MF22', 'MF33', 'MF44', 'MF55'],  
  Categoryid : [181, 182, 183, 184, 185, 186, 187], 
  Categoryname : ['Cat-01', 'Cat-02', 'Cat-03', 'Cat-04', 'Cat-05', 'Cat-06', 'Cat-07'],  
  Type : [171, 172, 173, 174, 175],  
  Quantity : [2,3,5,7,8],  
  Amount : [20, 30, 35,45.5, 65.5],  
  Contractnumber : ['CNO-9001', 'CNO-9002', 'CNO-9003', 'CNO-9004', 'CNO-9005'], 
  Contractname : ['CNO-SS1', 'CNO-SS2', 'CNO-SS3', 'CNO-SS4', 'CNO-SS5'],  
  Contractvalue : [125, 225, 335, 445, 534, 655],  
  Contractexpirydate : ['2016/01/11', '2016/02/22', '2016/03/18', '2016/04/15', '2016/05/25'], 
  Paymentterms : [1, 2, 3, 4, 5]
};

var sCPSchema = '{"type" : "", "label" : "", "val": "", "allowEdit" : 0, "defaultVal" : "", "allVals" : []}';
var arrInt1to5 = [1,2,3,4,5];
function getArrayWithPrefix(prefix, count){
  var arr = [];
  for(var i = 1; i <= count; i++)
    arr.push(prefix + '-' + i);
  return arr;
}

function getCustomProperty (type, label, val, defaultVal, allowEdit, allVals) {
  var cp = JSON.parse(sCPSchema);
  cp.type = type;
  cp.label = label;
  cp.val = val;
  cp.allowEdit = allowEdit,
  cp.defaultVal = defaultVal,
  cp.allVals = allVals;
  return cp;
}

var custPropsSchema = {
  Markasurgent : getCustomProperty('bool', 'Mark as urgent', 0, 0, 1, [0,1]),
  Districtid : getCustomProperty('int', 'District Id', 1, 1, 1, arrInt1to5),
  Districtname : getCustomProperty('ddlist', 'Distrct Name', 'District-1', 'District-1', 1, getArrayWithPrefix('District', 5)),
  Jobid : getCustomProperty('ddlist', 'Job Id', 1, 1, 1, arrInt1to5),
  Jobname : getCustomProperty('ddlist', 'Job Name', 'Job-1', 'Job-1', 1, getArrayWithPrefix('Job', 5)),
  ERPOrderType : getCustomProperty('ddlist', 'ERP Order type', 1, 1, 1, arrInt1to5),
  Workorder : getCustomProperty('string', 'Work Order', '', '', 1, []),
  Deliverto : getCustomProperty('string', 'Deliver To', '', '', 1, []),
  Corporationid : getCustomProperty('ddlist', 'Corporation Id', 1, 1, 1, arrInt1to5),
  Corporationname : getCustomProperty('ddlist', 'Corporation Name', 'Corp-1', 'Corp-1', 1, getArrayWithPrefix('Corp', 5) ),
  Shippingmethod : getCustomProperty('ddlist', 'Shipping Method', '', '', 1, arrInt1to5),
  Procurementoption : getCustomProperty('ddlist', 'Procurement Option', '', '', 1, arrInt1to5),
  Capitalized : getCustomProperty('bool', 'Capitalized', 0, 0, 1, [0,1]),
  Billable : getCustomProperty('bool', 'Billable', 0, 0, 1, [0,1]),
  Inventorytype : getCustomProperty('ddlist', 'Inventory Type', 1, 1, 1, arrInt1to5),
  Requesterid : getCustomProperty('int', 'Requester Id', 11, 11, 0, []),
  Requestername : getCustomProperty('string', 'Requester Name', 'Req Name 1', 'Req Name 1', 0, []),  
  Segmentid : getCustomProperty('ddlist', 'Segment Id', 1, 1, 1, arrInt1to5),
  Segmentname : getCustomProperty('ddlist', 'Segment Name', 'SGMT-1', 'SGMT-1', 1, getArrayWithPrefix('SGMT', 5)),
  Divisionid : getCustomProperty('ddlist', 'Division Id', 1, 1, 1, arrInt1to5),
  Divisionname : getCustomProperty('ddlist', 'Division Name', 'Division-1', 'Division-1', 1, getArrayWithPrefix('Division', 5)),
  Superregionid : getCustomProperty('ddlist', 'Super Region Id', 1, 1, 1, arrInt1to5),
  Superregionname : getCustomProperty('ddlist', 'Super Region Name', 'SPRGN-1', 'SPRGN-1', 1, getArrayWithPrefix('SPRGN', 5)),
  Regionid : getCustomProperty('ddlist', 'Region Id', 1, 1, 1, arrInt1to5),
  Regionname : getCustomProperty('ddlist', 'Region Name', 'Region-1', 'Region-1', 1, getArrayWithPrefix('Region', 5)),
  Superbranchid : getCustomProperty('ddlist', 'Super Branch Id', 1, 1, 1, arrInt1to5),
  Superbranchname : getCustomProperty('ddlist', 'Super Branch Name', 'Sup-Branch-1', 'Sup-Branch-1', 1, getArrayWithPrefix('Sup-Branch', 5)),  
  Branchid : getCustomProperty('ddlist', 'Branch Id', 1, 1, 1, arrInt1to5),
  Branchname : getCustomProperty('ddlist', 'Branch Name', 'Branch-1', 'Branch-1', 1, getArrayWithPrefix('Branch', 5)),
  Districtssidid : getCustomProperty('ddlist', 'District SSID', 1, 1, 1, arrInt1to5),
  Districtssididname : getCustomProperty('ddlist', 'District SSID Name', 'DSSID-1', 'DSSID-1', 1, getArrayWithPrefix('DSSID', 5)),
  GLAccountid : getCustomProperty('ddlist', 'GL Account Id', 1, 1, 1, arrInt1to5),
  GLAccountname : getCustomProperty('ddlist', 'GL Account Name', 'GLAcc-1', 'GLAcc-1', 1, getArrayWithPrefix('GLAcc', 5)),
  Departmentid : getCustomProperty('ddlist', 'Department Id', 1, 1, 1, arrInt1to5),
  Departmentname : getCustomProperty('ddlist', 'Department Name', 'Department-1', 'Department-1', 1, getArrayWithPrefix('Department', 5)),
  Accountnumberid : getCustomProperty('ddlist', 'Account Number Id', 1, 1, 1, arrInt1to5),
  Accountnumbername : getCustomProperty('ddlist', 'Account Number Name', 'Acc-Num-Name-1', 'Acc-Num-Name-1', 1, getArrayWithPrefix('Acc-Num-Name', 5)),
  Subaccountnumberid : getCustomProperty('ddlist', 'Sub Account Number Id', 1, 1, 1, arrInt1to5),
  Subaccountnumbername : getCustomProperty('ddlist', 'Sub Account Number Name', 'Sub-Acc-Num-Name-1', 'Sub-Acc-Num-Name-1', 1, getArrayWithPrefix('Sub-Acc-Num-Name', 5)),
  ProjectActivitycodeid : getCustomProperty('ddlist', 'Project/Acivity Code Id', 1, 1, 1, arrInt1to5),
  ProjectActivitycodename : getCustomProperty('ddlist', 'Project/Acivity Code Name', 'ProjAct-1', 'ProjAct-1', 1, getArrayWithPrefix('ProjAct', 5)),
  Accountcategoryid : getCustomProperty('ddlist', 'Account Category Id', 1, 1, 1, arrInt1to5),
  Accountcategoryname : getCustomProperty('ddlist', 'Account Category Name', 'AccCat-1', 'AccCat-1', 1, getArrayWithPrefix('AccCat', 5))
}

var custPropsSchema_overide = {
    //TODO: need to put id and name in custom property later on.
  Markasurgent: getCustomProperty('bool', 'Mark as urgent', 0, 0, 1, [0, 1]),
  Districtname: getCustomProperty('autosuggest', 'District', '8032-LL012-Atlanta', '8032-LL012-Atlanta', 1, ['8032-LL012-Atlanta', '8015-CP001-AGS Hopkinsville', 'DoNotUse-District - SSID_OLDInactive-DoNotUse-SuperRegion']),
  Jobname: getCustomProperty('autosuggest', 'Job', 'Allied Waste Svc (BFI) - Lawre', 'Allied Waste Svc (BFI) - Lawre', 1, ['Allied Waste Svc (BFI) - Lawre', 'Bureau of ATF Century Center', 'ATLANTA LMU07', 'O&M Maint.Ft. Knox KY', 'AGS HOPKINSVILLE BMR01', 'Dallas Project Job #2', 'Fort Knox O&M Job XX', 'JIOC-A Supply', 'BOSI']),
  ERPOrderType : getCustomProperty('ddlist', 'ERP Order Type', null, null, 1, ['Internal Order','Sales Order','Cost Centre Order','MRP Order','Work Order']),
  Workorder : getCustomProperty('string', 'Work Order', '', '', 1, []),
  Deliverto : getCustomProperty('string', 'Deliver To', '', '', 1, []),
  Corporationname: getCustomProperty('autosuggest', 'Corporation', '10-CAMC', '10-CAMC', 1, ['10-CAMC', '15-CAMC FOUNDATION', '40-CAMC HEALTH SYSTEM', '45-CHERI', '50-INTEGRATED HEALTH CARE', '87-WCH BUILDING PARTNERSHIP', '88-GEN DIV MSOB PARTNERSHIP', '89-HOUSING CORP']),
  Shippingmethod: getCustomProperty('ddlist', 'Shipping Method', '', '', 1, ['Best Available', 'FedEx Opti Freight (No: 477648983)']),
  Procurementoption : getCustomProperty('ddlist', 'Procurement Option', '', '', 1, ['Procurable','From Inventory']),
  Capitalized : getCustomProperty('ddlist', 'Capitalized', 'No', 'No', 1, ['Yes','No']),
  Billable : getCustomProperty('ddlist', 'Billable', null, null, 1, ['Yes','No']),
  Inventorytype : getCustomProperty('ddlist', 'Inventory Type', 'Not Applicable', 'Not Applicable', 1, ['Not Applicable','Stock','Non-Stock']),
  Requestername: getCustomProperty('string', 'Requester', 'Administrator', 'Administrator', 0, []),
  Segmentname: getCustomProperty('autosuggest', 'Segment', 'Building Energy Solutions-ESS', 'Building Energy Solutions-ESS', 1, ['Building Energy Solutions-ESS', 'Building Energy Solutions-ESS_OLDInactive', 'DoNotUse-Segment-DoNotUse-Segment']),
  Divisionname: getCustomProperty('autosuggest', 'Division', 'ENG-Building Energy Solutions DV', 'ENG-Building Energy Solutions DV', 1, ['ENG-Building Energy Solutions DV', 'DoNotUse-Division-DoNotUse-Division']),
  Superregionname: getCustomProperty('autosuggest', 'Super Region', 'EEB-ABM Bldg. Energy Sol ABES', 'EEB-ABM Bldg. Energy Sol ABES', 1, ['EEB-ABM Bldg. Energy Sol ABES', 'EGS-ABM Government Services AGS', 'DoNotUse-SuperRegion-DoNotUse-SuperRegion']),
  Regionname: getCustomProperty('autosuggest', 'Region', 'ELS-ABES ABM Bldg Solutions ABS', 'ELS-ABES ABM Bldg Solutions ABS', 1, ['ELS-ABES ABM Bldg Solutions ABS', 'EGB-AGS O M Med Projects OMP','DoNotUse-Region-DoNotUse-Region']),
  Superbranchname: getCustomProperty('autosuggest', 'Super Branch', 'ABM Building Solutions, LLC-E35', 'ABM Building Solutions, LLC-E35', 1, ['ABM Building Solutions, LLC-E35', 'ABM Government Services, LLC-E50', 'DoNotUse-SuperRegion-DoNotUse-SuperBranch']),
  Branchname: getCustomProperty('autosuggest', 'Branch', 'Atlanta-80320', 'Atlanta-80320', 1, ['Atlanta-80320', 'AGS Hopkinsville-80150', 'DoNotUse-SuperRegion-DoNotUse-Branch']),
  Districtssididname: getCustomProperty('autosuggest', '8032-LL012-Atlanta', '8032-LL012-Atlanta', 1, ['8032-LL012-Atlanta', '8015-CP001-AGS Hopkinsville', 'DoNotUse-District - SSID_OLDInactive-DoNotUse-SuperRegion']),
  GLAccountname: getCustomProperty('autosuggest', 'GL Account', 'AcctReceivableAcct-8032.C0040.130000000', 'AcctReceivableAcct-8032.C0040.130000000', 1, ['AcctReceivableAcct-8032.C0040.130000000', 'Petty Cash-021011.025.0001.00.00.1050000', 'A/R Billed Trade-021011.025.0001.00.00.1110000', 'Short Term N/R-021011.025.0001.00.00.1140001', 'Empl Advances-021011.025.0001.00.00.1160000', 'Employee PR Reimbursement-021011.025.0001.00.00.1160005', 'A/R Qatar-021011.025.0001.00.00.1195902', 'Receivables Interco LNC-021011.025.0001.00.00.1210LNC', 'Inventory-021011.025.0001.00.00.1397237', 'Prepaid Immersion-021011.025.0001.00.00.1510010']),
  Departmentname: getCustomProperty('autosuggest', 'Department', '42023-2 EAST', '42023-2 EAST', 1, ['42023-2 EAST', '10000-BALANCE SHEET', '21900-CORPORATE ADMINISTRATION', '21908-CLINICAL ENGINEERING', '21910-MAILROOM', '21911-CLINICAL ENGINEERING-TVH', '21912-HOUSEKEEPING OFFSITE', '21914-WASTE MANAGEMENT INCINERATOR', '21916-MSOB Housekeeping', '21918-HUMAN RESOURCES']),
  Accountnumbername: getCustomProperty('autosuggest', 'Account Number', '10200-Balance Sheet Account', '10200-Balance Sheet Account', 1, ['10200-Balance Sheet Account', '13510-Inventory-Central Supply-Gen', '13910-Prepaid Other', '15700-Fixed Asset Clearing', '15910-Construction-In-Progress', '15920-Work-In-Process', '67020-Health Insurance', '67021-Employee Disc-Med Svcs-Invalid(Braxton)', '67030-Prescription Insurance', '67040-Dental Insurance', '67045-Vision-Employee', '67050-Short Term Disability (STD)', '67060-Long Term Disability (LTD)', '67070-Life Insurance-Employee', '67080-Accidental Death-Inactive', '67085-401K Ret Plan (employer contr)']),
  Subaccountnumbername: getCustomProperty('autosuggest', 'Sub Account Number', '0000-0000', '0000-0000', 1, ['0000-0000', 'Test Sub-Account Number-Test SAN 0', 'Test Sub-Account Number-Test SAN 1', 'Test Sub-Account Number-Test SAN 2', 'Test Sub-Account Number-Test SAN 3', 'Test Sub-Account Number-Test SAN 4']),
  ProjectActivitycodename: getCustomProperty('autosuggest', 'Project/Acivity Code', '100-PETTY CASH- PHYSICIAN RECRUIT', '100-PETTY CASH- PHYSICIAN RECRUIT', 1, ['100-PETTY CASH- PHYSICIAN RECRUIT', '120-DRAWER -GENERAL CASHIER TIL', '14428-WC RADIOLGY LKER REMOVL/NO BUD', '14470-IS Sorian Med Manager', '15-IHCPI Cash Drawer-Assoc Cardio', '15012-WC Step Down Unit 5th Fl ICU', '15081-WCH Kitchen Remodeling', '20000-CAMC-PATHOLOGY LAB-SPECIAL ACC', '24569-GEN- SEIMANS CONTRACT/NO BUD', '25135-419 Brooks St Renovations'])
}

for(var key in custPropsSchema_overide){
  custPropsSchema[key] = custPropsSchema_overide[key];
}

function getRandomItemFromArray(arr){
  return arr[randomIntFromInterval(0,arr.length-1)];
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function getDefaultRequisitionOptions(){
  var sOptions = '{"itemCount" : 3, "client" : "CAMC"}';
  return JSON.parse(sOptions);
}

function getRequisition(reqOptions){
  var req = {};
  SetUp.forEach(function(sk){
    req[sk] = getRandomItemFromArray(defaulVals[sk]);
  });
  var custSetup = reqOptions.client === 'ABM' ? SetUp_custom_ABM : SetUp_custom_CAMC;
  req.customProps = {};
  custSetup.forEach(function(sk){
    req.customProps[sk] = custPropsSchema[sk].val;
  });
  req.Items = [];
  for(var i = 0 ; i < reqOptions.itemCount; i++){
    var item = {};
    
    Item.forEach(function(k){
      item[k] = getRandomItemFromArray(defaulVals[k]);
    });

    addItemDetails(item, 'partner', ItemDetails_partner);
    addItemDetails(item, 'shipping', ItemDetails_shipping);
    addItemDetails(item, 'others', ItemDetails_others);
    addItemDetails(item, 'accounting', ItemDetails_accounting);
    addItemDetails(item, 'contract', ItemDetails_contract);

    var custShipping = reqOptions.client ==='ABM' ? ItemDetails_shipping_custom_ABM: ItemDetails_shipping_custom_CAMC;
    var custOthers = reqOptions.client ==='ABM' ? ItemDetails_others_custom_ABM: ItemDetails_others_custom_CAMC;
    var custAccounting = reqOptions.client ==='ABM' ? ItemDetails_accounting_custom_ABM: ItemDetails_accounting_custom_CAMC;

    addItemDetailsCustomProps(item, 'shipping', custShipping);
    addItemDetailsCustomProps(item, 'others', custOthers);
    addItemDetailsCustomProps(item, 'accounting', custAccounting);

    req.Items.push(item);
  }
  return req;
}

function addItemDetails(item, detailKey, detailValueKeys){
  item[detailKey] = {};
  detailValueKeys.forEach(function(k){
    item[detailKey][k] = getRandomItemFromArray(defaulVals[k]);
  });
}

function addItemDetailsCustomProps(item, detailKey, detailCustomValueKeys){
  item[detailKey]['customProps'] = {};
  detailCustomValueKeys.forEach(function(k){
    item[detailKey]['customProps'][k] = custPropsSchema[k].val;
  });
}


module.exports = {
  primaryPropsDefaultValues : defaulVals,
  custPropsSchema : custPropsSchema,
  getDefaultRequisitionOptions : getDefaultRequisitionOptions,
  getRequisition : getRequisition
}





