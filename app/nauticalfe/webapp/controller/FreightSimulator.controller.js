
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
                // routing with parameters
                sap.ui.core.UIComponent.getRouterFor(this).getRoute('RouteFreightSimulator').attachPatternMatched(this._onRouteMatched, this)
 
            },
            _onRouteMatched: function (oEvent) {
        
                    var OriginData=oEvent.mParameters.arguments.OriginData
                    var destinationData=oEvent.mParameters.arguments.destinationData
                    var distanceData=oEvent.mParameters.arguments.distanceData
                    var cargo_sizedestination=oEvent.mParameters.arguments.cargo_sizedestination
                    var cargo_sizeorigin=oEvent.mParameters.arguments.cargo_sizeorigin
                    let oView= this.getView();
                    //  for frieght perTo table
                    oView.byId("port_Origin").setValue(OriginData); 
                    oView.byId("port_Destination").setValue(destinationData); 
                    oView.byId("port_Distance").setValue(distanceData); 
                    oView.byId("cargosize_Origin").setValue(cargo_sizeorigin); 
                    oView.byId("cargosize_Destination").setValue(cargo_sizedestination); 
                    // for frieght Lumpsum
                    oView.byId("port_Origin1").setValue(OriginData); 
                    oView.byId("port_Destination1").setValue(destinationData); 
                    oView.byId("port_Distance1").setValue(distanceData); 
                    oView.byId("cargosize_Origin1").setValue(cargo_sizeorigin); 
                    oView.byId("cargosize_Destination1").setValue(cargo_sizedestination); 
                    // for frieght TO/NM
                    oView.byId("port_Origin2").setValue(OriginData); 
                    oView.byId("port_Destination2").setValue(destinationData); 
                    oView.byId("port_Distance2").setValue(distanceData); 
                    oView.byId("cargosize_Origin2").setValue(cargo_sizeorigin); 
                    oView.byId("cargosize_Destination2").setValue(cargo_sizedestination); 

                
            },
 
            //freight cost calculation for Freight(Per Ton)
            freightCostPerTon: function(oEvent) {
                var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
                var freightcostPerTon = this.getView().byId("frieghtCost_Destination")
                var totalProjCostPerTon = this.getView().byId("totalCost_Destination")
                var totalCostPerTon = this.getView().byId('inputCostPerTon')
                var cargoPerTon = this.getView().byId("cargosize_Destination").getValue()
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
                var frieghtCostLumpsum = this.getView().byId("frieghtCost_Destination1")
                var totalProjCostLumpsum = this.getView().byId("totalCost_Destination1")
                var totalCostLumpsum = this.getView().byId('inputCostLumpsum')
                var cargoLumpsum = this.getView().byId("cargosize_Destination1").getValue()
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
                var distance = this.getView().byId("port_Distance2").getValue()
                var freightcostToNm = this.getView().byId("frieghtCost_Destination2")
                var totalProjCostToNm = this.getView().byId("totalCost_Destination2")
                var totalCostToNm = this.getView().byId('inputCostToNm')
                var cargoToNm = this.getView().byId("cargosize_Destination2").getValue()
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