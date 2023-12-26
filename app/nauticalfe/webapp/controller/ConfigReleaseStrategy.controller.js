

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    
    
  ],
  function (Controller,History, ) {
    "use strict";
    

    return Controller.extend("nauticalfe.controller.ConfigReleaseStrategy", {

      onInit: function () {

      },
      onMaintainGroupPress: function() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteConfigMaintainGroup");
      },
      onConfigVoyage: function() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteConfigVoyage");
      },
      onConfigChartering: function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteConfigChartering");
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

