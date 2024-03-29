sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "nauticalfe/utils/bufferedEventHandler"

  ],
  function (Controller, History, Fragment, MessageToast, MessageBox, bufferedEventHandler) {
    "use strict";
    let aSelectedIds = [];
    let copyFlag = false;
    let editFlag = false;
    let newEntryFlag = false;

    let onEditInput = undefined;


    let oView;


    let inputFieldObj = {};
    let saveObj = {};
    let cancelObj = {}

    return Controller.extend("nauticalfe.controller.UOMMaster", {

      onInit: function () {
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);
        this.initSearchField();

      },
      initSearchField: function () {
        var searchField = this.byId('UOMCode');
        bufferedEventHandler.bufferEvents(
          // event provider
          searchField,
          // timeInterval
          1000,
          // eventId
          'liveChange',
          // data
          null,
          // handler
          this.onCodeLiveChange,
          // listener
          this,
          // progressHandler
          null,
          // progressUpdateInterval
          null
        );
      },
      onCodeLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Check if the input field is for cost code
        if (oInput.getId() === this.getView().createId("UOMCode")) {
          // Remove non-numeric characters
          var sNewValue = sValue.replace(/\D/g, '');

          // Validate the length of the number
          if (sNewValue.length !== 3) {
            // If not exactly 4 digits, show an error message and reset the value
            sap.m.MessageToast.show("Cost code should be a three-digit number.");
          } else {
            // Update the input field value
            oInput.setValue(sNewValue);
          }
        }
      },
      onCodeLiveChange1: function (oEvent) {
        debugger;
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();
        var sId = oInput.getId();

        // Check if the input field is for 'Carcd'
        if (sId !== this.getView().createId("UOMCode")) {
          // Check if the length of the entered value is greater than 4
          if (sValue.length !== 3) {
            // If the length exceeds 4 characters, truncate it
            var sNewValue = sValue.slice(0, 3);
            oInput.setValue(sNewValue);
            // Show an error message to the user
            sap.m.MessageToast.show("Maximum length for 'Code is 4 characters.");
          }
        }

        // Check if the input field is for 'Cardes'
        if (sId === this.getView().createId("UOMCodeDesc")) {
          // Check if the length of the entered value is greater than 35
          if (sValue.length > 35) {
            // If the length exceeds 35 characters, truncate it
            var sNewValue = sValue.slice(0, 35);
            oInput.setValue(sNewValue);
            // Show an error message to the user
            sap.m.MessageToast.show("Maximum length for 'Description' is 35 characters.");
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
        else if (aSelectedIds.length && !newEntryFlag && !copyFlag && !editFlag) {
          oRouter.navTo("RouteMasterDashboard");
          this.byId('createTypeTable').removeSelections();

        }
        else if (copyFlag) {
          // Get the values from the view
          let voyCode = this.getView().byId("UOMCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("UOMCodeDesc").getValue().trim();
          let changesMade = false;

          // Check if any changes have been made
          for (let i = 0; i < aSelectedIds.length; i++) {
            let originalVoyCode = aSelectedIds[i][0];
            let originalVoyCodeDesc = aSelectedIds[i][1];
            if (voyCode !== originalVoyCode || voyCodeDesc !== originalVoyCodeDesc) {
              changesMade = true;
              break;
            }
          }

          // If no changes have been made, reset the view to its initial state
          if (!changesMade) {
            this.resetView();
          } else {
            // Prompt the user for confirmation only if changes have been made
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // If user clicks OK, reset the view to its initial state
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
                  // If user clicks Cancel, do nothing
                }
              }
            }
            );
          }
        }


        else if (newEntryFlag) {
          let voyCode = this.getView().byId("UOMCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("UOMCodeDesc").getValue().trim();
          if (voyCode == "" && voyCodeDesc == "") {
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

                  oEntryTable.setVisible(false);
                  // Clear input fields of the first row
                  oEntryTable.getItems()[0].getCells()[0].setValue("");
                  oEntryTable.getItems()[0].getCells()[1].setValue("");

                  // Remove items except the first row
                  var items = oEntryTable.getItems();
                  for (var i = items.length - 1; i > 0; i--) {
                    oEntryTable.removeItem(items[i]);
                  }
                  // If user clicks OK, reset the view to its initial state
                  that.resetView();
                } else {
                  // If user clicks Cancel, do nothing
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
      // for more fragment

      onPress: function () {

        var oView = this.getView(),
          oButton = oView.byId("button");

        if (!this._oMenuFragment) {

          this._oMenuFragment = Fragment.load({
            name: "nauticalfe.fragments.MastOptionsDropDown",
            id: oView.getId(),
            controller: this
          }).then(function (oMenu) {
            oMenu.openBy(oButton);
            this._oMenuFragment = oMenu;
            return this._oMenuFragment;
          }.bind(this));
        }
        else {
          this._oMenuFragment.openBy(oButton);
        }
      },
      onPressHome: function () {
        const that = this;
        var oEntryTable = that.getView().byId("entryTypeTable");
        const oRouter = this.getOwnerComponent().getRouter();
        if (aSelectedIds.length === 0 && !newEntryFlag) {

          // If no items have been selected, navigate to "RouteMasterDashboard"
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");

        }
        else if (copyFlag) {
          // Get the values from the view
          let voyCode = this.getView().byId("UOMCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("UOMCodeDesc").getValue().trim();
          let changesMade = false;

          // Check if any changes have been made
          for (let i = 0; i < aSelectedIds.length; i++) {
            let originalVoyCode = aSelectedIds[i][0];
            let originalVoyCodeDesc = aSelectedIds[i][1];
            if (voyCode !== originalVoyCode || voyCodeDesc !== originalVoyCodeDesc) {
              changesMade = true;
              break;
            }
          }

          // If no changes have been made, reset the view to its initial state
          if (!changesMade) {
            this.resetView();
          } else {
            // Prompt the user for confirmation only if changes have been made
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // If user clicks OK, reset the view to its initial state
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
                  // If user clicks Cancel, do nothing
                }
              }
            }
            );
          }
        }
        else if (aSelectedIds.length && !newEntryFlag && !copyFlag && !editFlag) {
          oRouter.navTo("RouteHome");
          this.byId("createTypeTable").removeSelections();
        }
        else if (newEntryFlag) {
          let voyCode = this.getView().byId("UOMCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("UOMCodeDesc").getValue().trim();
          if (voyCode == "" && voyCodeDesc == "") {

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
                  // If user clicks Cancel, do nothing
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


      selectedItems: function (oEvent) {
        // console.log("hello");
        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();


        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {

          // console.log(oSelectedItem.getBindingContext());

          if (oSelectedItem.getBindingContext()) {

            let cells = oSelectedItem.getCells();
            console.log(cells);

            return [oSelectedItem.getBindingContext().getProperty("Uom"), oSelectedItem.getBindingContext().getProperty("Uomdes")]

          } else {

          }

        });
        console.log(aSelectedIds);
        // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
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
          var sValue = oBindingContext.getProperty("Uom");
          var sDescription = oBindingContext.getProperty("Uomdes");
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
          let sValue = oContext.getProperty("Uom");
          let sDesc = oContext.getProperty("Uomdes");

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

      onPatchSent: function (ev) {
        sap.m.MessageToast.show("Updating..")
      },
      onPatchCompleted: function (ev) {
        let oView = this.getView();
        let isSuccess = ev.getParameter('success');
        if (isSuccess) {

          sap.m.MessageToast.show("Successfully Updated.");

          this.resetView();
          setTimeout(() => {

            oView.getModel().refresh();
          }, 1000);

          saveObj.setVisible(false);
          cancelObj.setVisible(false);
          inputFieldObj.setEditable(false);

        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
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



      onSave: function () {
        var that = this;
        var oTable = that.byId("entryTypeTable");
        var totalEntries = oTable.getItems().length;
        var entriesProcessed = 0;
        var errors = [];

        sap.m.MessageToast.show("Creating entries...");

        oTable.getItems().forEach(function (row) {
          var value1 = row.getCells()[0].getValue().toUpperCase(); // Convert to lowercase
          var value2 = row.getCells()[1].getValue();

          if (!value1 || !value2) {
            errors.push("Please enter both fields for all rows.");
            entriesProcessed++;
            checkCompletion();
            return;
          }

          var oBindListSP = that.getView().getModel().bindList("/CargoUnitSet");
          oBindListSP.attachEventOnce("dataReceived", function () {
            var existingEntries = oBindListSP.getContexts().map(function (context) {
              return context.getProperty("Uom").toUpperCase(); // Convert to lowercase
            });

            if (existingEntries.includes(value1)) {
              errors.push("Entry already exists with the same code: " + value1);
            }

            entriesProcessed++;
            checkCompletion();
          });

          oBindListSP.getContexts();
        });

        function checkCompletion() {
          if (entriesProcessed === totalEntries) {
            if (errors.length === 0) {
              createEntries();
            } else {
              sap.m.MessageToast.show("Errors occurred while saving entries.");
              errors.forEach(function (error) {
                sap.m.MessageToast.show(error);
              });
            }
          }
        }

        function createEntries() {
          oTable.getItems().forEach(function (row) {
            var value1 = row.getCells()[0].getValue();
            var value2 = row.getCells()[1].getValue();

            // Format Uomdes value
            var formattedUomdes = that.formatUomdes(value2);

            var oBindListSP = that.getView().getModel().bindList("/CargoUnitSet");

            try {
              oBindListSP.create({
                Uom: value1,
                Uomdes: formattedUomdes
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


      // Function to format Uomdes
      formatUomdes: function (uomdes) {
        return uomdes.toLowerCase().replace(/\b\w/g, function (char) {
          return char.toUpperCase();
        });
      },



      onCancel: function () {
        // checking if edit section
        if (editFlag) {
          this.onCancelEdit();

          // checking if new Entry section
        } else if (newEntryFlag) {
          this.onCancelCopyOrEntry();

          // checking if copy
        } else if (copyFlag) {
          this.onCancelCopyOrEntry();
        }

      },

    
      onUpdate: function () {
              let oView = this.getView();
              let oCreateTable = oView.byId("createTypeTable");
              let oUpdateTable = oView.byId("updateTypeTable");
       
              // Get all items from the updateTypeTable
              let aItems = oUpdateTable.getItems();
       
       
              // Iterate over the items to update the corresponding item in the createTypeTable
              aItems.forEach(function (oItem) {
                let sValue = oItem.getCells()[0].getText(); // Assuming Value is in the first cell
                let sDesc = oItem.getCells()[1].getValue(); // Assuming Field Description is in the second cell
                // console.log("DESC ", sDesc, sDesc.replace(/\s+/g, " ").trim());
       
       
                // Find the corresponding item in the createTypeTable
                let oCreateItem = oCreateTable.getItems().find(function (oCreateItem) {
                  return oCreateItem.getCells()[0].getText() === sValue; // Assuming Value is in the first cell
                });
       
                // Update the corresponding item in the createTypeTable
                if (oCreateItem) {
                  oCreateItem.getCells()[1].setText(sDesc.replace(/\s+/g, " ").trim()); // Assuming Field Description is in the second cell
                }
              });
             
              // Show the createTypeTable
              oCreateTable.setVisible(true).removeSelections();
             
              // let oModel = this.getView().getModel();
              // oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
       
              // let oBindList = oModel.bindList("/ClassMasterSet", {
              //   $$updateGroupId: "update"
              // });
       
       
              // oBindList.attachPatchSent(this.onPatchSent, this);
              // oBindList.attachPatchCompleted(this.onPatchCompleted, this);
       
              // Hide the updateTypeTable
              oUpdateTable.setVisible(false);
       
              // Hide the footer for the updateTypeTable
              // oView.byId("mainPageFooter2").setVisible(false);
       
              // Enable other buttons
              // oView.byId("deleteBtn").setEnabled(true);
              // oView.byId("copyBtn").setEnabled(true);
              // oView.byId("entryBtn").setEnabled(true);
       
              // Clear the updateTypeTable after updating the createTypeTable
             
              this.onPatchSent();
              setTimeout(() => {
                this.resetView();
                oUpdateTable.removeAllItems();
                this.onPatchCompleted({getParameter: () => ({success: true})});
               
               
              }, 1500);
             
             
       
              // oModel.submitBatch("update");
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




      onCancelCopyOrEntry1: function () {
        var oEntryTable = this.getView().byId("entryTypeTable");
        const that = this;

        let voyCode = this.getView().byId("UOMCode").getValue().trim();
        let voyCodeDesc = this.getView().byId("UOMCodeDesc").getValue().trim();

        // Check if there are any changes made
        if (voyCode !== "" || voyCodeDesc !== "") {

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

        } else {
          // If no changes made, simply reset the view
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
      },
      
   onCancelCopyOrEntry: function () {
      var oEntryTable = this.getView().byId("entryTypeTable");
      const that = this;
 
      let voyCode = this.getView().byId("UOMCode").getValue().trim();
      let voyCodeDesc = this.getView().byId("UOMCodeDesc").getValue().trim();
 
      // Check if there are any changes made
      if (voyCode !== "" || voyCodeDesc !== "") {
   
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
       
      } else {
          // If no changes made, simply reset the view
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
  },




      resetView: function () {
        // Reset view to initial state
        this.getView().byId("updateTypeTable").setVisible(false);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("mainPageFooter2").setVisible(false);
        aSelectedIds = [];
        editFlag = false;
        copyFlag = false;
        newEntryFlag = false;
        this.getView().byId("createTypeTable").setVisible(true).removeSelections();
        this.getView().byId("UOMCode1").setText("");
        this.getView().byId("UOMCodeDesc1").setValue("");
        this.getView().byId("UOMCode").setValue("");
        this.getView().byId("UOMCodeDesc").setValue("");
        this.getView().byId("editBtn").setEnabled(true);
        this.getView().byId("deleteBtn").setEnabled(true);
        this.getView().byId("copyBtn").setEnabled(true);
        this.getView().byId("entryBtn").setEnabled(true);
        this.byId("createTypeTable").setMode("MultiSelect");
      },

      onDeletePress: function () {

        let oTable = this.byId("createTypeTable");
        let aItems = oTable.getSelectedItems();
        if (!aItems.length) {

          MessageToast.show("Please Select  Items ");
          return;
        }

        const that = this;  // creatinh reference for use in Dialog
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

      deleteSelectedItems: function (aItems) {

        aItems.forEach(function (oItem) {
          const oContext = oItem.getBindingContext();
          oContext.delete().then(function () {
            // Successful deletion
            MessageToast.show("Record deleted sucessfully");

            console.log("Succesfully Deleted");
            aSelectedIds = []
          }).catch(function (oError) {
            // Handle deletion error
            MessageBox.error("Error deleting item: " + oError.message);
          });
        });
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