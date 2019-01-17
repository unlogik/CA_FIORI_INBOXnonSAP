sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.view.S2Custom", {

	extHookChangeMassApprovalButtons: function(B) {
		// Place your hook implementation code here 
		B.aButtonList.splice(2, 3);
	}

});