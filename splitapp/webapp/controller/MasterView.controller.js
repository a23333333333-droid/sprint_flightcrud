sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller,JSONModel,Sorter,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {
        },
        onDetailView:function(){
            //get the router object
           let oRouter=this.getOwnerComponent().getRouter()
            //use the navigation method
            oRouter.navTo("RouteDetail")
        },
        onSort:function(){
			if(!this.bDescending){
			this.bDescending=false;
			}
			var oSorter=new Sorter("toolsName",this.bDescending);
			var oList=this.getView().byId("idListCtrl");
			var oBinding=oList.getBinding("items");
			oBinding.sort(oSorter);
			this.bDescending=!this.bDescending;
		},
		onSearch:function(oEvent){
         	var searchString=oEvent.getParameter("query")|| oEvent.getParameter("newValue");
         	var oName=new Filter("toolsName",FilterOperator.Contains,searchString );
         	var oAvail=new Filter("availability",FilterOperator.Contains,searchString);
         	var aFilter=[oName,oAvail];
         	var mainFilter=new Filter({
         		filters:aFilter,
         		and:false
         	});
             var oList=this.getView().byId("idListCtrl");
         	var oBiniding=oList.getBinding("items");
         	oBiniding.filter(mainFilter);
        },
        onItemSelect:function(oEvent){
            // when i click it should navigate to the next page
                   var oList=oEvent.getParameter("listItem");
                let sPath=oList.getBindingContextPath()
                let aItems=sPath.split("/")
                let id= aItems[aItems.length-1]


                   let oRouter=this.getOwnerComponent().getRouter()
            //use the navigation method
            oRouter.navTo("RouteDetail",{index:id

            })


   
        }
    });
});