sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.CaptureVoyageDetails", {
        onInit() {
        },
        onBackPressHome: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");
        },
        onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteTransactionDashboard");
        },
        onCaptureVoyagePlan: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteCaptureVoyagePlan");
        },
        onCaptureVoyageActual: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteCaptureVoyageActual");
        },
      });
    }
  );