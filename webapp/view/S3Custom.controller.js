sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.view.S3Custom", {

	extHookChangeFooterButtons: function(B) {
		// Place your hook implementation code here 
		B.aButtonList.splice(2, 3);
	},
	createGenericCommentsComponent: function(oView) {
		var oCommentsContainer = oView.byId("commentsContainer");
		if (!jQuery.isEmptyObject(this.oGenericCommentsComponent)) {
			this.oGenericCommentsComponent.destroy();
			delete this.oGenericCommentsComponent;
		}
		this.oGenericCommentsComponent = sap.ui.getCore().createComponent({
			//name: "cross.fnd.fiori.inbox.comments",
			name: "cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.comments",
			componentData: {
				oModel: this.oModel2 // this model will contain the comments data object
					// oContainer: oView.byId("commentsContainer") mandatory setting in case of propagate model
			}
		});
		this.oGenericCommentsComponent.setContainer(oCommentsContainer);
		oCommentsContainer.setComponent(this.oGenericCommentsComponent);
		// Subscribe to events for comment added and to show business card
		this.oGenericCommentsComponent.getEventBus().subscribe(null, "commentAdded", jQuery.proxy(this.onCommentPost, this));
		this.oGenericCommentsComponent.getEventBus().subscribe(null, "businessCardRequested", jQuery.proxy(this.onEmployeeLaunchCommentSender,
			this));
	}	
});