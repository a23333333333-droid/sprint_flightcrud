sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"

],function(BaseController,Filter,FilterOperator,MessageBox){
    "use strict";

    return BaseController.extend("app.flightdetailssprint.controller.FlightView", {
        onInit:function(){
            this._getData()
        },
        _getData:function(){
            let oModel=this.getModel()
            let entity="/SPRINT_MAINSet"
                        
            oModel.read(entity,{
                success:(odata,resp)=>{
                    let jModel=this.getOwnerComponent().getModel("FlightModel")
                        jModel.setData(odata.results)
                    // let oModelJs=new sap.ui.model.json.JSONModel(odata.results)
                    // this.getView().setModel(oModelJs,"FlightModel")

                },
                error:(error)=> {
                    console.log(error)
                }
            })
        },


        onRowSelection:function(oEvent){
            let oItem=oEvent.getParameter("listItem")
            let oContext=oItem.getBindingContextPath("FlightModel")
            let aItems=oContext.split("/")
            let Index=aItems[aItems.length-1];
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView",{
                indexDetail:Index
        })
            
        },

        onDelete:function(oEvent){
            let oContext=oEvent.getSource().getBindingContext("FlightModel").getObject()
            MessageBox.confirm("Are you sure you want to delete the record",
                {
                    onClose:(choice)=>{
                        if(choice==='OK'){
                            this._onDeleteCall(oContext)
                        }
                    }
                })
        },
        _onDeleteCall:function(param){
            let key1=param.Carrid;
            let key2=param.Connid;
            let key3=param.Bookid;
            let key4=param.Fldate;
            let key5=key4.replace(/-/g,'');
             
            let oModel=this.getOwnerComponent().getModel();
            let entity= "/SPRINT_MAINSet(Carrid='"+key1+"',Connid='"+key2+"',Bookid='"+key3+"',Fldate='"+key5+"')";
            oModel.remove(entity,{
                success:(resp)=>{
                    MessageBox.success("Record Deleted",{
                     onClose:function(){
                        this._getData()
                     }.bind(this)
                    })
                },
                error:(err)=>{
                    MessageBox.error("Deletion Failed")
                }
            })
        },

        
        onCreate:function(){
            let oRouter=this.getRouter()
            oRouter.navTo("RouteCreateView")
        },
        onSearch:function(){
            let aFilter=[]
            let sCarrid=this.getView().byId("idCarrid2").getValue()
            let sBookid=this.getView().byId("idBookid2").getValue()
            if(sCarrid){
                let filterName=new Filter("Carrid",FilterOperator.Contains,sCarrid)
                aFilter.push(filterName)
            }
            if(sBookid){
                let filterName=new Filter("Bookid",FilterOperator.Contains,sBookid)
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