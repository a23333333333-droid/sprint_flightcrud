sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], function(BaseController,MessageBox){
    "use strict";

    return BaseController.extend("app.miningodata.controller.UpdateView", {
        onInit:function() {
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this._routePatternMatched,this)
        },
        _routePatternMatched:function(oEvent){
            let index=oEvent.getParameter("arguments").indexUpdate
            let sPath="MiningModel>/"+index
            let oView=this.getView()
            oView.bindElement(sPath)
        },
        onUpdate:function(){
            let oLocationId=this.getView().byId("idLocationIdUpdate")
            let oLocationDescription=this.getView().byId("idLocationDescriptionUpdate")
            let oMiningResourceAllocated=this.getView().byId("idMiningResourceAllocatedUpdate")
            let oTotalCost=this.getView().byId("idTotalCostUpdate")
            let oPossibleMineralFromLocation=this.getView().byId("idPossibleMineralFromLocationUpdate")
            let oNumberOfDrillsPerformed=this.getView().byId("idNumberOfDrillsPerformedUpdate")
            let oTypeOfMineral=this.getView().byId("idTypeOfMineralUpdate")
            let oManDays=this.getView().byId("idManDaysUpdate")
            let oProbabilityOfOutcome=this.getView().byId("idProbabilityOfOutcomeUpdate")
            let oCurrency=this.getView().byId("idCurrencyUpdate")
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
            let oModel=this.getOwnerComponent().getModel()
            let entity="/MINING_ODATASet(LocationId='"+ sLocationId +"')"
            let that=this;
        oModel.update(entity,payload,{
            success:function(){
                MessageBox.success("record Updated",{
                    onClose:function(){
                        let oRouter=that.getOwnerComponent().getRouter()
                        oRouter.navTo("RouteMiningView")
                    }
                })
            },
            error:function(error){
                MessageBox.error("record Updation failed")
            }
        })
    }
});
});