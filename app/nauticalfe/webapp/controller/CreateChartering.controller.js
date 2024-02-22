
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function( BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.CreateChartering", {
        onInit() {
         
        },
        onBackPress: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteTransactionDashboard");
        },

        handleNav: function(evt) {
          var navCon = this.byId("navCon");
          var target = evt.getSource().data("target");
            if (target) {
                var animation = this.byId("animationSelect").getSelectedKey();
                navCon.to(this.byId(target), animation);
            } else {
                navCon.back();
            }
        },
        navigateToPanel: function(panelId) {
            var navCon = this.byId("navCon2");
            navCon.to(this.byId(panelId));
        }, 
        populateInputField: function (inputField, selectedValue) {
        inputField.setValue(selectedValue);
        },
        // for dialog open
        showValueHelpPurchaseOrgDialog: function (oEvent) {
            let oData = oEvent.getSource();
            var oDialog = new sap.m.Dialog({
              title: "Charter Purchase Organization(1)",
              contentWidth: "40%",
              contentHeight: "35%",
              content: new sap.m.Table({
                mode: sap.m.ListMode.SingleSelectMaster,
    
                columns: [
                  new sap.m.Column({
                    header: new sap.m.Text({ text: "Pur.Org" }),
                  }),
                  new sap.m.Column({
                    header: new sap.m.Text({ text: "Pur.Org.Description" }),
                  }),
                ],
    
                selectionChange: function (oEvent) {
                  var oSelectedItem = oEvent.getParameter("listItem");
                  var oSelectedValue = oSelectedItem.getCells()[0].getText();
                  var inputVoyageType = this.getView().byId(oData.getId()); // Input field for Voyage Type
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
                  new sap.m.Text({ text: "{}" }),
                  new sap.m.Text({ text: "{}" }),
                ],
              }),
            });
            // Bind the dialog to the view
            this.getView().addDependent(oDialog);
    
            // Open the dialog
            oDialog.open();
        },
        showValueHelpPurchaseGrpDialog: function (oEvent) {
            let oData = oEvent.getSource();
            var oDialog = new sap.m.Dialog({
            title: "Charter Purchase Group(1)",
            contentWidth: "40%",
            contentHeight: "35%",
            content: new sap.m.Table({
                mode: sap.m.ListMode.SingleSelectMaster,
    
                columns: [
                new sap.m.Column({
                    header: new sap.m.Text({ text: "PGr" }),
                }),
                new sap.m.Column({
                    header: new sap.m.Text({ text: "Description" }),
                }),
                ],
    
                selectionChange: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("listItem");
                var oSelectedValue = oSelectedItem.getCells()[0].getText();
                var inputVoyageType = this.getView().byId(oData.getId()); // Input field for Voyage Type
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
                new sap.m.Text({ text: "{}" }),
                new sap.m.Text({ text: "{}" }),
                ],
            }),
            });
            // Bind the dialog to the view
            this.getView().addDependent(oDialog);
    
            // Open the dialog
            oDialog.open();
        },
        showValueHelpPaymentTermsDialog: function (oEvent) {
            let oData = oEvent.getSource();
            var oDialog = new sap.m.Dialog({
            title: "Charter Purchase Group(1)",
            contentWidth: "40%",
            contentHeight: "35%",
            content: new sap.m.Table({
                mode: sap.m.ListMode.SingleSelectMaster,
    
                columns: [
                new sap.m.Column({
                    header: new sap.m.Text({ text: "PGr" }),
                }),
                new sap.m.Column({
                    header: new sap.m.Text({ text: "Description" }),
                }),
                ],
    
                selectionChange: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("listItem");
                var oSelectedValue = oSelectedItem.getCells()[0].getText();
                var inputVoyageType = this.getView().byId(oData.getId()); // Input field for Voyage Type
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
                new sap.m.Text({ text: "{}" }),
                new sap.m.Text({ text: "{}" }),
                ],
            }),
            });
            // Bind the dialog to the view
            this.getView().addDependent(oDialog);
    
            // Open the dialog
            oDialog.open();
        },
       
  
  
  
  
  
       
      
        
      });
    }
  );