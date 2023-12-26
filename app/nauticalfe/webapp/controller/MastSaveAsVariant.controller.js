sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/Fragment"
    ],
    function(BaseController,History,Fragment) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.MastSaveAsVariant", {
        onInit() {
        },
        onPress: function () {
          var oView = this.getView(),
          oButton = oView.byId("button");
          if (!this._oMenuFragment) {
            this._oMenuFragment = Fragment.load({
              name: "nauticalfe.fragments.MastUpdDropDown",
              id: oView.getId(),
              controller: this
            }).then(function(oMenu) {
              oMenu.openBy(oButton);
              this._oMenuFragment = oMenu;
              return this._oMenuFragment;
            }.bind(this));
          } else {
            this._oMenuFragment.openBy(oButton);
          }
        },
        
        onExit: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        },
        onBackPressHome: function () {
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
            oRouter.navTo("RouteSaveAsVariant", {}, true);
          }
       },

        onInformationPress: function () {
          var oView = this.getView();
          var oInfoDialog = oView.byId("infoDialog");
      
          if (!oInfoDialog) {
              oInfoDialog = sap.ui.xmlfragment(oView.getId(), "nauticalfe.fragments.InformationDialog", this);
              oView.addDependent(oInfoDialog);
          }
      
          oInfoDialog.open();
      },
      
      onOKPress() {
        this.byId("infoDialog").close();
      }



      });
    }
  );
  