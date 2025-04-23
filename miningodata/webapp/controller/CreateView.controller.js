sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "app/miningodata/Validate/validate",
    "sap/ui/model/json/JSONModel"
], function(BaseController,MessageBox,Validate,JSONModel){
    "use strict";

    return BaseController.extend("app.miningodata.controller.CreateView", {
        onInit:function() {
            this._getData()

        },
        onCreate:function(){
            let existingRecords = this.getModel("MiningModel").getData();
 
           
            if (!existingRecords || existingRecords.length === 0) {
                MessageBox.error("No data available. Please ensure data is loaded.");
                return;
            }

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

            };
            let oModel=this.getModel()
            let fields = [oLocationDescription,oMiningResourceAllocated,oTotalCost,oPossibleMineralFromLocation,oNumberOfDrillsPerformed,oTypeOfMineral,oManDays,oProbabilityOfOutcome,oCurrency];
            let check=Validate;
            let isValid = Validate.validateForm(fields,oLocationId,existingRecords);
            if(!isValid){
                return;
            }
            if(isValid){
        
                oModel.create("/MINING_ODATASet",payload,{
                success:function(){
                    MessageBox.success("record inserted",{
                        onClose:function(){
                            let oRouter = this.getOwnerComponent().getRouter()
                            oLocationId.setValue()
                            oLocationDescription.setValue()
                            oMiningResourceAllocated.setValue()
                            oTotalCost.setValue()
                            oPossibleMineralFromLocation.setValue()
                            oNumberOfDrillsPerformed.setValue()
                            oTypeOfMineral.setValue()
                            oManDays.setValue()
                            oProbabilityOfOutcome.setValue()
                            oCurrency.setValue()
                            oRouter.navTo("RouteMiningView")
                            this._getData()
                    
                        }.bind(this)
                    })
                }.bind(this),
                error:function(error){
                    MessageBox.error("record insertion failed")
                }
            });
        }
    },
    onF4Help: function (oEvent) {
        // let myInputField where the popup actually popped up
        this.inputField = oEvent.getSource().getId();
        let enititySet = `/MINING_ODATASet`;
        let oModel = this.getModel();
 
        // Fetch data from OData model
        oModel.read(enititySet, {
          success: (oData) => {
            let deepcopy = JSON.parse(JSON.stringify(oData.results));
            let oModelFrag = new JSONModel({ newSupp: deepcopy });
 
            if (!this.oDialog) {
              this.oDialog = sap.ui.core.Fragment.load({
                fragmentName: "app.miningodata.Fragments.popUp",
                controller: this
              }).then((dialog) => {
                this.oDialog = dialog;
                this.getView().addDependent(this.oDialog);
                this.getView().setModel(oModelFrag, "FragModel");
                this.oDialog.open();
              });
            } else {
              this.oDialog.open();
            }
          },
          error: (oError) => {
            // Handle error
            sap.m.MessageToast.show("Error fetching data");
          }
        });
    },
 
    onConfirmSupp: function (oEvent) {
        let oSelectedItems = oEvent.getParameter("selectedItem");
        let sValue = oSelectedItems.getProperty("info");
        let onInput = sap.ui.getCore().byId(this.inputField);
        onInput.setValue(sValue);
    }

    });
});