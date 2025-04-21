sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";
 
    return Controller.extend("app.es5firstirstproject.controller.View1", {
        onInit: function () {
 
        },
        onSelectItem:function(oEvent){
            // console.log(oEvent)
            // let oItems=oEvent.getParameter("selectedItem").mProperties.key
                let oItem=oEvent.getParameter("selectedItem")
                let skey=oItem.getProperty("key")
                let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2",{
                index:skey
            });
            //that.getView().setModel(oModelOdata,"SalesOrderModel");
                //BusinessPartnerSet('0100000002')/ToSalesOrders
                // let sPath="/BusinessPartnerSet('" + skey + "')/ToSalesOrders"
 
            // get the odata model
            // let oMOdel=this.getOwnerComponent().getModel();
            // // create the entity or path
            // let entity=sPath;
            // // it is the method like read,create(for it payload)
            //     let that=this;
            // oMOdel.read(entity,{
            //     success:function(oData,response){
            //         var oModeloData=new JSONModel(oData.results)
            //         that.getView().setModel(oModeloData,"SalesOrderModel")
            //     },
            //     error:function(error){
 
            //     }
            // })
 
        }
    });
});
 