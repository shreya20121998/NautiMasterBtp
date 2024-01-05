sap.ui.define([
  "sap/ui/core/mvc/Controller"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";
 
    return Controller.extend("nauticalfe.controller.CreateVoyage", {
      onInit: function () {
        var oView = this.getView();
 
        
      },
      onFreightSimulator: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteFreightSimulator");
      },
      onChangeVoyage: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteTrChangeVoyage");
      },
      populateInputField: function (inputField, selectedValue) {
        inputField.setValue(selectedValue);
      },
      showValueHelpDialog1: function () {
        // Create a dialog
        console.log("clicked voyage");
        var oDialog = new sap.m.Dialog({
          title: "Select: Voyage Types",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
 
            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "Voyage Type" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "Description" }),
              }),
            ],
 
            selectionChange: function (oEvent) {
              var oSelectedItem = oEvent.getParameter("listItem");
              var oSelectedValue = oSelectedItem.getCells()[0].getText();
              var inputVoyageType = this.getView().byId("_IDInput2"); // Input field for Voyage Type
              this.populateInputField(inputVoyageType, oSelectedValue);
              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
            press: function () {
              oDialog.close();
            },
          }),
 
        });
 
        let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
 
        oValueHelpTable.bindItems({
          path: "/VOYTYP", // Replace with your entity set
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{VOYCD}" }),
              new sap.m.Text({ text: "{VOYDES}" }),
            ],
          }),
        });
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);
 
        // Open the dialog
        oDialog.open();
      },
      showValueHelpDialog2: function () {
        // Create a dialog
        console.log("clicked Bidding type");
        var oDialog = new sap.m.Dialog({
          title: "Select: Bidding Types",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
 
            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "Bidding Type" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "Description" }),
              }),
            ],
            items: [
                            new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Text({ text: "TB" }),
                                    new sap.m.Text({ text: "2 Bid System" }),
                                ],
                            }),
                            new sap.m.ColumnListItem({
                              cells: [
                                  new sap.m.Text({ text: "SB" }),
                                  new sap.m.Text({ text: "1 Bid System" }),
                              ],
                          }),
 
                        // Add more ColumnListItems as needed
                        ],
 
            selectionChange: function (oEvent) {
              var oSelectedItem = oEvent.getParameter("listItem");
              var oSelectedValue = oSelectedItem.getCells()[0].getText();
              var inputVoyageType = this.getView().byId("_IDInput3"); // Input field for Voyage Type
              this.populateInputField(inputVoyageType, oSelectedValue);
              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
            press: function () {
              oDialog.close();
            },
          }),
 
        });
 
        let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
 
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);
 
        // Open the dialog
        oDialog.open();
      },
      showValueHelpDialog3: function () {
        // Create a dialog
        console.log("clicked Cargo type");
        var oDialog = new sap.m.Dialog({
          title: "Select: Vessel Types",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
 
            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "Vessel Type" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "Description" }),
              }),
            ],
 
            selectionChange: function (oEvent) {
              var oSelectedItem = oEvent.getParameter("listItem");
              var oSelectedValue = oSelectedItem.getCells()[0].getText();
              var inputVoyageType = this.getView().byId("_IDInput4"); // Input field for Voyage Type
              this.populateInputField(inputVoyageType, oSelectedValue);
              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
            press: function () {
              oDialog.close();
            },
          }),
 
        });
 
        let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
 
        oValueHelpTable.bindItems({
          path: "/CARTYP", // Replace with your entity set
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{CARCD}" }),
              new sap.m.Text({ text: "{CARDES}" }),
            ],
          }),
        });
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);
 
        // Open the dialog
        oDialog.open();
      },
      showValueHelpDialog4: function () {
        // Create a dialog
        console.log("clicked Currency type");
        var oDialog = new sap.m.Dialog({
          title: "Select: Vessel Types",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
 
            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "Currency Code" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "Currency Description" }),
              }),
            ],
 
            selectionChange: function (oEvent) {
              var oSelectedItem = oEvent.getParameter("listItem");
              var oSelectedValue = oSelectedItem.getCells()[0].getText();
              var inputVoyageType = this.getView().byId("_IDInput5");
              this.populateInputField(inputVoyageType, oSelectedValue);
              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
            press: function () {
              oDialog.close();
            },
          }),
 
        });
 
        let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
 
        oValueHelpTable.bindItems({
          path: "/CURR", // Replace with your entity set
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{NAVOYCUR}" }),
              new sap.m.Text({ text: "{NAVOYGCURDES}" }),
            ],
          }),
        });
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);
 
        // Open the dialog
        oDialog.open();
      },
     


      onValueHelp: function () {
        // Create a dialog
       
        var oDialog = new sap.m.Dialog({
          title: "Select: Route Between Ports ",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
 
            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "To Port" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "From Port" }),
              }), new sap.m.Column({
                header: new sap.m.Text({ text: "distance" }),
              })
            ],
 
            selectionChange: function (oEvent) {
  var oSelectedItem = oEvent.getParameter("listItem");
  console.log(oSelectedItem);
  
  // Assuming "to_port", "from_port", and "distance" are the properties in your entity set
  var toPort = oSelectedItem.getCells()[0].getText();
  var fromPort = oSelectedItem.getCells()[1].getText();
  var distance = oSelectedItem.getCells()[2].getText();
  
  // Assign values to the respective fields
  var inputToPort = this.getView().byId("portfromorigin");
  var inputFromPort = this.getView().byId("portdestination");
  var inputDistance = this.getView().byId("distancedestination");

  this.populateInputField(inputToPort, toPort);
  this.populateInputField(inputFromPort, fromPort);
  this.populateInputField(inputDistance, distance);

  oDialog.close();
}.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
            press: function () {
              oDialog.close();
            },
          }),
 
        });
 
        let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
 
        oValueHelpTable.bindItems({
          path: "/ZBTP_NAUTICAL_MariDistance", // Replace with your entity set
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{from_port}" }),
              new sap.m.Text({ text: "{to_port}" }),
              new sap.m.Text({ text: "{distance}" })
            ],
          }),
        });
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);
 
        // Open the dialog
        oDialog.open();
      },
 
 
 
 
     
 
      onValueHelp2: function () {
        // Create a dialog
       
        var oDialog = new sap.m.Dialog({
          title: "Select: Unit Of Measerment",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
 
            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "UOM" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "UOMDES" }),
              })
            ],
 
            selectionChange: function (oEvent) {
              var oSelectedItem = oEvent.getParameter("listItem");
              var oSelectedValue = oSelectedItem.getCells()[0].getText();
              var inputVoyageType = this.getView().byId("unitorigin");
              var inputVoyageType1 = this.getView().byId("unitdestination");
              this.populateInputField(inputVoyageType, oSelectedValue);
              this.populateInputField(inputVoyageType1, oSelectedValue);


              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
            press: function () {
              oDialog.close();
            },
          }),
 
        });
 
        let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
 
        oValueHelpTable.bindItems({
          path: "/NAVOYGUOM", // Replace with your entity set
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{UOM}" }),
              new sap.m.Text({ text: "{UOMDES}" }),
             
            ],
          }),
        });
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);
 
        // Open the dialog
        oDialog.open();
      },



      
      calculateVoyage: function () {

        var portfromorigin = this.getView().byId("portfromorigin").getValue();
        var distanceorigin = this.getView().byId("distanceorigin").getValue();
        var weatherorigin = this.getView().byId("weatherorigin").getValue();
        var cargo_sizeorigin = this.getView().byId("cargo_sizeorigin").getValue();
        var unitorigin = this.getView().byId("unitorigin").getValue();
        var speedorigin = this.getView().byId("speedorigin").getValue();
        var sea_daysorigin = this.getView().byId("sea_daysorigin").getValue();
        var portdaysorigin = this.getView().byId("portdaysorigin").getValue();
        
        var arrivaldateorigin = this.getView().byId("arrivaldateorigin").getValue();
        var arrivaltimeorigin = this.getView().byId("arrivaltimeorigin").getValue();
        var departuredateorigin = this.getView().byId("departuredateorigin").getValue();
        var departuretimeorigin = this.getView().byId("departuretimeorigin").getValue();
    
        var portdestination = this.getView().byId("portdestination").getValue();
        var distancedestination = this.getView().byId("distancedestination").getValue();
        var weatherdestination = this.getView().byId("weatherdestination").getValue();
        var cargo_sizedestination = this.getView().byId("cargo_sizedestination").getValue();
        var unitdestination = this.getView().byId("unitdestination").getValue();
        var speeddestination = this.getView().byId("speeddestination").getValue();
        var sea_daysdestination;
        var portdaysdestination = this.getView().byId("portdaysdestination").getValue();
        var arrivaldatedestination = this.getView().byId("arrivaldatedestination").getValue();
        var arrivaltimedestination = this.getView().byId("arrivaltimedestination").getValue();
        var departuredatedestination = this.getView().byId("departuredatedestination").getValue();
        var departuretimedestination = this.getView().byId("departuretimedestination").getValue();
        console.log(portdaysorigin,portdaysdestination, distanceorigin, distancedestination);
    
        var data = {
            portfromorigin: portfromorigin,
            portdestination: portdestination,
            distanceorigin: distanceorigin,
            distancedestination: distancedestination,
            weatherorigin: weatherorigin,
            weatherdestination: weatherdestination,
            cargo_sizeorigin: cargo_sizeorigin,
            cargo_sizedestination: cargo_sizedestination,
            unitorigin: unitorigin,
            unitdestination: unitdestination,
            speedorigin: speedorigin,
            speeddestination: speeddestination,
            sea_daysorigin: sea_daysorigin,
            sea_daysdestination: sea_daysdestination,
            portdaysorigin: portdaysorigin,
            portdaysdestination: portdaysdestination,
            arrivaldateorigin: arrivaldateorigin,
            arrivaldatedestination: arrivaldatedestination,
            arrivaltimeorigin: arrivaltimeorigin,
            arrivaltimedestination: arrivaltimedestination,
            departuredateorigin: departuredateorigin,
            departuredatedestination: departuredatedestination,
            departuretimeorigin: departuretimeorigin,
            departuretimedestination: departuretimedestination
        };
        // console.log(data);
    
        // Calculate Arrival Date and Time at Origin Port
        var arrivaldateorigin = this.calculatearrivaldateorigin(
            data.departuredateorigin,
            data.portdaysorigin
        );
    
        
        // Calculate Overall Total Number of Days
        let updatedvalueSea = this.calculateOverallTotalDays(
          data.distanceorigin,
          data.distancedestination,
          data.portdaysorigin,
          data.portdaysdestination,
          data.speedorigin
          );
          sea_daysdestination = updatedvalueSea;
          data.sea_daysdestination = sea_daysdestination;
          // console.log(sea_daysdestination, data.sea_daysdestination);

          // Calculate Arrival Date and Time at Destination Port(s)

          var arrivaldatedestination = this.calculatearrivaldatedestination(
              data.departuredateorigin,
              data.sea_daysdestination
          );
          this.getView().byId("arrivaltimeorigin").setValue(departuretimeorigin);

          let {hours, minutes} = this.extractTimeFromDay(sea_daysdestination);
          console.log("jjjj--", departuretimeorigin);

          let arrTime = this.addTimeTo12HourFormat('5:00:00 PM', 18, minutes);
          console.log(arrTime, hours, minutes);
     
    
    },
    addTimeTo12HourFormat : function(time, additionalHours, additionalMinutes) {
      console.log(time, typeof time);
      // Split the time into hours, minutes, seconds, and AM/PM
      const [timeStr, ampm] = time.split(' ');
  const [hoursStr, minutesStr, secondsStr] = timeStr.split(':');

  let hours = parseInt(hoursStr, 10);
  let minutes = parseInt(minutesStr, 10);

  // Convert AM/PM to uppercase for consistency
  const isPM = ampm.toUpperCase() === 'PM';

  // Adjust the hours based on AM/PM
  if (isPM && hours !== 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }

  // Add the additional hours and minutes
  hours += additionalHours;
  minutes += additionalMinutes;

  // Adjust hours and minutes if minutes overflow to hours
  hours += Math.floor(minutes / 60);
  minutes %= 60;

  // Calculate days carried over
  const daysCarriedOver = Math.floor(hours / 24);
  hours %= 24;

  // Convert hours back to 12-hour format
  const formattedHours = (hours % 12) || 12;
  const formattedAMPM = hours < 12 ? 'AM' : 'PM';

  // Format the new time
  const newTime = `${formattedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secondsStr} ${formattedAMPM}`;

  return daysCarriedOver > 0
    ? `${daysCarriedOver}, ${newTime}` // Append days carried over
    : newTime;
    },
    
    // Example usage:
    // const initialTime = '04:30:45 PM';
    // const newTime = addTimeTo12HourFormat(initialTime, 2, 15); // Add 2 hours and 15 minutes

    extractTimeFromDay :function (day) {
      // Extract the fractional part from the day
      const fractionalPart = day % 1;
      
      // Convert fractional part to hours and minutes
      const totalHours = Math.floor(fractionalPart * 24);
      const remainingMinutes = Math.round((fractionalPart * 24 - totalHours) * 60);
    
      // Split hours and minutes
      const hours = Math.floor(totalHours);
      const minutes = remainingMinutes;
    
      return {
        hours,
        minutes
      };
    },
    
    calculatearrivaldateorigin: function (departuredateorigin, portdaysorigin) {
        var departureDate = new Date(departuredateorigin);
        var arrivalDateOrigin = new Date(departureDate.getTime() - portdaysorigin * 24 * 60 * 60 * 1000);
        this.getView().byId("arrivaldateorigin").setValue(arrivalDateOrigin.toString().slice(0, 15))
        return arrivalDateOrigin;
    },
    
    
    
    calculateOverallTotalDays: function ( distanceorigin, distancedestination,portdaysorigin,portdaysdestination,speedorigin) {

      console.log(distanceorigin,portdaysorigin,portdaysdestination, speedorigin);
      let sea_daysdestination = ( distancedestination- distanceorigin)/(speedorigin*24);
      
      let  overallTotalDays1 =  parseFloat(portdaysorigin) + parseFloat(portdaysdestination)+parseFloat(sea_daysdestination);
      console.log("helloo",sea_daysdestination,portdaysorigin,portdaysdestination);
      this.getView().byId('totaldays').setValue(overallTotalDays1);
      this.getView().byId('sea_daysdestination').setValue(sea_daysdestination);
      
        
        
        return sea_daysdestination;
    
    },
    calculatearrivaldatedestination: function (departuredateorigin, sea_daysdestination) {
      var departuredate = new Date(departuredateorigin);
      var arrivaldatedestination = new Date(departuredate.getTime() + sea_daysdestination * 24 * 60 * 60 * 1000);
      this.getView().byId('arrivaldatedestination').setValue(arrivaldatedestination.toString().slice(0,15));
      return arrivaldatedestination;
  },
  }) 
  });