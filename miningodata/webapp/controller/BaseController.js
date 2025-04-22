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
        },

        _getData:function(){
            let oModel=this.getModel()
            let entity="/MINING_ODATASet"

            oModel.read(entity,{
                success:(odata,resp)=>{
                    let jModel=this.getOwnerComponent().getModel("MiningModel")
                        jModel.setData(odata.results)
                },
                error:(error)=> {
                    console.log(error)
                }
            })
        },
    });
});