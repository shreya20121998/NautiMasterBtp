sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
 
        return Controller.extend("nauticalfe.controller.Home", {
            onInit: function () {
 
            },
           
            onPress: function() {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteCreateVoyage");
            },
            onPress2: function() {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteBidCont");
            },
            onPress3: function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Routedash")
            },
            onPress5: function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteTransactionDashboard")
            },
            onPress4: function(){
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("MastView")
            }
        });
    });