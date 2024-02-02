sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
  ],
  function (BaseController,History,MessageToast,JSONModel) {
    "use strict";
 
    return BaseController.extend("nauticalfe.controller.MastBidMaster", {
      onInit() {
      }, 
      selectedItems: function (oEvent) {
        // console.log("hello");
        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();
 
 
        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {
          if (oSelectedItem.getBindingContext()) {
            let cells = oSelectedItem.getCells();
            console.log(cells);
 
            return [
              oSelectedItem.getBindingContext().getProperty("BNAME"),
              oSelectedItem.getBindingContext().getProperty("CODE"),
              oSelectedItem.getBindingContext().getProperty("VALUE"),
              oSelectedItem.getBindingContext().getProperty("CVALUE_code"),
              oSelectedItem.getBindingContext().getProperty("CUNIT_code"),
              oSelectedItem.getBindingContext().getProperty("DATATYPE"),
              oSelectedItem.getBindingContext().getProperty("TABLENAME"),
              oSelectedItem.getBindingContext().getProperty("MULTI_CHOICE"),
            ]
          } else {
          }
 
        });
        console.log(aSelectedIds);
        return aSelectedIds;
 
      },

      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
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
      onSave1234: function () {

        var BNAME =  this.getView().byId("BNAME").getValue();
        var CODE =  this.getView().byId("CODE").getValue();
        var VALUE =  this.getView().byId("VALUE").getValue();
        var CVALUE =  this.getView().byId("CVALUE").getValue();
        var CUNIT =  this.getView().byId("CUNIT").getValue();
        var DATATYPE =  this.getView().byId("DATATYPE").getValue();
        var TABLENAME =  this.getView().byId("TABLENAME").getValue();
        var MULTI_CHOICE =  this.getView().byId("MULTI_CHOICE").getSelected();
               
         
        var data = {

          BNAME: BNAME,
          CODE :CODE,
          VALUE: VALUE,
          CVALUE:CVALUE,
          CUNIT:CUNIT,  
          DATATYPE:DATATYPE,
          TABLENAME:TABLENAME,
          MULTI_CHOICE:MULTI_CHOICE

        };
       
        var JsonData = JSON.stringify(data)
        console.log(JsonData);
        let EndPoint = "/odata/v4/nautical/MAS";
        fetch(EndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then(function (res) {
           
            if (res.ok) {
              this.getView().getModel().refresh();
              console.log("Entity created successfully");
              MessageToast.show(`Entity created successfully`)
             

            }
            else {
              console.log("Failed");
              MessageToast.show(`Failed`)
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })
          this.getView().byId("createTypeTable").setVisible(true)
          this.getView().byId("entryTypeTable").setVisible(false)
          this.getView().byId("mainPageFooter").setVisible(false)

      },


      onSave: function () {
        var that = this.getView();
        var BNAME =  this.getView().byId("BNAME").getValue();
        var CODE =  this.getView().byId("CODE").getValue();
        var VALUE =  this.getView().byId("VALUE").getValue();
        var CVALUE =  this.getView().byId("CVALUE").getValue();
        var CUNIT =  this.getView().byId("CUNIT").getValue();
        var DATATYPE =  this.getView().byId("DATATYPE").getValue();
        var TABLENAME =  this.getView().byId("TABLENAME").getValue();
        var MULTI_CHOICE =  this.getView().byId("MULTI_CHOICE").getSelected();
   
        if (!BNAME || !CODE || !VALUE || !CVALUE || !CUNIT || !DATATYPE || !TABLENAME) {
            MessageToast.show("Error: Please enter all data.");
            return;
        }
   
        var data = {
          BNAME: BNAME,
          CODE :CODE,
          VALUE: VALUE,
          CVALUE:CVALUE,
          CUNIT:CUNIT,  
          DATATYPE:DATATYPE,
          TABLENAME:TABLENAME,
          MULTI_CHOICE:MULTI_CHOICE
        };
        const voyageModel = new JSONModel(data);
        that.setModel(voyageModel, "voyageModel");
        let oModel = this.getView().getModel();
        let oBindListSP = oModel.bindList("/MAS");

        oBindListSP.attachEventOnce("dataReceived", function () {
          let existingEntries = oBindListSP.getContexts().map(function (context) {
              return context.getProperty("CODE");
          });
  
          if (existingEntries.includes(CODE)) {
              MessageToast.show("Duplicate Voyage Code is not allowed");
          }
          else { 
            try {
                oBindListSP.create({
                  BNAME: BNAME,
                  CODE :CODE,
                  VALUE: VALUE,
                  CVALUE:CVALUE,
                  CUNIT:CUNIT,  
                  DATATYPE:DATATYPE,
                  TABLENAME:TABLENAME,
                  MULTI_CHOICE:MULTI_CHOICE
                });
                that.getModel().refresh();
                that.byId("BNAME").setValue("");
                that.byId("CODE").setValue("");
                that.byId("VALUE").setValue("");
                that.byId("CVALUE").setValue("");
                that.byId("CUNIT").setValue("");
                that.byId("DATATYPE").setValue("");
                that.byId("TABLENAME").setValue("");
                that.byId("MULTI_CHOICE").setValue("");

                MessageToast.show("Data created Successfully");

                that.byId("createTypeTable").setVisible(true);
                that.byId("entryTypeTable").setVisible(false);
                that.byId("mainPageFooter").setVisible(false);
            }

            catch (error) {
                MessageToast.show("Error while saving data");
            }
          }
        });
        oBindListSP.getContexts();
      },

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
 
      }, // ending fn
      deleteSelectedItems: function (aItems) {
        aItems.forEach(function (oItem) {
          oItem.getBindingContext().delete().catch(function (oError) {
            if (!oError.canceled) {
              // Error was already reported to message model
            }
          });
        });
      },

      onCancel: function () {
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("updateTypeTable").setVisible(false);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("mainPageFooter2").setVisible(false);
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
        this.getView().byId("CARCD1").setText(code);
        this.getView().byId("CARDES1").setValue(desc);
        this.getView().byId('updateTypeTable').setVisible(true);
        // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);
        this.getView().byId("mainPageFooter2").setVisible(true);
 
        // this.onUpdate(code, desc);
 
      },
      onUpdate: function () {
 
        let value1 = aSelectedIds[0][0];
        let value2 = this.getView().byId("CARDES1").getValue();
 
 
        let data = {
          CARCD: value1,
 
          CARDES: value2
 
        };
        console.log(data);
 
 
        var oView = this.getView();
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/CARTYP/" + data.CARCD;
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
      
 
 
 
      // pressCopy: function () {
 
 
      //   if (aSelectedIds.length) {
      //     if (aSelectedIds.length > 1) {
      //       MessageToast.show("Please select one row");
      //       return
      //     }
      //   } else {
      //     MessageToast.show("Please select a row");
      //     return;
      //   }
 
      //   this.getView().byId("createTypeTable").setVisible(false);
 
      //   let code = aSelectedIds[0][0];
      //   let desc = aSelectedIds[0][1];
 
      //   this.getView().byId("CARCD").setValue(code);
      //   this.getView().byId("CARDES").setValue(desc);
      //   this.getView().byId('entryTypeTable').setVisible(true);
 
      //   // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);
      //   this.getView().byId("mainPageFooter").setVisible(true);
 
 
      // }
 
      



    });
  }
);