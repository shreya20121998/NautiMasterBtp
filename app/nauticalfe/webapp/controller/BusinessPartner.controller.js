

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    
    
  ],
  function (Controller,History, ) {
    "use strict";
    

    return Controller.extend("nauticalfe.controller.BusinessPartner", {

      onInit: function () {

      },
      onBPDetailpress: function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteBPMasterDetails")
      },
      onVendorDataPress: function() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteVendorDataSyncing");
      },
      backPress:function(){
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView", {}, true);
        }
      },
      
      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      

    });

  });
