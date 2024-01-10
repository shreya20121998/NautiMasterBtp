sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("nauticalfe.controller.FreightSimulator", {
        onInit: function () {
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

        freightCostPerTon: function (oEvent) {
            var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
            var freightcostPerTon = this.getView().byId("frieghtCost_Destination");
            var totalProjCostPerTon = this.getView().byId("totalCost_Destination");
            var totalCostPerTon = this.getView().byId('inputCostPerTon');

            if (!isNaN(proposedFreightCost)) {
                var cargoPerTon = this.getView().byId("cargosize_Destination").getValue();
                var tonCost = (proposedFreightCost * cargoPerTon).toFixed(2);
                if (freightcostPerTon) {
                    freightcostPerTon.setValue(tonCost);
                }
                if (totalProjCostPerTon) {
                    totalProjCostPerTon.setValue(tonCost);
                }
                if (totalCostPerTon) {
                    totalCostPerTon.setValue(tonCost);
                }
            } else {
                freightcostPerTon.setValue("");
                totalProjCostPerTon.setValue("");
                totalCostPerTon.setValue("");
            }
        },

        freightCostLumpsum: function (oEvent) {
            var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
            var frieghtCostLumpsum = this.getView().byId("frieghtCost_Destination1");
            var totalProjCostLumpsum = this.getView().byId("totalCost_Destination1");
            var totalCostLumpsum = this.getView().byId('inputCostLumpsum');

            if (!isNaN(proposedFreightCost)) {
                var destPortCargo = this.getView().byId("cargosize_Destination1").getValue();
                var orgPortCargo = this.getView().byId("cargosize_Origin1").getValue()
                var lumpCost = ((proposedFreightCost*destPortCargo)/orgPortCargo).toString()
                var lumpCostArr = []
                lumpCostArr = lumpCost.split(".")
                console.log(lumpCostArr)
                if(frieghtCostLumpsum) {
                    if(lumpCostArr[1].length>2){
                        console.log(lumpCostArr[1],lumpCostArr[1].length)
                        var lumpRoundOff = (Number(lumpCostArr[1].substring(0,2))+1).toString()
                        lumpCost = lumpCostArr[0]+"."+lumpRoundOff
                        frieghtCostLumpsum.setValue(lumpCost)
                    }
                    else{
                        frieghtCostLumpsum.setValue(lumpCost)
                    }
                }
                if (totalProjCostLumpsum) {
                    totalProjCostLumpsum.setValue(lumpCost);
                }
                if (totalCostLumpsum) {
                    totalCostLumpsum.setValue(lumpCost);
                }
            } 
            else {
                frieghtCostLumpsum.setValue("");
                totalProjCostLumpsum.setValue("");
                totalCostLumpsum.setValue("");
            }
        },

        freightCostPoNm: function (oEvent) {
            var proposedFreightCost = parseFloat(oEvent.getParameter("value"));
            var distance = this.getView().byId("port_Distance2").getValue();
            var freightcostToNm = this.getView().byId("frieghtCost_Destination2");
            var totalProjCostToNm = this.getView().byId("totalCost_Destination2");
            var totalCostToNm = this.getView().byId('inputCostToNm');

            if (!isNaN(proposedFreightCost)) {
                var cargoToNm = this.getView().byId("cargosize_Destination2").getValue();
                var perToNmCost = (proposedFreightCost * distance * cargoToNm).toFixed(2);
                if (freightcostToNm) {
                    freightcostToNm.setValue(perToNmCost);
                }
                if (totalProjCostToNm) {
                    totalProjCostToNm.setValue(perToNmCost);
                }
                if (totalCostToNm) {
                    totalCostToNm.setValue(perToNmCost);
                }
            } else {
                freightcostToNm.setValue("");
                totalProjCostToNm.setValue("");
                totalCostToNm.setValue("");
            }
        }
    });
});