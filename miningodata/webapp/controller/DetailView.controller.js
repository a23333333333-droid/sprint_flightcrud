sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"

],function(BaseController,Filter,FilterOperator,MessageBox){
    "use strict";

    return BaseController.extend("app.miningodata.controller.DetailView", {
        onInit:function(){
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this._onRoutePatternMatched,this)
        },
        _onRoutePatternMatched:function(oEvent){
            this.index=oEvent.getParameter("arguments").indexDetail
            let sPath="MiningModel>/"+ this.index
            let oView=this.getView()
            oView.bindElement(sPath)
        },
        onEdit:function(){
            let oRouter=this.getRouter()
            oRouter.navTo("RouteUpdateView",{
                indexUpdate:this.index
            })
        }
    });
});