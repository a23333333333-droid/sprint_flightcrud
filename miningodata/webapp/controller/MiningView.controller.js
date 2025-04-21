sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],function(BaseController,Filter,FilterOperator,MessageBox){
    "use strict";

    return BaseController.extend("app.miningodata.controller.MiningView", {
        onInit:function(){
            this._getData()
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
        onRowSelection:function(oEvent){
            let oItem=oEvent.getParameter("listItem")
            let oContext=oItem.getBindingContextPath("MiningModel")
            let aItems=oContext.split("/")
            let Index=aItems[aItems.length-1];
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView",{
                indexDetail:Index
        })
            
        },
        onDelete:function(oEvent){
            let oContext=oEvent.getSource().getBindingContext("MiningModel").getObject()
            MessageBox.confirm("Are you sure you want to delete the record",
                {
                    onClose:(choice)=>{
                        if(choice==='OK'){
                            this._onDeleteCall(oContext)
                        }
                    }
                })
        },
        _onDeleteCall: function(param) {
            let key = param.LocationId; // Assuming the key field is LocationID
        
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/MINING_ODATASet(LocationId='" + key + "')"; // Adjust the entity set name if needed
        
            oModel.remove(entity, {
                success: (resp) => {
                    MessageBox.success("Record Deleted", {
                        onClose: function() {
                            this._getData();
                        }.bind(this)
                    })
                },
                error: (err) => {
                    MessageBox.error("Deletion Failed");
                }
            })
        },
        onCreate:function(){
            let oRouter=this.getRouter()
            oRouter.navTo("RouteCreateView")
        },
        onSearch:function(){
            let aFilter=[]
            let sTypeOfMineral=this.getView().byId("idTypeOfMineral2").getValue()
            let sLocationId=this.getView().byId("idLocationId2").getValue()
            if(sTypeOfMineral){
                let filterName=new Filter("TypeOfMineral",FilterOperator.Contains,sTypeOfMineral)
                aFilter.push(filterName)
            }
            if(sLocationId){
                let filterName=new Filter("LocationId",FilterOperator.Contains,sLocationId)
                aFilter.push(filterName)
            }
            let oTable=this.getView().byId("idTab")
            let bindingInfo=oTable.getBinding("items")
            if(bindingInfo){
                bindingInfo.filter(aFilter);
            }
        }  
        
    });
});