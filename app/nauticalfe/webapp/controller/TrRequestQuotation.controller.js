
 
sap.ui.define([

    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
],

    /**

     * @param {typeof sap.ui.core.mvc.Controller} Controller

     */

    function (Controller,Fragment,MessageToast) {

        "use strict";

        return Controller.extend("nauticalfe.controller.TrRequestQuotation", {

          onInit: function () {

          },
          populateInputField: function (inputField, value) {
            inputField.setValue(value);
          },
          onBackPress: function () {
              const oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("TransView");
          },
          onValueHelpCharteringRequest: function (oEvent) {
            let oData = oEvent.getSource();
            console.log(oData);
        
            // Create a dialog
            var oDialog = new sap.m.Dialog({
                title: "Chartering Req No",
                contentWidth: "40%",
                contentHeight: "60%",
                content: new sap.m.Table({
                    mode: sap.m.ListMode.SingleSelectLeft,
        
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Text({ text: "Chart.Req. " }),
                        })
                    ],
        
                    selectionChange: function (oEvent) {
                        // Selection handling moved to the OK button press event
                    },
                }),
                beginButton: new sap.m.Button({
                    text: "OK",
                    type: "Accept",
                    press: function () {
                        var oTable = oDialog.getContent()[0];
                        var oSelectedItem = oTable.getSelectedItem();
        
                        if (oSelectedItem) {
                            var oSelectedValue = oSelectedItem.getCells()[0].getText(); // Adjust index based on your column structure
                            var inputVoyageType = this.getView().byId(oData.getId()); // Input field for Voyage Type
                            this.populateInputField(inputVoyageType, oSelectedValue);
                        }
        
                        oDialog.close();
                    }.bind(this),
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    type: "Reject",
                    press: function () {
                        oDialog.close();
                    },
                }),
            });
        
            let oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element
        
            // Assuming you have an OData service or a JSON model
            // Replace the following line with the actual data fetching logic
            var oModel = new sap.ui.model.json.JSONModel({
                CURR: [
                    { ChartReq: "1002345" },
                    { ChartReq: "1002346" },
                    { ChartReq: "1002347" },
                    { ChartReq: "1002348" },
                    { ChartReq: "1002349" },
                ],
            });
        
            oValueHelpTable.setModel(oModel);
        
            oValueHelpTable.bindItems({
                path: "/CURR",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{ChartReq}" }),
                    ],
                }),
            });
        
            // Bind the dialog to the view
            this.getView().addDependent(oDialog);
        
            // Open the dialog
            oDialog.open();
          },
        
          onSubmitQuotation: function () {
            // Assuming you have fetched the necessary data from your form
            var charteringReqNo = this.getView().byId("_IDGenInput1").getValue();
        
            var biddingStartDate = this.getView().byId("_IDGenDatePicker1").getValue();
          
            var biddingStartTime = this.getView().byId("_IDGenTimePicker1").getValue();
           
            var biddingEndDate = this.getView().byId("_IDGenDatePicker2").getValue();
            var biddingEndTime = this.getView().byId("_IDGenTimePicker2").getValue();
            console.log(charteringReqNo,biddingStartDate,biddingStartTime,biddingEndDate,biddingEndTime);
            // Construct the email body with the form data
            var emailSubject = "Quotation Submission";
            var emailBody = "Chartering Req No: " + charteringReqNo + "\n" +
                            "Bidding Start Date: " + biddingStartDate + "\n" +
                            "Bidding Start Time: " + biddingStartTime + "\n" +
                            "Bidding End Date: " + biddingEndDate + "\n" +
                            "Bidding End Time: " + biddingEndTime;
              $.ajax({
                type: "POST",
                url: "", // Replace with your server-side endpoint
                data: {
                    to: "shreya.shalini@ingenxtec.com",
                    subject: emailSubject,
                    body: emailBody
                },
                success: function (response) {
                    console.log("Email sent successfully. Server response:", response);
                    sap.m.MessageToast.show("Email sent successfully");
                },
                error: function (status, error) {
                    console.error("Error sending email:", status, error);
                }
            });
            // Show a success message in the footer
            var footerMessage = this.getView().byId("footerMessage");
            footerMessage.setText("Email sent successfully");
            footerMessage.setVisible(true);
        
            // Automatically hide the message after 2 seconds
            setTimeout(function () {
                footerMessage.setVisible(false);
            }, 2000);
        
            // Prevent the default behavior of the button click event
            sap.ui.core.UIComponent.getRouterFor(this).attachBypassed(function (oEvent) {
                oEvent.preventDefault();
            });
          },
          
         
        
      
        
        

         
        
         
        
        
        
        

        
        
        
      
        });

});