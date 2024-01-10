
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function( BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.TrVoyageApproval", {
        onInit() {
         
        },
        onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("TransView");
        },
        onSaveAs:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteSaveAsVariant");
        },

        onValueHelpRequest: function (oEvent) {
          // Open the value help dialog or perform any custom logic
        }
      
      });
    }
  );