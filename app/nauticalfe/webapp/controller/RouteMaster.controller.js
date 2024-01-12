sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function(Controller) {
    "use strict";

    return Controller.extend("nauticalfe.controller.RouteMaster", {
      onInit() {
         
      },
      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
      },
      onExit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Routedash");
      },
    });
  }
);
