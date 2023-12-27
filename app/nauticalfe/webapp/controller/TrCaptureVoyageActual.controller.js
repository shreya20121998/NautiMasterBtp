
sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function( BaseController) {
    "use strict";

    return BaseController.extend("nauticalfe.controller.TrCaptureVoyageActual", {
      onInit() {
        var hideButton = this.byId("Hide");
        var hideButton1 = this.byId("Hide1");
        if (hideButton) {
              hideButton.attachPress(this.toggleNavContainer.bind(this));
        }
        if (hideButton1) {
          hideButton1.attachPress(this.toggleBarAndNavContainer.bind(this));
      }
        

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
    //  for navigation of nav container 2 
      handleNavToPanelA: function() {
      this.navigateToPanel("panelA");
     },

     handleNavToPanelB: function() {
      this.navigateToPanel("panelB");
    },

    navigateToPanel: function(panelId) {
        var navCon = this.byId("navCon2");
        navCon.to(this.byId(panelId));
    }, 
      
      
       // for visiblity of nav container 1
        toggleNavContainer: function() {
          var navCon = this.byId("navCon");
          var bar = this.byId("HBox10");
          // Get the current visibility state of the NavContainer
          var currentVisibility = navCon.getVisible();
          
          // Toggle the visibility state
          navCon.setVisible(!currentVisibility);
          bar.setVisible(!currentVisibility);
          

        },
        // for visiblity of nav container 2
        toggleBarAndNavContainer: function() {
          var navCon2 = this.byId("navCon2");
          var bar2 = this.byId("HBox20");
          var currentVisibility = navCon2.getVisible();

          navCon2.setVisible(!currentVisibility);
          bar2.setVisible(!currentVisibility);
      },
      populateInputField: function (inputField, selectedValue) {
        inputField.setValue(selectedValue);
      },
      // for dialog open
      showValueHelpDialogCurr: function (oEvent) {
        let oData = oEvent.getSource();
        console.log(oData);
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
      showValueHelpDialogCost: function (oEvent) {
        let oData = oEvent.getSource();
        console.log(oData);
        // Create a dialog
        console.log("clicked Currency type");
        var oDialog = new sap.m.Dialog({
          title: "Select: Cost Types",
          contentWidth: "60%",
          contentHeight: "60%",
          content: new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,

            columns: [
              new sap.m.Column({
                header: new sap.m.Text({ text: "Cost Code" }),
              }),
              new sap.m.Column({
                header: new sap.m.Text({ text: "Cost Description" }),
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
          path: "/NAVOYGC", // Replace with your entity set
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{COSTCODE}" }),
              new sap.m.Text({ text: "{CSTCODES}" }),
            ],
          }),
        });
        // Bind the dialog to the view
        this.getView().addDependent(oDialog);

        // Open the dialog
        oDialog.open();
      }
  
  
      
    });
  }
);
