sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem"
    ],
    function(Controller,Fragment, MessageToast, MenuItem) {
      "use strict";
  
      return Controller.extend("nauticalfe.controller.TransactionDashboard", {
        _oVoyageMenuFragment: null, // Property to store Voyage menu fragment
        _oChartMenuFragment: null,
        _oReportMenuFragment :null,
        onInit() {
          // Assuming you have a reference to the IconTabHeader
          var iconTabHeader = this.getView().byId("iconTabHeaderId");

          // Attach select event handler to the IconTabHeader
          iconTabHeader.attachSelect(function(oEvent) {
              var selectedKey = oEvent.getParameter("key");
              switch (selectedKey) {
                  case "voyage":
                      this.scrollToSection("voyageTileId");
                      break;
                  case "freightsimulator":
                    this.scrollToSection("freightSimulatorTileId");
                    break;
                  case "chartering":
                      this.scrollToSection("charteringTileId");
                      break;
                  case "quotation":
                    this.scrollToSection("quotationTileId");
                    break;
                  case "negotiation":
                      this.scrollToSection("negotiationTileId");
                      break;
                  case "reports":
                    this.scrollToSection("reportTileId");
                    break;
                  // Add cases for other sections as needed
                  default:
                      break;
              }
          }, this);
      },

      scrollToSection: function(sectionId) {
        var sectionFlexBox = this.getView().byId(sectionId);
        if (sectionFlexBox) {
            sectionFlexBox.getDomRef().scrollIntoView({ behavior: "smooth" });
        }
      },
      
      onChange: function() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteTrChangeVoyage");
      },
      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      VoyageOptions:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("TrVoyageOptions")
      },
      

      
      
      onCaptureVoyage:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteCaptureVoyageDetails")
      },
      
      onChangeVoyage: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteTrChangeVoyage");
      },
      onDisplayVoyage: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteDisplayVoyageDetails");
      },
      onMaintainEvents: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMaintainEvents");
      },
      onVoyageApproval: function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteVoyageApproval");
      },
    
      onCreateChartering: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteCreateChartering");
      },
      onChangeChartering: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteChangeChartering");
      },
      onDisplayChartering: function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteDisplayChartering");
      },
      onCharteringApproval: function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteCharteringApproval");
      },

      onContractAwardStatusReport: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteContractAwardStatusReport");
      },
      onBiddingHistoryReport: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteBiddingHistoryReport");
      },
      

      onFrieghtPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteTrChangeVoyage");
      },
      onRequestForQuotation: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteRequestForQuotation");
      },
      onCompareRequestForQuotation: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteCompareRequestForQuotation");
      },
      onInviteForLiveFrieghtNegotiation: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteInviteForLiveFrieghtNegotiation");
      },
      onCompareLiveFrieghtNegotiation: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteCompareLiveFrieghtNegotiation");
      }
      });
    }
  );
  