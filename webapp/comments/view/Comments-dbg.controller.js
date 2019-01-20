/*
 * Copyright (C) 2009-2018 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.require("sap.ui.core.mvc.Controller");


/*
 * THIS COMPONENT SUPPORTS THE FOLLOWING
 * 1. Post a comment
 * 2. Read Comments (Model Binding)
 * 3. Open business card
 * */
sap.ui.core.mvc.Controller.extend("cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.comments.view.Comments", {
	
	onInit: function() {
		var oComponentData = this.getOwnerComponent().getComponentData();
		this.oModel = oComponentData.oModel;  	// set the Model : this model will contain comments data when available
		this.bModelPresent = false;
		
		if( this.oModel || (oComponentData.oContainer && oComponentData.oContainer.getPropagateModel() ) ){
			this.bModelPresent = true;
			if(this.oModel){
				this.getView().setModel(this.oModel, "detail");
			}
		}
		
		if(!this.bModelPresent){ // if model is not propagated and not passed as component data, log an error in the console
			jQuery.sap.log.error("Data Model not defined for Comments");
		}
	},
	
	//Fire a custom event after adding comment
	publishEventForCommentsAdded: function(oEvent){
		if(this.bModelPresent) // only if the model is set, add comment
			this.getOwnerComponent().getEventBus().publish(null, "commentAdded", oEvent);
	},
	
	// Fire a custom event for Showing Business Card
	publishEventForBusinessCard: function(oEvent){
		this.getOwnerComponent().getEventBus().publish(null, "businessCardRequested", oEvent);
	}
	 
	 
	


});