sap.ui.define(
  [
      "sap/ui/core/mvc/Controller",
      "sap/ui/core/routing/History",
      'sap/ui/core/Fragment',
  ],
  function(BaseController,History,Fragment) {
    "use strict";

    return BaseController.extend("nauticalfe.controller.MasterDashboard", {
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
      onBusinessPartnerPress: function () {

        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteBusinessPartnerDashboard");
        
      },
     
      onConfigPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteConfigReleaseDashboard");
      },
           
     
      onApiurl:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteApiUrl");
      },
      
      navToVoyageType: function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteVoyageType" ,{}, true)
      },
      onVesselPress:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteVesselType");
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
        oRouter.navTo("RouteCountryMasterUpload");
      },
      onMarinePathUpd:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMarinePathUpload");
      },
      onMarineDisUpd:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMarineDistanceUpload");
      },
      onPortUpload:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RoutePortUpload");
      },
      onUpload:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteUpload");
      },
      onPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },



     
    });    }
);