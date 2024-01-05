
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";
        let oPort, dPort, oDistance, dDistance, oCargoSize, dCargoSize;
 
        return Controller.extend("nauticalfe.controller.FreightSimulator", {
            onInit: function () {
                UIComponent.getRouterFor(this).getRoute('RouteFreightSimulator').attachPatternMatched(this._onRouteMatched, this)
 
            },
            _onRouteMatched: function (oEvent) {
       
               
 
                // this.getView().byId("_IDGenSimpleForm2").refresh(true, false);
                //  var component = this.getOwnerComponent();
                //  component.refreshBinding();
                console.log(oEvent);
                oPort = oEvent.mParameters.arguments.oPort;
                dPort = oEvent.mParameters.arguments.dPort;
                oDistance = oEvent.mParameters.arguments.oDistance;
                dDistance = oEvent.mParameters.arguments.dDistance;
                oCargoSize = oEvent.mParameters.arguments.oCargoSize;
                dCargoSize = oEvent.mParameters.arguments.dCargoSize;
                // console.log(oPort,oCargoSize,oDistance);
            },
 
            //freight cost calculation for Freight(Per Ton)
            freightCostPerTon: function(oEvent) {
                var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
                var freightcostPerTon = this.getView().byId("field10")
                var totalProjCostPerTon = this.getView().byId("field12")
                var totalCostPerTon = this.getView().byId('inputCostPerTon')
                var cargoPerTon = this.getView().byId("field9").getValue()
                if (freightcostPerTon) {
                  freightcostPerTon.setValue((proposedFreightCost * cargoPerTon).toFixed(2));
                }
                if(totalProjCostPerTon){
                    totalProjCostPerTon.setValue((proposedFreightCost * cargoPerTon).toFixed(2));
                }
                if(totalCostPerTon){
                    totalCostPerTon.setValue(totalProjCostPerTon.getValue())
                }
 
            },
 
            //frieght cost calculation for Freight(Lumpsum)
            freightCostLumpsum: function(oEvent) {
                var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
                var frieghtCostLumpsum = this.getView().byId("fild10")
                var totalProjCostLumpsum = this.getView().byId("fild12")
                var totalCostLumpsum = this.getView().byId('inputCostLumpsum')
                var cargoLumpsum = this.getView().byId("fild9").getValue()
                if (frieghtCostLumpsum) {
                    frieghtCostLumpsum.setValue((proposedFreightCost*(cargoLumpsum/1000)).toFixed(2))
                }
                if(totalProjCostLumpsum){
                    totalProjCostLumpsum.setValue((proposedFreightCost*(cargoLumpsum/1000)).toFixed(2));
                }
                if(totalCostLumpsum){
                    totalCostLumpsum.setValue(totalProjCostLumpsum.getValue())
                }
 
            },
           
            //freight cost calculation for Freight (TO/NM)
            freightCostPoNm: function(oEvent) {
                var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
                var distance = this.getView().byId("field27").getValue()
                var freightcostToNm = this.getView().byId("field29")
                var totalProjCostToNm = this.getView().byId("field31")
                var totalCostToNm = this.getView().byId('inputCostToNm')
                var cargoToNm = this.getView().byId("field28").getValue()
                if (freightcostToNm) {
                  freightcostToNm.setValue((proposedFreightCost * distance * cargoToNm).toFixed(2));
                }
                if(totalProjCostToNm){
                    totalProjCostToNm.setValue((proposedFreightCost * distance * cargoToNm).toFixed(2));
                }
                if(totalCostToNm){
                    totalCostToNm.setValue(totalProjCostToNm.getValue())
                }
 
            }
           
        });
    });