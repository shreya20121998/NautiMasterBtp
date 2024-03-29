
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"


  ],
  function (Controller, History, Fragment, MessageToast, MessageBox) {
    "use strict";

    let aSelectedIds = [];
    let copyFlag = false;
    let editFlag = false;
    let onEditInput = undefined;
    let newEntryFlag = false;

    let inputFieldObj = {};
    let saveObj = {};
    let cancelObj = {};
    let oView;

    return Controller.extend("nauticalfe.controller.ClassMaster", {

      onInit: function () {

        oView = this.getView();
        oView.byId("createTypeTable").setVisible(true);
        oView.byId("entryTypeTable").setVisible(false);
        oView.byId("mainPageFooter").setVisible(false);
        oView.byId("updateTypeTable").setVisible(false);


      },
      onAddRow1: function () {
        // let oAddModel = this.getView().getModel("newentrymodel")
        // oAddModel.getData().addData.push(tempAddObj)
        // oAddModel.refresh();
        var oTable = this.byId("entryTypeTable");

        // Create a new row
        var oNewRow = new sap.m.ColumnListItem({
          cells: [
            new sap.m.Input({ value: "" }),
            new sap.m.Input({ value: "" })
          ]
        });

        // Add the new row to the table
        oTable.addItem(oNewRow);
      },

      onDeleteRow1: function () {
        var oTable = this.byId("entryTypeTable");
        var aSelectedItems = oTable.getSelectedItems();

        // Remove selected rows
        aSelectedItems.forEach(function (oSelectedItem) {
          oTable.removeItem(oSelectedItem);
        });

        // Clear selection after deletion
        oTable.removeSelections();
      },
      selectedItems: function (oEvent) {

        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();

        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {

          // console.log(oSelectedItem.getBindingContext());
          if (oSelectedItem.getBindingContext()) {

            let cells = oSelectedItem.getCells();
            // console.log(cells);

            return [oSelectedItem.getBindingContext().getProperty("ZfValue"), oSelectedItem.getBindingContext().getProperty("ZfDesc")]

          } else {

          }

        });
        // console.log(aSelectedIds);

        return aSelectedIds;

      },
      newEntries: function () {
        newEntryFlag = true;

        // Reset copyFlag and editFlag
        copyFlag = false;
        editFlag = false;

        // Clear selected items if any
        this.byId("createTypeTable").removeSelections();

        // Reset input fields and remove additional rows
        var oEntryTable = this.getView().byId("entryTypeTable");
        var items = oEntryTable.getItems();
        for (var i = items.length - 1; i > 0; i--) {
          oEntryTable.removeItem(items[i]);
        }

        // Clear input fields of the first row
        var firstItemCells = items[0].getCells();
        firstItemCells[0].setValue("");
        firstItemCells[1].setValue("");

        // Show entry table and hide create table
        this.getView().byId("createTypeTable").setVisible(false);
        this.getView().byId("entryTypeTable").setVisible(true);
        this.getView().byId("mainPageFooter").setVisible(true);
        this.getView().byId("editBtn").setEnabled(false);
        this.getView().byId("deleteBtn").setEnabled(false);
        this.getView().byId("copyBtn").setEnabled(false);
      },


      // function for home button press
      onPressHome: function () {

        const that = this;
        var oEntryTable = that.getView().byId("entryTypeTable");
        const oRouter = this.getOwnerComponent().getRouter();

        if (aSelectedIds.length === 0 && !newEntryFlag) {

          // If no items have been selected, navigate to "RouteMasterDashboard"
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");

        } else if (copyFlag) {

          let classCode = oView.byId("CLASSFIELD").getValue().trim();
          let classCodeDesc = oView.byId("CLASSDESC").getValue().trim();
          let originalclassCode = aSelectedIds[0][0];
          let originalclassCodeDesc = aSelectedIds[0][1];

          // Check if the values are unchanged
          if (classCode === originalclassCode && classCodeDesc === originalclassCodeDesc) {

            // If no changes then reset the view to initial state
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome");
            setTimeout(() => {

              that.resetView();
            }, 1500);

          } else {
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {

                  // If user clicks OK, navigate to home screen
                  const oRouter = that.getOwnerComponent().getRouter();
                  oRouter.navTo("RouteHome");
                  setTimeout(() => {

                    that.resetView();
                  }, 1500);

                } else {
                  //  continue...
                }
              }
            }
            );
          }

        } else if (aSelectedIds.length && !newEntryFlag && !copyFlag && !editFlag) {

          oRouter.navTo("RouteHome");
          this.byId("createTypeTable").removeSelections();
        }
        else if (newEntryFlag) {

          let classCode = oView.byId("CLASSFIELD").getValue().trim();
          let classCodeDesc = oView.byId("CLASSDESC").getValue().trim();

          if (classCode == "" && classCodeDesc == "") {

            const oRouter = that.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome");
            setTimeout(() => {
              oEntryTable.setVisible(false);
              // Clear input fields of the first row
              oEntryTable.getItems()[0].getCells()[0].setValue("");
              oEntryTable.getItems()[0].getCells()[1].setValue("");

              // Remove items except the first row
              var items = oEntryTable.getItems();
              for (var i = items.length - 1; i > 0; i--) {
                oEntryTable.removeItem(items[i]);
              }

              that.resetView();
            }, 1500);

          } else {
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {

                  // If user clicks OK, reset the view to its initial state
                  const oRouter = that.getOwnerComponent().getRouter();
                  oRouter.navTo("RouteHome");
                  setTimeout(() => {
                    oEntryTable.setVisible(false);
                    // Clear input fields of the first row
                    oEntryTable.getItems()[0].getCells()[0].setValue("");
                    oEntryTable.getItems()[0].getCells()[1].setValue("");

                    // Remove items except the first row
                    var items = oEntryTable.getItems();
                    for (var i = items.length - 1; i > 0; i--) {
                      oEntryTable.removeItem(items[i]);
                    }

                    that.resetView();
                  }, 1500);
                } else {
                  //  continue...
                }
              }
            }
            );

          }

        }
        else if (editFlag) {

          var oTable = this.byId("updateTypeTable"); // Assuming you have the table reference
          var aItems = oTable.getItems();
          let flag = false;
          for (let i = 0; i < aItems.length; i++) {
            var oCells = aItems[i].getCells();
            var oInput = oCells[1]; // Index 1 corresponds to the Input field
            var sValue = oInput.getValue();
            if (onEditInput[i] !== sValue) {
              flag = true;
              break;
            }
          }

          if (flag) {
            sap.m.MessageBox.confirm("Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // Reset the view to its initial state
                  oRouter.navTo("RouteHome");
                  setTimeout(() => {

                    that.resetView();
                  }, 1500);
                }
              }.bind(this) // Ensure access to outer scope
            });
          } else {
            // If no changes have been made, navigate to the initial screen immediately
            oRouter.navTo("RouteHome");
            setTimeout(() => {

              that.resetView();
            }, 1500);

          }
        }
      },
      onBackPress: function () {

        const that = this;
        var oEntryTable = that.getView().byId("entryTypeTable");
        var oupdateTable = that.getView().byId("updateTypeTable");
        const oRouter = this.getOwnerComponent().getRouter();

        // Check if any items have been selected
        if (aSelectedIds.length === 0 && !newEntryFlag) {

          // If no items have been selected, navigate to "RouteMasterDashboard"
          oRouter.navTo("RouteMasterDashboard");
        }
        // else if (aSelectedIds.length && !newEntryFlag && !copyFlag) {

        //   oRouter.navTo("RouteMasterDashboard");
        //   this.byId('createTypeTable').removeSelections();

        // }
        else if (copyFlag) {

          
        }
        
        else if (newEntryFlag) {

          let classCode = oView.byId("CLASSFIELD").getValue().trim();
          let classCodeDesc = oView.byId("CLASSDESC").getValue().trim();

          if (classCode == "" && classCodeDesc == "") {
            oEntryTable.setVisible(false);
            // Clear input fields of the first row
            oEntryTable.getItems()[0].getCells()[0].setValue("");
            oEntryTable.getItems()[0].getCells()[1].setValue("");

            // Remove items except the first row
            var items = oEntryTable.getItems();
            for (var i = items.length - 1; i > 0; i--) {
              oEntryTable.removeItem(items[i]);
            }
            this.resetView();
          } else {
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {
                  //  reset the view to its initial state
                  oEntryTable.setVisible(false);
                  // Clear input fields of the first row
                  oEntryTable.getItems()[0].getCells()[0].setValue("");
                  oEntryTable.getItems()[0].getCells()[1].setValue("");

                  // Remove items except the first row
                  var items = oEntryTable.getItems();
                  for (var i = items.length - 1; i > 0; i--) {
                    oEntryTable.removeItem(items[i]);
                  }
                  that.resetView();
                } else {
                  // on cancel ,continue...
                }
              }
            }
            );

          }
        }
        else if (editFlag) {

          var oTable = this.byId("updateTypeTable"); // Assuming you have the table reference
          var aItems = oTable.getItems();
          let flag = false;
          for (let i = 0; i < aItems.length; i++) {
            var oCells = aItems[i].getCells();
            var oInput = oCells[1]; // Index 1 corresponds to the Input field
            var sValue = oInput.getValue();
            if (onEditInput[i] !== sValue) {
              flag = true;
              break;
            }
          }

          if (flag) {
            sap.m.MessageBox.confirm("Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // Reset the view to its initial state
                  this.resetView();
                }
              }.bind(this) // Ensure access to outer scope
            });
          } else {
            // If no changes have been made, navigate to the initial screen immediately
            this.resetView();

          }
        }

      },

      // validation for CLAss CODE to be Numeric

      onCodeLiveChange1: function (oEvent) {

        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Check if the input field is for cost code

        if (oInput.getId() === oView.createId("CLASSFIELD")) {

          // Validate if the entered value is a number
          if (!(/^\d*$/.test(sValue))) {

            // If not a number, remove the last character
            var sNewValue = sValue.slice(0, -1);
            oInput.setValue(sNewValue);

            // Show an error message to the user
            sap.m.MessageToast.show("Class code should only contain numbers.");
          }
        }
      },


      // onCancelPressBtn: function () {

      //   let that = this;
      //   console.log("cancel Clciked");
      //   let description = aSelectedIds[0][1];

      //   let oTable = this.byId("createTypeTable");
      //   let aSelectedItems = oTable.getSelectedItems();

      //   let cells = aSelectedItems[0].getCells();
      //   let valueEdited = cells[1].getAggregation('items')[0].getProperty("value").trim();

      //   if (valueEdited === description) {

      //     inputFieldObj.setEditable(false);
      //     saveObj.setVisible(false);
      //     cancelObj.setVisible(false);
      //     this.resetView();
      //     return;

      //   } else {
      //     sap.m.MessageBox.confirm(

      //       "Do you want to discard the changes?", {
      //       title: "Confirmation",

      //       onClose: function (oAction) {

      //         if (oAction === sap.m.MessageBox.Action.OK) {

      //           // If user clicks OK, discard changes and reset view

      //           cells[1].getAggregation('items')[0].setProperty("value", description);
      //           that.getView().getModel().refresh();
      //           inputFieldObj.setEditable(false);
      //           saveObj.setVisible(false);
      //           cancelObj.setVisible(false);
      //           that.resetView();
      //         }
      //       }
      //     }
      //     )
      //   }

      //   if (valueEdited == "") {

      //     MessageToast.show("Please Enter Description.");       return;

      //   }
      // },


      onPatchSent: function (ev) {

        sap.m.MessageToast.show("Updating..")

      },

      onPatchCompleted: function (ev) {
        console.log(ev);
        let isSuccess = ev.getParameter('success');

        if (isSuccess) {

          sap.m.MessageToast.show("Successfully Updated.");
          oView.getModel().refresh();
          this.resetView();

          // saveObj.setVisible(false);
          // cancelObj.setVisible(false);
          // inputFieldObj.setEditable(false);

        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
      },


      pressEdit: function () {
        // Get reference to the view
        let oView = this.getView();

        // Get the createTypeTable
        let oCreateTable = oView.byId("createTypeTable");
        var oTable = this.byId("createTypeTable");
        var aSelectedItems = oTable.getSelectedItems();
        onEditInput = [];
        // Iterating over selected items and printing values
        aSelectedItems.forEach(function (oItem) {
          var oBindingContext = oItem.getBindingContext();
          var sValue = oBindingContext.getProperty("ZfValue");
          var sDescription = oBindingContext.getProperty("ZfDesc");
          console.log("desc", sDescription);
          onEditInput.push(sDescription);
        });

        // Get all selected items from the createTypeTable
        // let aSelectedItems = oCreateTable.getSelectedItems();

        // Check if any items are not selected
        if (aSelectedItems.length === 0) {
          sap.m.MessageToast.show("Please select at least one row");
          return;
        }

        editFlag = true;


        // Clear the updateTypeTable before adding new items
        let oUpdateTable = oView.byId("updateTypeTable");
        oUpdateTable.removeAllItems();

        // Iterate over selected items to create new items in the updateTypeTable
        aSelectedItems.forEach(function (oSelectedItem) {
          // Get the selected item's binding context
          let oContext = oSelectedItem.getBindingContext();

          // Get the properties from the context
          let sValue = oContext.getProperty("ZfValue");
          let sDesc = oContext.getProperty("ZfDesc");

          // console.log(sValue, sDesc);

          // Add new item to updateTypeTable
          let oColumnListItem = new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: sValue }),
              new sap.m.Input({ value: sDesc, editable: true })
            ]
          });
          oUpdateTable.addItem(oColumnListItem);
        });



        // Show the updateTypeTable
        oUpdateTable.setVisible(true);

        // Hide the createTypeTable
        oCreateTable.setVisible(false);

        // Show the footer for the updateTypeTable
        oView.byId("mainPageFooter2").setVisible(true);

        // Disable other buttons
        oView.byId("deleteBtn").setEnabled(false);
        oView.byId("copyBtn").setEnabled(false);
        oView.byId("entryBtn").setEnabled(false);
      },

      

      onUpdate: function () {
        let oView = this.getView();
        let oCreateTable = oView.byId("createTypeTable");
        let oUpdateTable = oView.byId("updateTypeTable");
 
        // Get all items from the updateTypeTable
        let aItems = oUpdateTable.getItems();
 
 
        // Iterate over the items to update the corresponding item in the createTypeTable
        aItems.forEach(function (oItem) {
          let sValue = oItem.getCells()[0].getText();
          let sDesc = oItem.getCells()[1].getValue(); 
 
          // Find the corresponding item in the createTypeTable
          let oCreateItem = oCreateTable.getItems().find(function (oCreateItem) {
            return oCreateItem.getCells()[0].getText() === sValue;
          });
 
          // Update the corresponding item in the createTypeTable
          if (oCreateItem) {
            oCreateItem.getCells()[1].setText(sDesc.replace(/\s+/g, " ").trim()); 
          }
        });
       
        // Show the createTypeTable
        oCreateTable.setVisible(true).removeSelections();
 
        // Hide the updateTypeTable
        oUpdateTable.setVisible(false);
 
        this.onPatchSent();

        setTimeout(() => {
          this.resetView();
          oUpdateTable.removeAllItems();
          this.onPatchCompleted({getParameter: () => ({success: true})});
        }, 1500);
       

      },

      
    
    
 





      // onCreateSent: function (ev) {

      //   sap.m.MessageToast.show("Creating..")
      //   // console.log(ev.getParameter("context")?.getObject())
      // },

      // onCreateCompleted: function (ev) {

      //   // console.log("ev", ev);

      //   let isSuccess = ev.getParameter('success');
      //   if (isSuccess) {

      //     sap.m.MessageToast.show("Successfully Created.")
      //     copyFlag = false;

      //   } else {
      //     sap.m.MessageToast.show("Fail to Create.")
      //   }
      // },
      // create function called
      onSave1: function () {

        var that = this;
        var value1 = oView.byId("CLASSFIELD").getValue();
        var valueEdited = oView.byId("CLASSDESC").getValue();

        if (!value1 || !valueEdited) {
          MessageToast.show("Please enter both fields."); return;
        }

        let data = {

          ZfValue: value1,
          ZfDesc: valueEdited
        };

        const oJsonModel = new sap.ui.model.json.JSONModel(data);
        oView.setModel(oJsonModel, "oJsonModel");
        let oModel = oView.getModel();

        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

        let oBindListSP = oModel.bindList("/ClassMasterSet");
        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);

        oBindListSP.attachEventOnce("dataReceived", function () {

          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("ZfValue");
          });

          if (existingEntries.includes(value1)) {
            MessageToast.show("Entry already exists with the same code.");
          } else {

            try {

              oBindListSP.create(data);
              that.getView().getModel().refresh();
              that.resetView();

            } catch (error) {
              MessageToast.show("Error while saving data");
            }
          }
        });
        oBindListSP.getContexts();
      },

      onSave: function () {
        var that = this;
        var oTable = that.byId("entryTypeTable");
        var totalEntries = oTable.getItems().length;
        var entriesProcessed = 0;
        var errors = [];

        sap.m.MessageToast.show("Creating entries...");
        let duplicateEntries = [];
        oTable.getItems().forEach(function (row) {
          var value1 = row.getCells()[0].getValue().toLowerCase();;
          var value2 = row.getCells()[1].getValue();

          if (!value1 || !value2) {
            errors.push("Please enter both fields for all rows.");
            entriesProcessed++;
            checkCompletion();
            return;
          }

          var oBindListSP = that.getView().getModel().bindList("/ClassMasterSet");
          oBindListSP.attachEventOnce("dataReceived", function () {
            var existingEntries = oBindListSP.getContexts().map(function (context) {
              return context.getProperty("ZfValue").toLowerCase();
            });

            if (existingEntries.includes(value1)) {
              // errors.push("Entry already exists with the same code: " + value1);
              duplicateEntries.push(value1)
            }

            entriesProcessed++;
            checkCompletion();
          });

          oBindListSP.getContexts();
        });

        function checkCompletion() {
         
            if (duplicateEntries.length === 0) {
              createEntries();
            } else {
              let errorEntry = duplicateEntries.length === 1 ? "Entry" : "Entries"
              let errorMessage = `${errorEntry} already exist : `
              for(let i = 0; i < duplicateEntries.length - 1; i++){
                errorMessage = errorMessage + " " + duplicateEntries[i] +",";
              }
              errorMessage = errorMessage + " " + duplicateEntries[duplicateEntries.length - 1];
              sap.m.MessageToast.show(errorMessage);
             
            }
        }

        function createEntries() {
          oTable.getItems().forEach(function (row) {
            var value1 = row.getCells()[0].getValue();
            var value2 = row.getCells()[1].getValue();

            // Format ZfDesc value
            var formattedZfDesc = that.formatZfDesc(value2);

            var oBindListSP = that.getView().getModel().bindList("/ClassMasterSet");

            try {
              oBindListSP.create({
                ZfValue: value1,
                ZfDesc: formattedZfDesc
              });
              that.getView().getModel().refresh();
              that.resetView();
            } catch (error) {
              sap.m.MessageToast.show("Error while saving data");
            }
          });

          sap.m.MessageToast.show("All entries saved successfully.");
        }
      },

      // Function to format ZfDesc
      formatZfDesc: function (ZfDesc) {
        return ZfDesc.toLowerCase().replace(/\b\w/g, function (char) {
          return char.toUpperCase();
        });
      },

      onCancel: function () {

        if (editFlag) {

          this.onCancelEdit();
        }
        else if (newEntryFlag) {

          this.onCancelCopyOrEntry();

        } else if (copyFlag) {

          this.onCancelCopyOrEntry();
        }
      },




      onCancelEdit: function () {
        // let classCodeInput = this.getView().byId("CLASSDESC1");

        var oTable = this.byId("updateTypeTable"); // Assuming you have the table reference
        var aItems = oTable.getItems();
        let flag = false;
        for (let i = 0; i < aItems.length; i++) {
          var oCells = aItems[i].getCells();
          var oInput = oCells[1]; // Index 1 corresponds to the Input field
          var sValue = oInput.getValue();
          if (onEditInput[i] !== sValue) {
            flag = true;
            break;
          }
        }

        if (flag) {
          sap.m.MessageBox.confirm("Do you want to discard the changes?", {
            title: "Confirmation",
            onClose: function (oAction) {
              if (oAction === sap.m.MessageBox.Action.OK) {
                // Reset the view to its initial state
                this.resetView();
              }
            }.bind(this) // Ensure access to outer scope
          });
        } else {
          // If no changes have been made, navigate to the initial screen immediately
          this.resetView();

        }



        // aItems.forEach(function (oItem) {
        //   var oCells = oItem.getCells();
        //   // Assuming the Input field is the second cell in the ColumnListItem
        //   var oInput = oCells[1]; // Index 1 corresponds to the Input field
        //   var sValue = oInput.getValue(); // Get the value of the Input field
        //   console.log("Value: " + sValue);
        // });
        // let classCode = classCodeInput.getValue().trim();
        // let classCodeDesc = aSelectedIds[0][1]; // Assuming aSelectedIds is accessible here
        // console.log("classCode ", onEditInput);
        // console.log("classCodeDesc ", classCodeDesc);

        // if (onEditInput !== classCodeDesc) {
        //   sap.m.MessageBox.confirm("Do you want to discard the changes?", {
        //     title: "Confirmation",
        //     onClose: function (oAction) {
        //       if (oAction === sap.m.MessageBox.Action.OK) {
        //         // Reset the view to its initial state
        //         this.resetView();
        //       }
        //     }.bind(this) // Ensure access to outer scope
        //   });
        // } else {
        //   // If no changes have been made, navigate to the initial screen immediately
        //   this.resetView();
        // }



      },
      onCancelCopyOrEntry: function () {
        let selectedEntryCode, selectedEntryDesc;
        var oEntryTable = this.getView().byId("entryTypeTable");
        const that = this;
        let updatedCode = this.byId("CLASSFIELD").getValue();
        let updatedValue = this.byId("CLASSDESC").getValue().trim();

        if (aSelectedIds.length) {

          selectedEntryCode = aSelectedIds[0][0];
          selectedEntryDesc = aSelectedIds[0][1];
        }
        //console.log(selectedEntryCode, selectedEntryDesc, updatedCode, updatedValue);

        if ((updatedCode == "" && updatedValue == "") && newEntryFlag) {
          oEntryTable.setVisible(false);
          // Clear input fields of the first row
          oEntryTable.getItems()[0].getCells()[0].setValue("");
          oEntryTable.getItems()[0].getCells()[1].setValue("");

          // Remove items except the first row
          var items = oEntryTable.getItems();
          for (var i = items.length - 1; i > 0; i--) {
            oEntryTable.removeItem(items[i]);
          }

          that.resetView();

        }
        else if ((selectedEntryDesc === updatedValue && updatedCode === selectedEntryCode) && copyFlag) {
          oEntryTable.setVisible(false);
          // Clear input fields of the first row
          oEntryTable.getItems()[0].getCells()[0].setValue("");
          oEntryTable.getItems()[0].getCells()[1].setValue("");

          // Remove items except the first row
          var items = oEntryTable.getItems();
          for (var i = items.length - 1; i > 0; i--) {
            oEntryTable.removeItem(items[i]);
          }

          that.resetView();

        } else {
          sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
            MessageBox.confirm(
              "Changes were made , do you want to Discard ?", {
              title: "Confirm ",
              onClose: function (oAction) {

                if (oAction === MessageBox.Action.OK) {
                  oEntryTable.setVisible(false);
                  // Clear input fields of the first row
                  oEntryTable.getItems()[0].getCells()[0].setValue("");
                  oEntryTable.getItems()[0].getCells()[1].setValue("");

                  // Remove items except the first row
                  var items = oEntryTable.getItems();
                  for (var i = items.length - 1; i > 0; i--) {
                    oEntryTable.removeItem(items[i]);
                  }
                  that.resetView();

                } else {
                  console.log("continue ..");

                }
              }
            }
            );
          });
        }

      },


      onCancelCopyOrEntry1: function () {
        let selectedEntryCode, selectedEntryDesc;
        const that = this;
        let updatedCode = this.byId("CLASSFIELD").getValue();
        let updatedValue = this.byId("CLASSDESC").getValue().trim();

        if (aSelectedIds.length) {

          selectedEntryCode = aSelectedIds[0][0];
          selectedEntryDesc = aSelectedIds[0][1];
        }
        // console.log(selectedEntryCode, selectedEntryDesc, updatedCode, updatedValue);

        if ((updatedCode == "" && updatedValue == "") && newEntryFlag) {

          that.resetView();

        }
        else if ((selectedEntryDesc === updatedValue && updatedCode === selectedEntryCode) && copyFlag) {

          that.resetView();

        } else {
          sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
            MessageBox.confirm(
              "Changes were made , do you want to Discard ?", {
              title: "Confirm ",
              onClose: function (oAction) {

                if (oAction === MessageBox.Action.OK) {
                  that.resetView();

                } else {
                  console.log("continue ..");

                }
              }
            }
            );
          });
        }
      },

      resetView: function () {

        // Reset view to initial state
        oView.byId("updateTypeTable").setVisible(false);
        oView.byId("entryTypeTable").setVisible(false);
        oView.byId("mainPageFooter").setVisible(false);
        oView.byId("mainPageFooter2").setVisible(false);

        aSelectedIds = [];
        editFlag = false;
        copyFlag = false;
        newEntryFlag = false;

        oView.byId("createTypeTable").setVisible(true).removeSelections();
        oView.byId("CLASSFIELD1").setText("");
        // oView.byId("CLASSDESC1").setValue("");
        oView.byId("CLASSFIELD").setValue("");
        oView.byId("CLASSDESC").setValue("");
        oView.byId("editBtn").setEnabled(true);
        oView.byId("deleteBtn").setEnabled(true);
        oView.byId("copyBtn").setEnabled(true);
        oView.byId("entryBtn").setEnabled(true);
        this.byId("createTypeTable").setMode("MultiSelect");

      },

      onDeletePress: function () {

        let oTable = this.byId("createTypeTable");
        let aItems = oTable.getSelectedItems();
        if (!aItems.length) {

          MessageToast.show("Please Select  Items ");
          return;
        }

        const that = this;  //  reference for controller  use in Dialog
        sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {

          MessageBox.confirm(
            "Are you sure ,you want  to delete ?", {

            title: "Confirm ",
            onClose: function (oAction) {
              if (oAction === MessageBox.Action.OK) {

                that.deleteSelectedItems(aItems);
              } else {

                oTable.removeSelections();
                sap.m.MessageToast.show("Deletion canceled");

              }
            }
          }
          );
        });

      },

      // fn is called by onDeletePress
      deleteSelectedItems: function (aItems) {

        aItems.forEach(function (oItem) {

          const oContext = oItem.getBindingContext();
          oContext.delete().then(function () {

            // Successful deletion
            MessageToast.show("Record deleted sucessfully");
            console.log("Succesfully Deleted");
            aSelectedIds = []   // empty array

          }).catch(function (oError) {

            // Handle deletion error
            MessageBox.error("Error deleting item: " + oError.message);
          });
        });
      },
      // press function called on press
      pressCopy1: function () {

        if (aSelectedIds.length) {

          if (aSelectedIds.length > 1) {
            MessageToast.show("Please select one row");
            return
          }
        } else {

          MessageToast.show("Please select atleast row");
          return;
        }

        copyFlag = true;

        oView.byId("deleteBtn").setEnabled(false);
        oView.byId("editBtn").setEnabled(false);
        oView.byId("entryBtn").setEnabled(false);
        oView.byId("createTypeTable").setVisible(false);

        let code = aSelectedIds[0][0];
        let desc = aSelectedIds[0][1];
        console.log(code, desc);

        oView.byId('entryTypeTable').setVisible(true);
        oView.byId("CLASSFIELD").setValue(code);
        oView.byId("CLASSDESC").setValue(desc);
        oView.byId("mainPageFooter").setVisible(true);

      },
      pressCopy: function () {
 
        
        if (aSelectedIds.length === 0) {
          MessageToast.show("Please select at least one row");
          return
        }
    
      copyFlag = true;

      this.getView().byId("deleteBtn").setEnabled(false);
      this.getView().byId("editBtn").setEnabled(false);
      this.getView().byId("entryBtn").setEnabled(false);
      this.getView().byId("createTypeTable").setVisible(false);
      this.getView().byId('entryTypeTable').setVisible(true);
      this.getView().byId("mainPageFooter").setVisible(true);



     
     
      let entryTable = this.getView().byId("entryTypeTable");
      entryTable.removeAllItems();
      for (let i = 0; i < aSelectedIds.length; i++) {
        let code = aSelectedIds[i][0];
        let desc = aSelectedIds[i][1];

        let newItem = new sap.m.ColumnListItem({
          cells: [
            new sap.m.Input({ value: code }),
            new sap.m.Input({ value: desc })
          ]
        });
        entryTable.addItem(newItem);
      }

    }





    });

  });