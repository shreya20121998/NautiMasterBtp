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

    return Controller.extend("nauticalfe.controller.CostMaster", {

      onInit: function () {
        console.log("init called");
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);


      },
      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMasterDashboard");
        this.onCancel();
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

      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
        this.onCancel();
      },

      onExit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        let that = this;

        // Show confirmation dialog
        sap.m.MessageBox.confirm(
          "Are you sure , you want to exit?", {
          title: "Confirmation",
          onClose: function (oAction) {
            if (oAction === sap.m.MessageBox.Action.OK) {
              // If user clicks OK, navigate to "RouteHome"
              oRouter.navTo("RouteHome");
              that.onCancel();

            }

          }
        }
        );


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
        console.log(aSelectedIds);
        // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
        return aSelectedIds;

      },

      newEntries: function () {
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
        console.log("copyflag", copyFlag);
        if (copyFlag) {
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
        this.getView().byId("deleteBtn").setEnabled(false);
        this.getView().byId("copyBtn").setEnabled(false);
        this.getView().byId("entryBtn").setEnabled(false);
        
        this.getView().byId("createTypeTable").setVisible(false);
        let code = aSelectedIds[0][0];
        let desc = aSelectedIds[0][1];

        this.getView().byId("costCode1").setText(code);
        this.getView().byId("costCodeDesc1").setValue(desc);
        this.getView().byId('updateTypeTable').setVisible(true);
        // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);

        this.getView().byId("mainPageFooter2").setVisible(true);


      },
      //   update functionality  button on 'ok' press

      onPatchSent: function (ev) {
        sap.m.MessageToast.show("Updating..")
      },

      onPatchCompleted: function (ev) {
        let oView = this.getView();
        let isSuccess = ev.getParameter('success');
        if (isSuccess) {
          sap.m.MessageToast.show("Successfully Updated.");
          oView.getModel().refresh();
          // oView.byId("createTypeTable").setVisible(true)
          // oView.byId("createTypeTable").removeSelections();
          // aSelectedIds = [];
          // editFlag = false;
          // oView.byId("mainPageFooter2").setVisible(false);
          // oView.byId("updateTypeTable").setVisible(false);
          this.resetView();
        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
      },

      onUpdate: function () {
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
              sap.m.MessageToast.show("Nothing to Update..make some change.")
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
        var that = this.getView();
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
        that.setModel(oJsonModel, "oJsonModel");
        let oModel = this.getView().getModel();
        let oBindListSP = oModel.bindList("/CostMasterSet");

        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);

        oBindListSP.attachEventOnce("dataReceived", function () {

          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("Costcode");
          });

          if (existingEntries.includes(value1)) {
            MessageToast.show("Entry already exists with same code.");
          } else {

            try {
              oBindListSP.create({
                Costcode: value1,
                Cstcodes: value2
              });
              that.getModel().refresh();
              that.byId("costCode").setValue("");
              that.byId("costCodeDesc").setValue("");

              MessageToast.show("Data created Successfully");

              that.byId("createTypeTable").setVisible(true);
              that.byId("createTypeTable").removeSelections();
              aSelectedIds = []
              that.byId("entryTypeTable").setVisible(false);
              that.byId("mainPageFooter").setVisible(false);

            } catch (error) {
              MessageToast.show("Error while saving data");
            }
          }
        });
        oBindListSP.getContexts();
      },

      onCancel: function () {
        const that = this; // Preserve reference to 'this' for use inside the callback function

        // Show confirmation dialog
        sap.m.MessageBox.confirm(

          "Do you want to discard the changes?", {

          title: "Confirmation",
          onClose: function (oAction) {
            if (oAction === sap.m.MessageBox.Action.OK) {
              // If user clicks OK, discard changes and reset view
              that.resetView();
            }

          }
        }
        );
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
        console.log(editFlag, copyFlag);
        if (copyFlag || editFlag) {
          return
        }

        let aItems = this.byId("createTypeTable").getSelectedItems();

        if (!aItems.length) {

          MessageToast.show("Please Select  Items ");

          return;
        }

        const that = this;  // creatinh reference for use in Dialog
        sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
          MessageBox.confirm(
            "Are you sure  to delete the selected items?", {
            title: "Confirm ",
            onClose: function (oAction) {
              if (oAction === MessageBox.Action.OK) {
                // User confirmed deletion
                that.deleteSelectedItems(aItems);
              } else {
                // User canceled deletion
                sap.m.MessageToast.show("Deletion canceled");
              }
            }
          }
          );
        });

      }, // ending fn
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
        console.log("editflag", editFlag);

        if (editFlag) {
          return;
        }

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

        // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);
        this.getView().byId("mainPageFooter").setVisible(true);

      }

    });

  });