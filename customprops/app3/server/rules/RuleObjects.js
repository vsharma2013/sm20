function Requisition(r){
	this.RequisitionName 	= r.RequisitionName; 
	this.RequisitionNumber 	= r.RequisitionNumber; 
	this.RequesterId 	    = r.RequesterId; 
	this.RequestorName 	    = r.RequestorName; 
	this.OBO_Id 	        = r.OBO_Id; 
	this.OBO_Name 	        = r.OBO_Name; 
	this.Shiptoid 	        = r.Shiptoid; 
	this.Shiptoname 	    = r.Shiptoname; 
	this.Shiptoaddress 	    = r.Shiptoaddress; 
	this.Billtoid 	        = r.Billtoid; 
	this.Billtoname 	    = r.Billtoname ;
	this.Billtoaddress   	= r.Billtoaddress; 
	this.Currency	        = r.Currency;
	this.Items              = r.Items;
	this.actionObjects      = {};
}

module.exports = {
	Requisition : Requisition
}



