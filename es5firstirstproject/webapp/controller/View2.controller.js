sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";
 
    return Controller.extend("app.es5firstirstproject.controller.View2", {
        onInit: function () {
           
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
 
        },
        onRouteMatched:function(oEvent){
           
           
            let index = oEvent.getParameter("arguments").index;
            let sPath = "/BusinessPartnerSet('" + index + "')/ToSalesOrders";
 
            this.getView().bindElement({
                path: sPath,
                model: "SalesOrderModel"
            });
 
            this.getView().byId("idLabel").setText("Sales Order ID: " + index);
 
            // Get the OData Model
            let oModel = this.getOwnerComponent().getModel();
 
            //create the entity or path
            let entity = sPath;
 
            //it is method like read, create(for it payload)
            let that = this;
            oModel.read(entity,{
                success:function(odata, response){
                    var oModelOdata = new JSONModel(odata.results)
                    that.getView().setModel(oModelOdata,"SalesOrderModel");
                },
                error:function(error){
 
                }
            })
        }
    });
});