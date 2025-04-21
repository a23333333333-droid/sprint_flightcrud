sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (BaseController, JSONModel) => {
  "use strict";

  return BaseController.extend("app.miningproject.controller.App", {
      onInit() {
        var oModel = new JSONModel();
        oModel.loadData("/model/mockData/MiningData.json");
        this.getView().setModel(oModel, "MiningModel");
      }
  });
});
