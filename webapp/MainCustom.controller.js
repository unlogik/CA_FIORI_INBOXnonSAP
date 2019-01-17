/*
 * Copyright (C) 2009-2018 SAP SE or an SAP affiliate company. All rights reserved.
 */
 //sap.ui.controller("cross.fnd.fiori.inbox.Main", {
sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXnonSAP.MainCustom", {
	onInit: function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");
		jQuery.sap.require("sap.ca.ui.model.type.Date");
		jQuery.sap.require("cross.fnd.fiori.inbox.util.Conversions");
		jQuery.sap.require("cross.fnd.fiori.inbox.util.SupportInfo");
		jQuery.sap.require("cross.fnd.fiori.inbox.util.oDataReadExtension");
		jQuery.sap.require("sap.ca.ui.model.format.FormattingLibrary");
		jQuery.sap.require("sap.ca.ui.dialog.factory");
		jQuery.sap.require("cross.fnd.fiori.inbox.util.AddInbox");
		jQuery.sap.require("cross.fnd.fiori.inbox.util.DataManager");
		jQuery.sap.unloadResources("cross/fnd/fiori/inbox/Configuration.js", false, true, true);
		sap.ca.scfld.md.Startup.init('cross.fnd.fiori.inbox', this);
		var a = sap.ca.scfld.md.app.Application.getImpl();
		var m = a.oConnectionManager ? a.oConnectionManager.modelList : {};
		var o = a.getComponent();
		for (var M in m) {
			if (m.hasOwnProperty(M)) {
				if (M !== "undefined") {
					this.getView().setModel(m[M], M);
				} else {
					this.getView().setModel(m[M]);
				}
			}
		}
		var O = this.getView().getModel();
		var d = new cross.fnd.fiori.inbox.util.DataManager(O, this);
		o.setDataManager(d);
		if (typeof sap.ushell !== 'undefined' && typeof sap.ushell.renderers !== 'undefined' && typeof sap.ushell.renderers.fiori2 !==
			'undefined') {
			var r = sap.ushell.renderers.fiori2.RendererExtensions;
		} else {
			r = undefined;
		}
		if (r) {
			var b = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel.getResourceBundle();
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (d.getSubstitutionEnabled()) {
/*				this.oSubstButton = new sap.m.Button({
					text: b.getText("substn.navigation_button"),
					icon: "sap-icon://citizen-connect",
					tooltip: b.getText("userdrop.manage_my_substitutes_tooltip"),
					press: (jQuery.proxy(function() {
						this.oRouter.navTo('substitution', {}, false);
					}, this))
				});*/
				r.removeOptionsActionSheetButton(this.oSubstButton, r.LaunchpadState.App);
/*				this.oAddInboxButton = new sap.m.Button({
					text: b.getText("XBUT_SUBSTITUTE_FOR"),
					icon: "sap-icon://personnel-view",
					tooltip: b.getText("userdrop.substitute_for_tooltip"),
					press: function(e) {
						cross.fnd.fiori.inbox.util.AddInbox.open();
					}
				});*/
				r.removeOptionsActionSheetButton(this.oAddInboxButton, r.LaunchpadState.App);
			}
/*			this.oSupportInfoButton = new sap.m.Button({
				text: b.getText("supportinfo.navigation_button"),
				icon: "sap-icon://message-information",
				tooltip: b.getText("userdrop.support_information_tooltip"),
				press: function(e) {
					sap.ca.scfld.md.app.Application.getImpl().getComponent().getEventBus().publish("cross.fnd.fiori.inbox", "open_supportinfo", {
						source: "MAIN"
					});
					cross.fnd.fiori.inbox.util.SupportInfo.open();
				}
			});*/
			r.removeOptionsActionSheetButton(this.oSupportInfoButton, r.LaunchpadState.App);
		} else {
			jQuery.sap.log.error("sap.ushell.renderers.fiori2.RendererExtensions not found. My Inbox menu options will not be added");
		}
	},
	onExit: function() {
		if (cross.fnd.fiori.inbox.Conversions) {
			cross.fnd.fiori.inbox.Conversions.setDataManager(null);
		}
		var r = sap.ushell.renderers ? sap.ushell.renderers.fiori2.RendererExtensions : undefined;
		if (r) {
			if (this.oSubstButton) {
				r.removeOptionsActionSheetButton(this.oSubstButton, r.LaunchpadState.App);
			}
			if (this.oAddInboxButton) {
				r.removeOptionsActionSheetButton(this.oAddInboxButton, r.LaunchpadState.App);
			}
			if (this.oSupportInfoButton) {
				r.removeOptionsActionSheetButton(this.oSupportInfoButton, r.LaunchpadState.App);
			}
		}
	}
});