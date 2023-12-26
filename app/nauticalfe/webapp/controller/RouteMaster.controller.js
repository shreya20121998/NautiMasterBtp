sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function(Controller) {
    "use strict";

    return Controller.extend("nauticalfe.controller.RouteMaster", {
      onInit() {
         
      },onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        }, onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        },onBackPressHome: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");
        },onPressExit:function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        }
    });
  }
);
