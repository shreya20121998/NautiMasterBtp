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
            } ,onBackPressHome: function () {
              const oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("RouteHome");
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
           
            
      });
    }
  );
  