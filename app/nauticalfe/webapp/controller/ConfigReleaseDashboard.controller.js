sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.ConfigReleaseDashboard", {
        onInit() {
        },
        onConfigMaintainGroup:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteConfigMaintainGroup");
          },
          onConfigVoyage:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteConfigVoyage");
          },
          onConfigChartering:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteConfigChartering");
          },
    
      });
    }
  );
  