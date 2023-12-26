
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function(BaseController,History) {
      "use strict";
 
      return BaseController.extend("nauticalfe.controller.MastView", {
        onInit() {
        },
        onPortLoc:function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RoutePortLocMaster");
        },
        onCostMaster:function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteCostMaster");
        },
        onEventMaster:function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteEventMaster");
        },
        onPortLocUpload:function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RoutePortLocUpload");
        },
        onPortMaster:function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RoutePortMaster");
        },
        onRefDocIndicator:function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteRefDocIndicator");
        },
        onBusinessPress: function() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteBusinessPartner");
        },
        onConfigPress: function() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteConfigRelease");
        },
       
        onPortUpload:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RoutePortUpload");
        },
        onApiurl:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMastApiUrl");
        },
        onVesselPress:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteVesselType");
        },
        navToVoyageType: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMasterVoyageType" ,{}, true)
 
        },
       
        navToCurrencyType: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMasterCurrencyType")
 
        },
        navToClassMaster: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMasterClassMaster");
 
        },
        navToVesselType: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMasterVesselType")
 
        },
        onBidMaster:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteBidMaster");
        },
        onUoM:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteUoM");
        },
        onRouterMaster:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteRouteMaster");
        },
        onCountryMaster:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteCountryMaster");
        },
        onCountryMasterUpd:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteCountryMasterUpd");
        },
        onMarinePathUpd:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMarinePathUpd");
        },
        onMarineDisUpd:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMarineDisUpd");
        },
        onPortUpload:function(){
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RoutePortUpload");
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
            oRouter.navTo("MastView", {}, true);
          }
       }
 
 
 
       
      });    }
  );
 