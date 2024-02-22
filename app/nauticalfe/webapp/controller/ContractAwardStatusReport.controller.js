sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.ContractAwardStatusReport", {
        onInit() {
            
        },
        onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteTransactionDashboard");
        },
        onSaveAs:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSaveAsVariant");
        },
         });
    }
  );
  