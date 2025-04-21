sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("app.miningproject.controller.DetailView", {
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
        },
        _onRoutePatternMatched: function(oEvent) {
            console.log(oEvent);
            let index = oEvent.getParameter("arguments").index;
            let sPath = "MiningModel>/MiningDataSet/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);
        },
        onListView: function() {
            // Get the router object
            let oRouter = this.getOwnerComponent().getRouter();
            // Use the navigation method
            oRouter.navTo("RouteMiningView");
        }
    });
});
