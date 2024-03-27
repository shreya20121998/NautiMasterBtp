
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

      onAddRow1: function() {
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
      
      onDeleteRow1: function() {
        var oTable = this.byId("entryTypeTable");
        var aSelectedItems = oTable.getSelectedItems();
      
        // Remove selected rows
        aSelectedItems.forEach(function(oSelectedItem) {
          oTable.removeItem(oSelectedItem);
        });
      
        // Clear selection after deletion
        oTable.removeSelections();
      },

      onPressMore: function () {

        var oView = oView,
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
      pressEdit: function () {

        if (editFlag) {
          MessageToast.show("Already in edit mode");
          return

        }

        if (aSelectedIds.length) {
          if (aSelectedIds.length > 1) {
            MessageToast.show("Please select one Item.");
            return
          }
        } else {
          MessageToast.show("Please select an Item.");
          return;
        }
        editFlag = true;

        this.byId("createTypeTable").setMode("SingleSelectMaster");

        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();

        let cells = aSelectedItems[0].getCells();
        inputFieldObj = cells[1].getAggregation('items')[0].setEditable(true);
        saveObj = cells[1].getAggregation('items')[1].setVisible(true);
        cancelObj = cells[1].getAggregation('items')[2].setVisible(true);
  

        inputFieldObj.setEditable(true);
        saveObj.setVisible(true);
        inputFieldObj.setEditable(true);

        oView.byId("deleteBtn").setEnabled(false);
        oView.byId("copyBtn").setEnabled(false);
        oView.byId("entryBtn").setEnabled(false);

      },

      newEntries: function () {
        newEntryFlag = true;

        if (copyFlag || editFlag) {
          return
        }
        let selectedItem = this.byId("createTypeTable").getSelectedItems();
        if (selectedItem.length == 0) {

          oView.byId("createTypeTable").setVisible(false)
          oView.byId("entryTypeTable").setVisible(true)
          oView.byId("mainPageFooter").setVisible(true)
          oView.byId("editBtn").setEnabled(false);
          oView.byId("deleteBtn").setEnabled(false);
          oView.byId("copyBtn").setEnabled(false);


        } else {
          MessageToast.show("Unselect the Selected Row !")
        }


      },

      // function for home button press
      onPressHome: function () {

        const that = this;
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
            setTimeout(()=>{

              that.resetView();
            },1500);

          } else {
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {

                  // If user clicks OK, navigate to home screen
                  const oRouter = that.getOwnerComponent().getRouter();
                  oRouter.navTo("RouteHome");
                  setTimeout(()=>{

                    that.resetView();
                  },1500);

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
            setTimeout(()=>{

              that.resetView();
            },1500);

          } else {
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {

                  // If user clicks OK, reset the view to its initial state
                  const oRouter = that.getOwnerComponent().getRouter();
                  oRouter.navTo("RouteHome");
                  setTimeout(()=>{

                    that.resetView();
                  },1500);
                } else {
                  //  continue...
                }
              }
            }
            );

          }

        } else if (editFlag) {

          let desc = aSelectedIds[0][1];
          let originalDesc = inputFieldObj.getValue();
          // console.log(originalDesc, originalDesc.trim());

          if (desc === originalDesc) {

            that.onCancelPressBtn();
            oRouter.navTo("RouteHome");
            setTimeout(()=>{

              that.resetView();
            },1500);

          } else {

            let oTable = this.byId("createTypeTable");
            let aSelectedItems = oTable.getSelectedItems();

            let cells = aSelectedItems[0].getCells();
            // let valueEdited = cells[1].getAggregation('items')[0].getProperty("value").trim();
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {

              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {

                  // If user clicks OK, discard changes and reset view

                  cells[1].getAggregation('items')[0].setProperty("value", aSelectedIds[0][1]);
                  that.getView().getModel().refresh();
                  inputFieldObj.setEditable(false);
                  saveObj.setVisible(false);
                  cancelObj.setVisible(false);
                  
                  oRouter.navTo("RouteHome");
                  setTimeout(()=>{

                    that.resetView();
                  },1500);

                }
              }
            }
            )
          }

        }
      },
      onBackPress: function () {

        const that = this;
        const oRouter = this.getOwnerComponent().getRouter();

        // Check if any items have been selected
        if (aSelectedIds.length === 0 && !newEntryFlag) {

          // If no items have been selected, navigate to "RouteMasterDashboard"
          oRouter.navTo("RouteMasterDashboard");
        }
        else if (aSelectedIds.length && !newEntryFlag && !copyFlag && !editFlag) {

          oRouter.navTo("RouteMasterDashboard");
          this.byId('createTypeTable').removeSelections();

        } else if (copyFlag) {

          // Get the values from the view
          let classCode = oView.byId("CLASSFIELD").getValue().trim();
          console.log(classCode);
          let classCodeDesc = oView.byId("CLASSDESC").getValue().trim();
          let originalclassCode = aSelectedIds[0][0];
          let originalclassCodeDesc = aSelectedIds[0][1];

          // Check if the values are unchanged
          if (classCode === originalclassCode && classCodeDesc === originalclassCodeDesc) {

            // If no changes have been made, reset the view to its initial state
            this.resetView();
          }
          // If changes have been made, prompt the user for confirmation
          else {
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {

                // If  OK, reset the view to its initial state
                  that.resetView();
                } else {
                  // If  Cancel press, do nothing..
                }
              }
            }
            );
          }
        } else if (newEntryFlag) {

          let classCode = oView.byId("CLASSFIELD").getValue().trim();
          let classCodeDesc = oView.byId("CLASSDESC").getValue().trim();

          if (classCode == "" && classCodeDesc == "") {
            this.resetView();
          } else {
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {
                  //  reset the view to its initial state
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

          let desc = aSelectedIds[0][1];
          let originalDesc = inputFieldObj.getValue();
          console.log(originalDesc, originalDesc.trim());

          if (desc === originalDesc) {

            that.onCancelPressBtn();
            that.resetView();

          } else {
            let oTable = this.byId("createTypeTable");
            let aSelectedItems = oTable.getSelectedItems();
            let cells = aSelectedItems[0].getCells();
            // let valueEdited = cells[1].getAggregation('items')[0].getProperty("value").trim();

            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {

                  // If OK, discard changes and reset view

                  cells[1].getAggregation('items')[0].setProperty("value", aSelectedIds[0][1]);
                  that.getView().getModel().refresh();
                  inputFieldObj.setEditable(false);
                  saveObj.setVisible(false);
                  cancelObj.setVisible(false);
                  that.resetView();
                  

                }
              }
             }
            )
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
      onCancelPressBtn: function () {

        let that = this;
        console.log("cancel Clciked");
        let description = aSelectedIds[0][1];

        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();

        let cells = aSelectedItems[0].getCells();
        let valueEdited = cells[1].getAggregation('items')[0].getProperty("value").trim();

        if (valueEdited === description) {

          inputFieldObj.setEditable(false);
          saveObj.setVisible(false);
          cancelObj.setVisible(false);
          this.resetView();
          return;

        } else {
          sap.m.MessageBox.confirm(

            "Do you want to discard the changes?", {
            title: "Confirmation",

            onClose: function (oAction) {

              if (oAction === sap.m.MessageBox.Action.OK) {

                // If user clicks OK, discard changes and reset view

                cells[1].getAggregation('items')[0].setProperty("value", description);
                that.getView().getModel().refresh();
                inputFieldObj.setEditable(false);
                saveObj.setVisible(false);
                cancelObj.setVisible(false);
                that.resetView();
              }
            }
          }
          )
        }

        if (valueEdited == "") {

          MessageToast.show("Please Enter Description.");       return;

        }
      },

      onPatchSent: function (ev) {

        sap.m.MessageToast.show("Updating..")

      },

      onPatchCompleted: function (ev) {

        let isSuccess = ev.getParameter('success');
        if (isSuccess) {

          sap.m.MessageToast.show("Successfully Updated.");
          oView.getModel().refresh();
          this.resetView();

          saveObj.setVisible(false);
          cancelObj.setVisible(false);
          inputFieldObj.setEditable(false);

        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
      },

      // updating the entry
      onUpdatePressBtn: function () {

        let code = aSelectedIds[0][0];
        let description = aSelectedIds[0][1];
      
        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();

        let cells = aSelectedItems[0].getCells();
        let valueEdited = cells[1].getAggregation('items')[0].getProperty("value").trim();
        
        if (valueEdited == description) {

          MessageToast.show("nothing to update "); return;

        }

        if (valueEdited == "") {
          MessageToast.show("Please Enter Description."); return
        }

        let UpData = {
          ZfValue: code,
          ZfDesc: valueEdited

        };
        // console.log(data);

        let oModel = oView.getModel();
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

        let oBindList = oModel.bindList("/ClassMasterSet", {
          $$updateGroupId: "update"
        });

        oBindList.attachPatchSent(this.onPatchSent, this);
        oBindList.attachPatchCompleted(this.onPatchCompleted, this);

        let oFilter = new sap.ui.model.Filter("ZfValue", sap.ui.model.FilterOperator.EQ, UpData.ZfValue);
        oBindList.filter(oFilter);

        let that = this;

        oBindList.requestContexts().then(function (aContexts) {

          if (aContexts.length > 0) {

            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject())
            });

            // console.log("addata", aData);

            let data = aData.filter(item => item.ZfValue == UpData.ZfValue);
            // console.log("fghj", data, UpData.ZfDesc);

            console.log("hello");
            let path = `/ClassMasterSet('${UpData.ZfValue}')`;

            let upContext = aContexts.filter(obj => obj.sPath === path);

            inputFieldObj.setProperty("value", valueEdited.trim());
            that.getView().getModel().refresh();

            upContext[0].setProperty("ZfDesc", UpData.ZfDesc.trim());

          }
        });

        oModel.submitBatch("update");

      },

      
      onCreateSent: function (ev) {

        sap.m.MessageToast.show("Creating..")
        // console.log(ev.getParameter("context")?.getObject())
      },

      onCreateCompleted: function (ev) {

        // console.log("ev", ev);

        let isSuccess = ev.getParameter('success');
        if (isSuccess) {

          sap.m.MessageToast.show("Successfully Created.")
          copyFlag = false;

        } else {
          sap.m.MessageToast.show("Fail to Create.")
        }
      },
      // create function called
      onSave: function () {

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
      
       onCancelEdit: function () {
        const that = this;
        let updatedValue = this.byId("CLASSDESC1").getValue().trim();
        let selectedEntryDesc = aSelectedIds[0][1];
        
        if (selectedEntryDesc === updatedValue) {
          
          that.resetView();

        } else {

          sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
            MessageBox.confirm(
              "Do you want to discard the changes ?", {
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
        onCancelCopyOrEntry: function () {
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
        oView.byId("CLASSDESC1").setValue("");
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
       pressCopy: function () {
        
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

       // onUpdateOldCode: function () {
      //   let value1 = aSelectedIds[0][0];
      //   let valueEdited = oView.byId("CLASSDESC1").getValue().trim();

      //   if (valueEdited == "") {
      //     MessageToast.show("Please Enter Description."); return
      //   }

      //   let UpData = {
      //     ZfValue: value1,
      //     ZfDesc: valueEdited

      //   };
      //   // console.log(data);

      //   let oModel = oView.getModel();
      //   let oBindList = oModel.bindList("/ClassMasterSet", {
      //     $$updateGroupId: "update"
      //   });

      //   oBindList.attachPatchSent(this.onPatchSent, this);
      //   oBindList.attachPatchCompleted(this.onPatchCompleted, this);

      //   let oFilter = new sap.ui.model.Filter("ZfValue", sap.ui.model.FilterOperator.EQ, UpData.ZfValue);
      //   oBindList.filter(oFilter);

      //   oBindList.requestContexts().then(function (aContexts) {

      //     if (aContexts.length > 0) {

      //       let aData = [];
      //       aContexts.forEach(context => {
      //         aData.push(context.getObject())

      //       });
      //       console.log("addata", aData);

      //       let data = aData.filter(item => item.ZfValue == UpData.ZfValue);
      //       console.log("fghj", data, UpData.ZfDesc);

      //       if (data[0]?.ZfDesc === UpData.ZfDesc) {

      //         sap.m.MessageToast.show("Nothing to Update, make some changes.")
      //       } else {

      //         let path = `/ClassMasterSet('${UpData.ZfValue}')`;
      //         console.log("acOntexts", aContexts, path);
      //         let upContext = aContexts.filter(obj => obj.sPath === path);
      //         console.log(path, upContext);
      //         upContext[0].setProperty("ZfDesc", UpData.ZfDesc);
      //       }
      //     }
      //   });

      //   oModel.submitBatch("update");
       // },
      
    });

  });