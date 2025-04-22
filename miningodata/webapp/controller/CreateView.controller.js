sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], function(BaseController,MessageBox){
    "use strict";

    return BaseController.extend("app.miningodata.controller.CreateView", {
        onInit:function() {

        },
        onCreate:function(){

            //PAYLOAD
            //objects of the input fields
            let oLocationId=this.getView().byId("idLocationId")
            let oLocationDescription=this.getView().byId("idLocationDescription")
            let oMiningResourceAllocated=this.getView().byId("idMiningResourceAllocated")
            let oTotalCost=this.getView().byId("idTotalCost")
            let oPossibleMineralFromLocation=this.getView().byId("idPossibleMineralFromLocation")
            let oNumberOfDrillsPerformed=this.getView().byId("idNumberOfDrillsPerformed")
            let oTypeOfMineral=this.getView().byId("idTypeOfMineral")
            let oManDays=this.getView().byId("idManDays")
            let oProbabilityOfOutcome=this.getView().byId("idProbabilityOfOutcome")
            let oCurrency=this.getView().byId("idCurrency")
            //getting values of all input fields
            let sLocationId=oLocationId.getValue()
            let sLocationDescription=oLocationDescription.getValue()
            let sMiningResourceAllocated=oMiningResourceAllocated.getValue()
            let sTotalCost=oTotalCost.getValue()  
            let sPossibleMineralFromLocation=oPossibleMineralFromLocation.getValue()
            let sNumberOfDrillsPerformed=oNumberOfDrillsPerformed.getValue()
            let sTypeOfMineral=oTypeOfMineral.getValue()
            let sManDays=oManDays.getValue()
            let sProbabilityOfOutcome=oProbabilityOfOutcome.getValue()
            let sCurrency=oCurrency.getValue()
            let payload={
                "LocationId":sLocationId,
                "LocationDescription":sLocationDescription,
                "MiningResourceAllocated":sMiningResourceAllocated,
                "TotalCost":sTotalCost,
                "PossibleMineralFromLocation":sPossibleMineralFromLocation,
                "NumberOfDrillsPerformed":sNumberOfDrillsPerformed,
                "TypeOfMineral":sTypeOfMineral,
                "ManDays":sManDays,
                "ProbabilityOfOutcome":sProbabilityOfOutcome,
                "Currency":sCurrency

            }
            let oModel=this.getModel()
        let entity="/MINING_ODATASet"
        let that=this;
        oModel.create(entity,payload,{
            success:function(){
                MessageBox.success("record inserted",{
                    onClose:function(){
                        let oRouter=that.getOwnerComponent().getRouter()
                        oRouter.navTo("RouteMiningView")
                        oCarrid.setValue("")
                        oConnid.setValue("")
                        oFldate.setValue("")
                        oBookid.setValue("")
                        oOrderdate.setValue("")
                        
                    }
                })
            },
            error:function(error){
                MessageBox.error("record insertion failed")
            }
        })
    }
    });
});