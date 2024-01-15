sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator,FilterType) {
        "use strict";
 
        return Controller.extend("nauticalfe.controller.BidCont", {
            onInit: function () {
                // console.log("hello");
                // let oView = this.getView();
                // console.log(oView);
            },
            onBackPress: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteHome");
            },
            onBackPressHome: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteHome");
            },
            
            onPressBidTableData(oEvent) {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteBidObj", {
                    bidObjPath: window.encodeURIComponent(oItem.getBindingContext("bidData").getPath().substr(1))
                });
            },
            closeTile: function(oEvent) {
                let oTable = this.getView().byId("table");
                let oNumericContent = this.getView().byId("closeTileNumericId"); 
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator.Contains,"closed");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
                let closedItemsCount = oTable.getBinding("items").getLength();
                oNumericContent.setValue(closedItemsCount);
            },
            
            
            openTile : function(oEvent){
                let oTable = this.getView().byId("table");
                let oNumericContent = this.getView().byId("openTileNumericId"); 
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator.Contains,"open");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
                let openItemsCount = oTable.getBinding("items").getLength();
                oNumericContent.setValue(openItemsCount);
            },

            ongoingTile : function(oEvent){
                console.log("clicked ongoing");
                let oTable = this.getView().byId("table");
                let oNumericContent = this.getView().byId("ongoingTileNumericId"); 
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator.Contains,"Ongoing");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
                // Get the count of rows for the "Closed" status
                let ongoingItemsCount = oTable.getBinding("items").getLength();
            
                // Set the count to the NumericContent
                oNumericContent.setValue(ongoingItemsCount);
    
            },
            allTile : function(oEvent){
                let oTable = this.getView().byId("table");
                let oNumericContent = this.getView().byId("allTileNumericId");
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator,"Closed,Ongoing,open");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
                // Get the count of rows for the "Closed" status
                let ongoingItemsCount = oTable.getBinding("items").getLength();
            
                // Set the count to the NumericContent
                oNumericContent.setValue(ongoingItemsCount);
    
            }
        });
    });