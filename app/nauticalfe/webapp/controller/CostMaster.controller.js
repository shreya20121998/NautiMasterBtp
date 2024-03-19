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
    let cancelObj = {}
 
 
    return Controller.extend("nauticalfe.controller.CostMaster", {
 
      onInit: function () {
        // console.log("init called");
 
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);
 
 
      },
      onBackPress1: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        if (editFlag || copyFlag || newEntryFlag) {
 
          this.onCancel();
          return
        } else {
          oRouter.navTo("RouteMasterDashboard")
          setTimeout(() => this.onCancel()
            , 1000
          )
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
 
      onBackPressHome1: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        if( newEntryFlag == false  && editFlag == false && copyFlag== false){
 
          oRouter.navTo("RouteHome");
          return
        }
        this.onCancel();
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
 
            return [oSelectedItem.getBindingContext().getProperty("Costcode"), oSelectedItem.getBindingContext().getProperty("Cstcodes")]
 
          } else {
 
          }
 
        });
        // console.log(aSelectedIds);
 
        return aSelectedIds;
 
      },
 
      newEntries: function () {
        newEntryFlag = true;
 
        if (copyFlag || editFlag) {
          return
        }
        let selectedItem = this.byId("createTypeTable").getSelectedItems();
        if (selectedItem.length == 0) {
 
          this.getView().byId("createTypeTable").setVisible(false)
          this.getView().byId("entryTypeTable").setVisible(true)
          this.getView().byId("mainPageFooter").setVisible(true)
          this.getView().byId("editBtn").setEnabled(false);
          this.getView().byId("deleteBtn").setEnabled(false);
          this.getView().byId("copyBtn").setEnabled(false);
 
 
        } else {
          MessageToast.show("Unselect the Selected Row !")
        }
 
 
      },
 
      pressEdit: function () {
 
        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();
 
        let cells = aSelectedItems[0].getCells();
        inputFieldObj = cells[1].getAggregation('items')[0].setEditable(true);
        saveObj = cells[1].getAggregation('items')[1].setVisible(true);
        cancelObj = cells[1].getAggregation('items')[2].setVisible(true);
        inputFieldObj = cells[1].getAggregation('items')[0].setEditable(true);
        inputFieldObj.setEditable(true);
        saveObj.setVisible(true);
        inputFieldObj.setEditable(true);
 
 
 
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
        this.getView().byId("deleteBtn").setEnabled(false);
        this.getView().byId("copyBtn").setEnabled(false);
        this.getView().byId("entryBtn").setEnabled(false);
 
      },
 
      // shreya code testing
      onPressHome: function () {
        const that = this;
        const oRouter = this.getOwnerComponent().getRouter();
        if (aSelectedIds.length === 0 && !newEntryFlag) {
          // If no items have been selected, navigate to "RouteMasterDashboard"
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");
         
        } else if (copyFlag){
          let voyCode = this.getView().byId("costCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("costCodeDesc").getValue().trim();
          let originalVoyCode = aSelectedIds[0][0];
          let originalVoyCodeDesc = aSelectedIds[0][1];
 
          // Check if the values are unchanged
               if (voyCode === originalVoyCode && voyCodeDesc === originalVoyCodeDesc) {
            // If no changes have been made, reset the view to its initial state
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome");
            this.resetView();
             } else {
                sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // If user clicks OK, navigate to home screen
                  const oRouter = that.getOwnerComponent().getRouter();
                  oRouter.navTo("RouteHome");
                  that.resetView(); // Reset view if user clicked OK
                } else {
                  // If user clicks Cancel, do nothing
                }
              }
            }
            );
          }
 
        }else if (aSelectedIds.length && !newEntryFlag && !copyFlag && !editFlag){
          oRouter.navTo("RouteHome");
          this.byId("createTypeTable").removeSelections();
        }
        else if( newEntryFlag){
          let voyCode = this.getView().byId("costCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("costCodeDesc").getValue().trim();
          if (voyCode == "" && voyCodeDesc == "") {
            const oRouter = that.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome");
            that.resetView();
 
          } else {
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // If user clicks OK, reset the view to its initial state
                  const oRouter = that.getOwnerComponent().getRouter();
                  oRouter.navTo("RouteHome");
                  that.resetView();
                } else {
                  // If user clicks Cancel, do nothing
                }
              }
            }
            );
 
          }
 
        }else if(editFlag){
           
   
            let desc = aSelectedIds[0][1];
            let originalDesc = inputFieldObj.getValue();
            console.log(originalDesc, originalDesc.trim());
            if (desc === originalDesc) {
 
              that.onCancelPressBtn();
 
              oRouter.navTo("RouteHome");
              that.resetView();
            } else {
 
              let oTable = this.byId("createTypeTable");
              let aSelectedItems = oTable.getSelectedItems();
 
              let cells = aSelectedItems[0].getCells();
              let value2 = cells[1].getAggregation('items')[0].getProperty("value").trim();
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
                      that.resetView();
                      oRouter.navTo("RouteHome");
 
 
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
           
        }else if(copyFlag){
 
          // Get the values from the view
          let voyCode = this.getView().byId("costCode").getValue().trim();
          console.log(voyCode);
          let voyCodeDesc = this.getView().byId("costCodeDesc").getValue().trim();
          let originalVoyCode = aSelectedIds[0][0];
          let originalVoyCodeDesc = aSelectedIds[0][1];
 
          // Check if the values are unchanged
              if (voyCode === originalVoyCode && voyCodeDesc === originalVoyCodeDesc) {
 
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
                  // If user clicks OK, reset the view to its initial state
                  that.resetView();
                } else {
                  // If user clicks Cancel, do nothing
                }
              }
            }
            );
           }
        } else if(newEntryFlag){
          let voyCode = this.getView().byId("costCode").getValue().trim();
          let voyCodeDesc = this.getView().byId("costCodeDesc").getValue().trim();
          if (voyCode == "" && voyCodeDesc == "") {
            this.resetView();
 
          } else {
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {
 
              title: "Confirmation",
              onClose: function (oAction) {
 
                if (oAction === sap.m.MessageBox.Action.OK) {
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
        else if( editFlag){
          let desc = aSelectedIds[0][1];
          let originalDesc = inputFieldObj.getValue();
          console.log(originalDesc, originalDesc.trim());
          if (desc === originalDesc) {
 
            that.onCancelPressBtn();
 
            oRouter.navTo("RouteMasterDashboard");
            that.resetView();
          } else {
 
            let oTable = this.byId("createTypeTable");
            let aSelectedItems = oTable.getSelectedItems();
 
            let cells = aSelectedItems[0].getCells();
            let value2 = cells[1].getAggregation('items')[0].getProperty("value").trim();
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
                    that.resetView();
                    oRouter.navTo("RouteMasterDashboard");
 
 
                  }
 
                }
              }
              )
            }
 
        }
     
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
      onPatchSent: function (ev) {
        sap.m.MessageToast.show("Updating..")
      },
 
      onPatchCompleted: function (ev) {
        let oView = this.getView();
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
      onCancelPressBtn: function () {
 
        let that = this;
        console.log("cancel Clciked");
        let description = aSelectedIds[0][1];
 
        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();
 
        let cells = aSelectedItems[0].getCells();
        let value2 = cells[1].getAggregation('items')[0].getProperty("value").trim();
 
        if (value2 === description) {
 
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
 
        if (value2 == "") {
          MessageToast.show("Please Enter Description.");
          return
        }
 
 
      },
      onUpdatePressBtn: function () {
 
        let code = aSelectedIds[0][0];
        let description = aSelectedIds[0][1];
        // let value2 =  this.getView().byId("DescInput").getValue().trim() ;
        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();
 
        let cells = aSelectedItems[0].getCells();
        let value2 = cells[1].getAggregation('items')[0].getProperty("value").trim();
        console.log();
        if (value2 == description) {
          MessageToast.show("nothing to update ");
          return;
        }
 
        if (value2 == "") {
          MessageToast.show("Please Enter Description.");
          return
        }
 
        let UpData = {
          Costcode: code,
          Cstcodes: value2
 
        };
 
 
        // console.log(data);
 
        let oModel = this.getView().getModel();
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
 
        let oBindList = oModel.bindList("/CostMasterSet", {
          $$updateGroupId: "update"
        });
 
 
        oBindList.attachPatchSent(this.onPatchSent, this);
        oBindList.attachPatchCompleted(this.onPatchCompleted, this);
        // let inputVal = this.byId("DescInput")
        // console.log(inputVal);
 
        let oFilter = new sap.ui.model.Filter("Costcode", sap.ui.model.FilterOperator.EQ, UpData.Costcode);
        oBindList.filter(oFilter);
 
        let that = this;
 
        oBindList.requestContexts().then(function (aContexts) {
 
          if (aContexts.length > 0) {
            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject())
            });
            console.log("addata", aData);
 
            let data = aData.filter(item => item.Costcode == UpData.Costcode);
            console.log("fghj", data, UpData.Cstcodes);
 
            console.log("hello");
            let path = `/CostMasterSet('${UpData.Costcode}')`;
 
            let upContext = aContexts.filter(obj => obj.sPath === path);
 
            inputFieldObj.setProperty("value", value2.trim());
            that.getView().getModel().refresh();
 
            upContext[0].setProperty("Cstcodes", UpData.Cstcodes.trim());
            // deschanged.push(UpData.Cstcodes.trim())
            // console.log(deschanged);
 
          }
        });
 
        oModel.submitBatch("update");
        // this._bChangesMade = false;
      },
      onCodeLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();
       
        // Check if the input field is for cost code
        if (oInput.getId() === this.getView().createId("costCode")) {
            // Validate if the entered value is a number
            if (!(/^\d*$/.test(sValue))) {
                // If not a number, remove the last character
                var sNewValue = sValue.slice(0, -1);
                oInput.setValue(sNewValue);
                // Show an error message to the user
                sap.m.MessageToast.show("Cost code should only contain numbers.");
            }
        }
      },
 
      onUpdateOldCode: function () {
        let value1 = aSelectedIds[0][0];
        let value2 = this.getView().byId("costCodeDesc1").getValue().trim();
 
        if (value2 == "") {
          MessageToast.show("Please Enter Description.");
          return
        }
 
        let UpData = {
 
          Costcode: value1,
          Cstcodes: value2
 
        };
        // console.log(data);
 
        let oModel = this.getView().getModel();
        let oBindList = oModel.bindList("/CostMasterSet", {
          $$updateGroupId: "update"
        });
 
        oBindList.attachPatchSent(this.onPatchSent, this);
        oBindList.attachPatchCompleted(this.onPatchCompleted, this);
 
        let oFilter = new sap.ui.model.Filter("Costcode", sap.ui.model.FilterOperator.EQ, UpData.Costcode);
        oBindList.filter(oFilter);
 
        oBindList.requestContexts().then(function (aContexts) {
 
          if (aContexts.length > 0) {
 
            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject())
 
            });
            console.log("addata", aData);
 
            let data = aData.filter(item => item.Costcode == UpData.Costcode);
            console.log("fghj", data, UpData.Cstcodes);
 
            if (data[0]?.Cstcodes === UpData.Cstcodes) {
 
              sap.m.MessageToast.show("Nothing to Update, make some changes.")
            } else {
 
              let path = `/CostMasterSet('${UpData.Costcode}')`;
              console.log("acOntexts", aContexts, path);
              let upContext = aContexts.filter(obj => obj.sPath === path);
              console.log(path, upContext);
              upContext[0].setProperty("Cstcodes", UpData.Cstcodes);
            }
          }
        });
 
        oModel.submitBatch("update");
      },
 
      onCreateSent: function (ev) {
 
        sap.m.MessageToast.show("Creating..")
        console.log(ev.getParameter("context")?.getObject())
      },
 
      onCreateCompleted: function (ev) {
        console.log("ev", ev);
 
        let isSuccess = ev.getParameter('success');
        if (isSuccess) {
          sap.m.MessageToast.show("Successfully Created.")
          copyFlag = false;
        } else {
          sap.m.MessageToast.show("Fail to Create.")
        }
      },
 
      onSave: function () {
        var that = this;
        var value1 = this.getView().byId("costCode").getValue();
        var value2 = this.getView().byId("costCodeDesc").getValue();
 
        if (!value1 || !value2) {
          MessageToast.show("Please enter both fields.");
          return;
        }
 
        let data = {
 
          Costcode: value1,
          Cstcodes: value2
        };
 
        const oJsonModel = new sap.ui.model.json.JSONModel(data);
        this.getView().setModel(oJsonModel, "oJsonModel");
        let oModel = this.getView().getModel();
 
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
 
        let oBindListSP = oModel.bindList("/CostMasterSet");
 
        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);
 
        oBindListSP.attachEventOnce("dataReceived", function () {
 
          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("Costcode");
          });
 
          if (existingEntries.includes(value1)) {
            MessageToast.show("Entry already exists with the same code.");
          } else {
 
            try {
              oBindListSP.create({
                Costcode: value1,
                Cstcodes: value2
              });
              that.getView().getModel().refresh();
              that.resetView();
 
 
            } catch (error) {
              MessageToast.show("Error while saving data");
            }
          }
        });
        oBindListSP.getContexts();
      },
 
      onCancelHome: function () {
        // checking if edit section
 
        let that = this;
        const oRouter = this.getOwnerComponent().getRouter();
        if (editFlag) {
          // old fn
          this.onCancelEdit();
 
          // new changes
          let desc = aSelectedIds[0][1];
          let originalDesc = inputFieldObj.getValue();
          console.log(originalDesc, originalDesc.trim());
          if (desc === originalDesc) {
 
            that.onCancelPressBtn();
 
            oRouter.navTo("RouteMasterDashboard");
            that.resetView();
          } else {
 
            let oTable = this.byId("createTypeTable");
            let aSelectedItems = oTable.getSelectedItems();
 
            let cells = aSelectedItems[0].getCells();
            let value2 = cells[1].getAggregation('items')[0].getProperty("value").trim();
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
                    that.resetView();
                    oRouter.navTo("RouteHome");
 
 
                  }
 
                }
              }
              )
            }
          // checking if new Entry section
        } else if (newEntryFlag || copyFlag) {
          this.onCancelCopyOrEntry();
 
          // checking if copy
        }
        // else {
        //   const oRouter = this.getOwnerComponent().getRouter();
        //   oRouter.navTo("RouteHome");
        // }
 
      },
 
      onCancelEdit: function () {
        const that = this;
        let updatedValue = this.byId("costCodeDesc1").getValue().trim();
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
        let updatedCode = this.byId("costCode").getValue();
        let updatedValue = this.byId("costCodeDesc").getValue().trim();
 
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
        this.getView().byId("updateTypeTable").setVisible(false);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("mainPageFooter2").setVisible(false);
        aSelectedIds = [];
        editFlag = false;
        copyFlag = false;
        newEntryFlag = false;
        this.getView().byId("createTypeTable").setVisible(true).removeSelections();
        this.getView().byId("costCode1").setText("");
        this.getView().byId("costCodeDesc1").setValue("");
        this.getView().byId("costCode").setValue("");
        this.getView().byId("costCodeDesc").setValue("");
        this.getView().byId("editBtn").setEnabled(true);
        this.getView().byId("deleteBtn").setEnabled(true);
        this.getView().byId("copyBtn").setEnabled(true);
        this.getView().byId("entryBtn").setEnabled(true);
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
 
        if (aSelectedIds.length) {
          if (aSelectedIds.length > 1) {
            MessageToast.show("Please select one row");
            return
          }
        } else {
          MessageToast.show("Please select a row");
          return;
        }
        copyFlag = true;
 
        this.getView().byId("deleteBtn").setEnabled(false);
        this.getView().byId("editBtn").setEnabled(false);
        this.getView().byId("entryBtn").setEnabled(false);
        this.getView().byId("createTypeTable").setVisible(false);
 
        let code = aSelectedIds[0][0];
        let desc = aSelectedIds[0][1];
        console.log(code, desc);
 
        this.getView().byId('entryTypeTable').setVisible(true);
        this.getView().byId("costCode").setValue(code);
        this.getView().byId("costCodeDesc").setValue(desc);
        this.getView().byId("mainPageFooter").setVisible(true);
 
 
      }
 
    });
 
  });