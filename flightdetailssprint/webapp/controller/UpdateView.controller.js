sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], function(BaseController,MessageBox){
    "use strict";

    return BaseController.extend("app.flightdetailssprint.controller.UpdateView", {
        onInit:function() {
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this._routePatternMatched,this)


        },
        _routePatternMatched:function(oEvent){
            let index=oEvent.getParameter("arguments").indexUpdate
            let sPath="FlightModel>/"+index
            let oView=this.getView()
            oView.bindElement(sPath)
        },
        onUpdate:function(){

            //PAYLOAD
            //objects of the input fields
            let oCarrid=this.getView().byId("idCarridUpdate")
            let oConnid=this.getView().byId("idConnidUpdate")
            let oFldate=this.getView().byId("idFldateUpdate")
            let oBookid=this.getView().byId("idBookidUpdate")
            let oOrderdate=this.getView().byId("idOrderdateUpdate")
            //getting values of all input fields
            let sCarrid=oCarrid.getValue()
                sCarrid=sCarrid.toUpperCase()
            let sConnid=oConnid.getValue()
            let sBookid=oBookid.getValue()
            let sFldate=oFldate.getValue() 
            let sOrderdate=oOrderdate.getValue()
                sFldate=sFldate.replace(/-/g,"")

                let payload={
                    "OrderDate":sOrderdate
                }

        let oModel=this.getOwnerComponent().getModel()
        let entity="/SPRINT_MAINSet(Carrid='"+ sCarrid +"',Connid='"+sConnid+"',Bookid='"+sBookid+"',Fldate='"+sFldate+"')"

        let that=this;
        oModel.update(entity,payload,{
            success:function(){
                MessageBox.success("record Updated",{
                    onClose:function(){
                        let oRouter=that.getOwnerComponent().getRouter()
                        oRouter.navTo("RouteFlightView")
                    }
                })
            },
            error:function(error){
                MessageBox.error("record Updation failed")
            }
        })
            //first step:get the model
            //second step:get the entity
            //thirdstep:get the method or call the method
        }
    });
});