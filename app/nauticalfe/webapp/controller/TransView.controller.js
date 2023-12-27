sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem"
    ],
    function(Controller,Fragment, MessageToast, MenuItem) {
      "use strict";
  
      return Controller.extend("nauticalfe.controller.TransView", {
        _oVoyageMenuFragment: null, // Property to store Voyage menu fragment
        _oChartMenuFragment: null,
        _oReportMenuFragment :null,
        onInit() {
        },
        onChange: function() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteTrChangeVoyage");
      },
      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      VoyageOptions:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("TrVoyageOptions")
      },
      onVoyPress: function () {
 
        var oView = this.getView(),
         oButton = oView.byId("VoyButton");
 
        if (!this._oVoyageMenuFragment) {
 
          this._oVoyageMenuFragment = Fragment.load({
            name: "nauticalfe.fragments.TrVoyageMenu",
                        id: oView.getId(),
            controller: this
          }).then(function(oMenu) {
            oMenu.openBy(oButton);
            this._oVoyageMenuFragment = oMenu;
            return this._oVoyageMenuFragment;
          }.bind(this));
        }
        else {
          this._oVoyageMenuFragment.openBy(oButton);
        }
      },
      onChartPress: function () {
 
        var oView = this.getView(),
         oButton = oView.byId("ChartButton");
 
        if (!this._oChartMenuFragment) {
 
          this._oChartMenuFragment = Fragment.load({
            name: "nauticalfe.fragments.TrCharteringMenu",
                        id: oView.getId(),
            controller: this
          }).then(function(oMenu) {
            oMenu.openBy(oButton);
            this._oChartMenuFragment = oMenu;
            return this._oChartMenuFragment;
          }.bind(this));
        }
        else {
          this._oChartMenuFragment.openBy(oButton);
        }
      },
      onReportPress: function () {
 
        var oView = this.getView(),
         oButton = oView.byId("RejectButton");
 
        if (!this._oReportMenuFragment) {
 
          this._oReportMenuFragment = Fragment.load({
            name: "nauticalfe.fragments.TrReportMenu",
                        id: oView.getId(),
            controller: this
          }).then(function(oMenu) {
            oMenu.openBy(oButton);
            this._oReportMenuFragment = oMenu;
            return this._oReportMenuFragment;
          }.bind(this));
        }
        else {
          this._oReportMenuFragment.openBy(oButton);
        }
      },
      
      onPlan: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteTrCaptureVoyagePlan");
      },
      onActual: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteTrCaptureVoyageActual");
      }
      });
    }
  );
  