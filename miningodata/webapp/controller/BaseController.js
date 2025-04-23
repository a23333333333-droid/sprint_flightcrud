sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) =>{
    "use strict";

    return Controller.extend("app.mining.controller.BaseController", {
        onInit:function(){
            this._getData()
        },
        getRouter:function(){
            return this.getOwnerComponent().getRouter()
        },
        getModel:function(m){
            return this.getOwnerComponent().getModel(m)
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
        }
    });
});