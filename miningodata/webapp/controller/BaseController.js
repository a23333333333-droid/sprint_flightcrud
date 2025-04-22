sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) =>{
    "use strict";

    return Controller.extend("app.mining.controller.BaseController", {
        onInit:function(){

        },
        getRouter:function(){
            return this.getOwnerComponent().getRouter()
        },
        getModel:function(){
            return this.getOwnerComponent().getModel()
        }
    });
});