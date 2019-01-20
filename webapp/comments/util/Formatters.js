/*
 * Copyright (C) 2009-2018 SAP SE or an SAP affiliate company. All rights reserved.
 */
cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.comments = (function() {

	var aUserPictureAvailability = {};
	var sPlaceHolderUrl = jQuery.sap.getModulePath("cross.fnd.fiori.inbox") + "/img/home/placeholder.jpg";
	
	return {
		
		formatterUserIcon : function (sOrigin, sUser) {
		    var aTxt = sUser.split("##");
		    switch (aTxt[0]){
		        case "YES":
			        return "sap-icon://accept";
		        case "NO":
			        return "sap-icon://decline";
		    }
			var that = this;
			var sUrl = cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.comments.getRelativeMediaSrc(sOrigin, sUser, this.getModel("detail").getData().sServiceUrl);
			
			/*
			 * check if the availability of user picture is cached.
			 * If this information is cached, set picture URL if picture is available. 
			 * If picture not available, set a place holder image
			 * */
			var bUserPictureAvailable = aUserPictureAvailability[sUrl];
			if (bUserPictureAvailable != null) {
				if (bUserPictureAvailable) {
					return sUrl;
				} else {
					return sPlaceHolderUrl;
				}
			}
			
			/*
			 * if availability of the picture isn't cached.
			 * set a placeholder image initially
			 * in parallel, send an async call to check if the picture is available or not, cache this information and bind the URL if picture available
			 * */
			
			var fnSuccess = function() {
				aUserPictureAvailability[sUrl] = true;
				that.setIcon(sUrl);
				that.rerender();
			};
			
			var fnError = function() {
				aUserPictureAvailability[sUrl] = false;
			};
			
			cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.comments.checkImageAvailabilityAsync(sUrl, fnSuccess, fnError);
			
			return sPlaceHolderUrl;			
		},
		
		formatterText: function (sText){
		    var aTxt = sText.split("##");
		    if ( aTxt[2] !== "undefined"){
		        return aTxt[2];
		    }else{
		        return sText;
		    }
		},
		
		formatterInfo: function (sText){
		    var aTxt = sText.split("##");
		    if ( aTxt[1] !== "undefined"){
		        return aTxt[1];
		    }
		},
		
		// asynchronous call to check whether the picture exists in the backend or not
		checkImageAvailabilityAsync: function(sUrl, fnSuccess, fnError){
			jQuery.ajax({
				url : sUrl,
				type : 'GET',
				contentType : 'image/jpeg',
				async: true,
				success : function(data,status,jqXHR) {
					if (data != ""){
						fnSuccess();
					} else {
						fnError();
					}
				},
				error : function(data, text, code) {
					fnError();
				}
			});  
		},
		
		 getRelativeMediaSrc : function(sOrigin, sUser, sServiceUrl) {
			return sServiceUrl + "/UserInfoCollection(SAP__Origin='" + sOrigin + "',UniqueName='" + sUser + "')/$value";
		 }
		    
	};
}());