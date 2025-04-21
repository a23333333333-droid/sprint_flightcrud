sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], function(BaseController,MessageBox){
    "use strict";

    return BaseController.extend("app.flightdetailssprint.controller.CreateView", {
        onInit:function() {

        },
        onCreate:function(){

            //PAYLOAD
            //objects of the input fields
            let oCarrid=this.getView().byId("idCarrid")
            let oConnid=this.getView().byId("idConnid")
            let oFldate=this.getView().byId("idFldate")
            let oBookid=this.getView().byId("idBookid")
            let oOrderdate=this.getView().byId("idOrderdate")
            //getting values of all input fields
            let sCarrid=oCarrid.getValue()
                sCarrid=sCarrid.toUpperCase()
            let sConnid=oConnid.getValue()
            let sBookid=oBookid.getValue()
            let sFldate=oFldate.getValue()  
            let sOrderdate=oOrderdate.getValue()


                let payload={
                    "Carrid":sCarrid,
                    "Connid":sConnid,
                    "Fldate":sFldate,
                    "Bookid":sBookid,
                    "OrderDate":sOrderdate
                }

        let oModel=this.getModel()
        let entity="/SPRINT_MAINSet"
        let that=this;
        oModel.create(entity,payload,{
            success:function(){
                MessageBox.success("record inserted",{
                    onClose:function(){
                        let oRouter=that.getRouter()
                        oCarrid.setValue("")
                        oConnid.setValue("")
                        oFldate.setValue("")
                        oBookid.setValue("")
                        oOrderdate.setValue("")
                        oRouter.navTo("RouteFlightView")
                    }
                })
            },
            error:function(error){
                MessageBox.error("record insertion failed")
            }
        })
            //first step:get the model
            //second step:get the entity
            //thirdstep:get the method or call the method
        }
    });
});