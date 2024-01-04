sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.TrCompareLivefrieghtReport", {
        onInit() {
            
        },
        onSaveAs:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSaveAsVariant");
        },
         });
    }
  );
  