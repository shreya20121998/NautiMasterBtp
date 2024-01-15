sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "sap/ui/core/routing/History"
    ],
    function(BaseController,Fragment,History) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.VendorDataSyncing", {
        onInit() {
        },
        onPress: function () {
          var oView = this.getView(),
            oButton = oView.byId("button");
          if (!this._oMenuFragment) {
            this._oMenuFragment = Fragment.load({
              name: "nauticalfe.fragments.MastOptionsDropDown",
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
          oRouter.navTo("RouteHome");
        },
        onBackPressHome: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Routedash");
        },
        
        onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("MastView");
        },

        showVendorNoDialog:function () {
          var oView = this.getView();
          if (!this._oTankInfomate) {
            this._oTankInfomate = sap.ui.xmlfragment(oView.getId(), "nauticalfe.fragments.Supplier", this);
            oView.addDependent(this._oTankInfomate);
          }
          // var oTankModel = new sap.ui.model.json.JSONModel();  
          // this._oTankInfoDialog.setModel(oTankModel);
          this._oTankInfomate.open();
         
           
        },
        onClose: function() {
          if (this._oTankInfomate) {
              this._oTankInfomate.close();
          }
        },
        
      });
    }
  );
  