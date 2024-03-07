sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"

  ],
  function (Controller, History, Fragment, MessageToast, MessageBox, JSONModel) {
    "use strict";
    let aSelectedIds = [];


    return Controller.extend("nauticalfe.controller.ClassMaster", {

      onInit: function () {


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

            return [oSelectedItem.getBindingContext().getProperty("ZfValue"), oSelectedItem.getBindingContext().getProperty("ZfDesc")]

          } else {


          }

        });
        console.log(aSelectedIds);
        // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
        return aSelectedIds;

      },
      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
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
        } else {
          this._oMenuFragment.openBy(oButton);
        }
      },
      onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Routedash");
      },
      onExit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      newEntries: function () {
        this.getView().byId("createTypeTable").setVisible(false)
        this.getView().byId("entryTypeTable").setVisible(true)
        this.getView().byId("mainPageFooter").setVisible(true)


      },
      onCreateSent: function (ev) {
        sap.m.MessageToast.show("Creating..")
        console.log(ev.getParameter("context")?.getObject())
      },
      onCreateCompleted: function (ev) {
        let isSuccess = ev.getParameter('success');
        if (isSuccess) {
          sap.m.MessageToast.show("Successfully Created.")
        } else {
          sap.m.MessageToast.show("Fail to Create Nomination.")
        }
      },
      onSave: function () {
        var that = this.getView();
        var value1 = this.getView().byId("CLASSFIELD").getValue();
        var value2 = this.getView().byId("CLASSDESC").getValue();

        if (!value1 || !value2) {
          MessageToast.show("Please enter both fields.");
          return;
        }

        var data = {
          ZfDesc: value1,
          ZfValue: value2
        };
        const oJsonModel = new JSONModel(data);
        that.setModel(oJsonModel, "oJsonModel");
        let oModel = this.getView().getModel();
        let oBindListSP = oModel.bindList("/ClassMasterSet");

        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);

        oBindListSP.attachEventOnce("dataReceived", function () {
          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("ZfValue");
          });

          if (existingEntries.includes(value1)) {
            MessageToast.show("Duplicate Code is not allowed");
          } else {

            try {
              oBindListSP.create({
                ZfValue: value1,
                ZfDesc: value2
              });
              that.getModel().refresh();
              that.byId("CLASSFIELD").setValue("");
              that.byId("CLASSDESC").setValue("");

              MessageToast.show("Data created Successfully");

              that.byId("createTypeTable").setVisible(true);
              that.byId("createTypeTable").removeSelections();
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
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("CLASSFIELD").setValue();
        this.getView().byId("CLASSDESC").setValue();
        this.getView().byId("mainPageFooter").setVisible(true)

      },

      pressEdit: function () {

        if (aSelectedIds.length) {
          if (aSelectedIds.length > 1) {
            MessageToast.show("Please select one row");
            return
          }
        } else {
          MessageToast.show("Please select a row");
          return;
        }

        this.getView().byId("createTypeTable").setVisible(false);
        let code = aSelectedIds[0][0];
        let desc = aSelectedIds[0][1];
        this.getView().byId("CLASSFIELD1").setValue(code);
        this.getView().byId("CLASSDESC1").setValue(desc);
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
              oView.byId("createTypeTable").setVisible(true)
              oView.byId("createTypeTable").removeSelections();


              oView.byId("mainPageFooter2").setVisible(false);
              oView.byId("updateTypeTable").setVisible(false);
        } else {
          sap.m.MessageToast.show("Fail to Update Nomination.")
        }
      },
      onUpdate: function(){
        let value1 = aSelectedIds[0][0];
        let value2 = this.getView().byId("CLASSDESC1").getValue();

        let UpData = {
          ZfValue: value1,

          ZfDesc: value2

        };
        // console.log(data);

        let nomModel = this.getView().getModel();
        let oBindList = nomModel.bindList("/ClassMasterSet", {
          $$updateGroupId: "update"
         });

         oBindList.attachPatchSent(this.onPatchSent, this);
         oBindList.attachPatchCompleted(this.onPatchCompleted, this);

        let oFilter = new sap.ui.model.Filter("ZfValue", sap.ui.model.FilterOperator.EQ, UpData.ZfValue);
        oBindList.filter(oFilter);

        oBindList.requestContexts().then(function (aContexts) {
          
          if (aContexts.length > 0) {
            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject())
            });
            console.log("addata", aData);
           
            let data = aData.filter(item=>item.ZfValue == UpData.ZfValue);
            console.log("fghj",data, UpData.ZfDesc);

            if (data?.ZfDesc === UpData.ZfDesc) {
              sap.m.MessageToast.show("Nothing to Update..")
            } else {
              let path = `/ClassMasterSet('${UpData.ZfValue}')`;

            let upContext = aContexts.filter(obj=>obj.sPath=== path);
            // console.log(upContext);
            upContext[0].setProperty("ZfDesc", UpData.ZfDesc);
            }
          }
        });

        nomModel.submitBatch("update");
      },
      onUpdate1: function () {

        let value1 = aSelectedIds[0][0];
        let value2 = this.getView().byId("CLASSDESC1").getValue();

        let data = {
          ZfValue: value1,

          ZfDesc: value2
        };
        // console.log(data);

        var oView = this.getView();
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/ClassMasterSet/" + data.ZfValue;
        console.log(EndPoint);
        fetch(EndPoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then(function (res) {

            if (res.ok) {
              // location.reload();
              console.log("Entry updated successfully");
              MessageToast.show(`Entry updated successfully`);
              oView.getModel().refresh();
              oView.byId("createTypeTable").setVisible(true)
              
              
              oView.byId("mainPageFooter2").setVisible(false);
              oView.byId("updateTypeTable").setVisible(false);
              oView.byId("createTypeTable").removeSelections();

            }
            else {
              res.json().then((data) => {
                if (data && data.error && data.error.message) {
                  // Show the error message from the backend
                  MessageBox.error(data.error.message);
                  return
                }
              });
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })
      },

      // on Delete press functionality

      onDeletePress: function () {

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

      },
      // internal calling fn by onDeletePress fn

      deleteSelectedItems: function (aItems) {
        const that = this;

        aItems.forEach(function (oItem) {
          const oContext = oItem.getBindingContext();
          oContext.delete().then(function () {
            // Successful deletion
            console.log("Succesfully Deleted");
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

        this.getView().byId("createTypeTable").setVisible(false);
        let code = aSelectedIds[0][0];
        let desc = aSelectedIds[0][1];
        this.getView().byId("CLASSFIELD").setValue(code);
        this.getView().byId("CLASSDESC").setValue(desc);
        this.getView().byId('entryTypeTable').setVisible(true);

        // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);
        this.getView().byId("mainPageFooter").setVisible(true);

      }


    });

  });
