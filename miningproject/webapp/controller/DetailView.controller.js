sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController, JSONModel,Fragment,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("app.miningproject.controller.DetailView", {
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
        },
        _onRoutePatternMatched: function(oEvent) {
            console.log(oEvent);
            let index = oEvent.getParameter("arguments").index;
            let sPath = "MiningModel>/MiningDataSet/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);
        },
        onFilter:function(){
            let aFilter=[]
            let sMineral=this.getView().byId("idMineral").getValue()
            // console.log(sName);
            let sLocation=this.getView().byId("idLocation").getValue()
            if(sMineral){
                let filterName=new Filter("Type of mineral", FilterOperator.Contains,sMineral)
                aFilter.push(filterName)
            }
            if(sLocation){
                let filterName=new Filter("Location ID", FilterOperator.Contains,sLocation)
                aFilter.push(filterName)
            }
                let oTable=this.getView().byId("idMTable")
                let bindingInfo=oTable.getBinding("items")
                bindingInfo.filter(aFilter);
           
            },
            onConfirmSupp:function(oEvent){
                // confirm the choice
                // we need the value that was selected
                // we need to place it exactly at the same input field where the value was selected
                // you are setting the value on that input field
                let oSelectedItems=oEvent.getParameter("selectedItem")
                let sValue=oSelectedItems.getProperty("info")
                let oInput=sap.ui.getCore().byId(this.inputField)
                    oInput.setValue(sValue)
            },
            onF4Help:function(oEvent){
                // let myInputField where the popup actually popped up
                this.inputField=oEvent.getSource().getId()
                let oModel=this.getView().getModel("MiningModel")
                let aData=oModel.getProperty("/MiningDataSet")
                let deepCopy=JSON.parse(JSON.stringify(aData))
                let oModelFrag=new JSONModel({newSuppSet:deepCopy})
                if(!this.oDialog){
                    this.oDialog=Fragment.load({
                        fragmentName:"app.miningproject.Fragments.popUp",
                        controller:this
                    }).then((dialog)=>{
                        this.oDialog=dialog
                        this.getView().addDependent(this.oDialog)
                        this.getView().setModel(oModelFrag,"FragmentModel")
                        this.oDialog.open()
                    })
                }else{
                    this.oDialog.open()
                }
        }
    });
});
