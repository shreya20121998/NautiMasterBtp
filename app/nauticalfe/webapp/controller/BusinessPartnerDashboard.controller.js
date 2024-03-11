sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.BusinessPartnerDashboard", {
        onInit() {
        },
        onBPDetailpress: function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteBPMasterDetails")
        },
        onVendorDataSyncingPress: function() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteVendorDataSyncing");
        },
      });
    }
  );
  