function Requisition(r){
	this.req_name 	= r.req_name; 
	this.req_number 	= r.req_number; 
	this.requester 	    = r.requester; 
	this.obo 	        = r.obo; 
	this.shipto 	    = r.shipto; 
	this.shipto_address 	    = r.shipto_address; 
	this.billto 	    = r.billto;
	this.billto_address   	= r.billto_address; 
	this.currency	        = r.currency;
	this.Items              = r.Items;
	this.actionObjects      = {};
}

module.exports = {
	Requisition : Requisition
}



