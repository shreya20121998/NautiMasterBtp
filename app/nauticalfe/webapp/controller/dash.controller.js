sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
       
"sap/ui/core/routing/History"
    ],
    function(BaseController,History) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.dash", {
        onInit() {
        },
        
           
            TransData: function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("TransView")
            },
            MastData: function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("MastView")
            } ,
            onBackPress: function () {
              const oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("RouteHome");
            },
           
            
      });
    }
  );
  