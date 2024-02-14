sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  function (BaseController,History,MessageToast,JSONModel,MessageBox) {
    "use strict";
    let aSelectedIds = [];
 
    return BaseController.extend("nauticalfe.controller.PortLocMaster", {
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
              oSelectedItem.getBindingContext().getProperty("COUNTRY"),
              oSelectedItem.getBindingContext().getProperty("PORTC"),
              oSelectedItem.getBindingContext().getProperty("PORTN"),
              oSelectedItem.getBindingContext().getProperty("REANCHO"),
              oSelectedItem.getBindingContext().getProperty("LATITUDE"),
              oSelectedItem.getBindingContext().getProperty("LONGITUDE"),
              oSelectedItem.getBindingContext().getProperty("COUNTRYN"),
              oSelectedItem.getBindingContext().getProperty("LOCID"),
              oSelectedItem.getBindingContext().getProperty("IND"),
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

      onSave: function () {
        // var that = this.getView();
        var COUNTRY =  this.byId("COUNTRY").getValue();
        var PORTC =  this.byId("PORTC").getValue();
        var PORTN =  this.byId("PORTN").getValue();
        var REANCHO =  this.byId("REANCHO").getValue();
        var LATITUDE =  this.byId("LATITUDE").getValue();
        var LONGITUDE =  this.byId("LONGITUDE").getValue();
        var COUNTRYN =  this.byId("COUNTRYN").getValue();
        var LOCID =  this.byId("LOCID").getValue();
        var IND =  this.byId("IND").getValue();
       
        // Validation check
        // if (!BNAME || !CODE || !VALUE || !CVALUE || !CUNIT || !DATATYPE || !TABLENAME) {
        //     sap.m.MessageToast.show("Error: Please enter all data.");
        //     return;
        // }
    
        let oModel = this.getView().getModel();
        let oBindListSP = oModel.bindList("/PORTLOC");
    
        oBindListSP.attachEventOnce("dataReceived", () => {
          try {
            let existingEntries = oBindListSP.getContexts().map(function (context) {
                return context.getProperty("COUNTRY");
            });
    
            if (existingEntries.includes(COUNTRY)) {
                sap.m.MessageToast.show("Duplicate Voyage Code is not allowed");
            } else { 
                oBindListSP.create({
                  COUNTRY: COUNTRY,
                  PORTC: PORTC,
                  PORTN: PORTN,
                  REANCHO: REANCHO,
                  LATITUDE: LATITUDE,
                  LONGITUDE: LONGITUDE,
                  COUNTRYN: COUNTRYN,
                  LOCID: LOCID,
                  IND:IND
                });
    
             
    
                // Clear input fields
                this.getView().getContent().forEach(function (control) {
                  if (control instanceof sap.m.Input) {
                      control.setValue("");
                  }
              });
    
                sap.m.MessageToast.show("Data created successfully");
                oModel.refresh();
    
                this.byId("createTypeTable").setVisible(true);
                this.byId("entryTypeTable").setVisible(false);
                this.byId("mainPageFooter").setVisible(false);
            }
          } catch (error) {
            console.error("Error while saving data:", error);
            sap.m.MessageToast.show("Error while saving data. See console for details.");
          }
        });
    
        oBindListSP.getContexts(0, 100);
      },

      pressCopy: function () {
        if (aSelectedIds.length) {
            if (aSelectedIds.length > 1) {
                MessageToast.show("Please select one row");
                return;
            }
        } else {
            MessageToast.show("Please select a row");
            return;
        }
        var view = this.getView();
        this.getView().byId("createTypeTable").setVisible(false);
    
        var COUNTRY = aSelectedIds[0][0];
        var PORTC = aSelectedIds[0][1];
        var PORTN = aSelectedIds[0][2];
        var REANCHO = aSelectedIds[0][3];
        var LATITUDE = aSelectedIds[0][4];
        var LONGITUDE = aSelectedIds[0][5];
        var COUNTRYN = aSelectedIds[0][6];
        var LOCID = aSelectedIds[0][7];
        var IND = aSelectedIds[0][7];
    
        view.byId("COUNTRY").setValue(COUNTRY);
        view.byId("PORTC").setValue(PORTC);
        view.byId("PORTN").setValue(PORTN);
        view.byId("REANCHO").setValue(REANCHO);
        view.byId("LATITUDE").setValue(LATITUDE);
        view.byId("LONGITUDE").setValue(LONGITUDE);
        view.byId("COUNTRYN").setValue(COUNTRYN);
        view.byId("LOCID").setValue(LOCID);
        view.byId("IND").setValue(IND);
    
        view.byId("entryTypeTable").setVisible(true);
        view.byId("mainPageFooter").setVisible(true);
      },
    
      
      pressEdit: function () {
        if (aSelectedIds.length) {
            if (aSelectedIds.length > 1) {
                sap.m.MessageToast.show("Please select one row");
                return;
            }
        } else {
            sap.m.MessageToast.show("Please select a row");
            return;
        }
    
        var view = this.getView();
        view.byId("createTypeTable").setVisible(false);
    
        var COUNTRY = aSelectedIds[0][0];
        var PORTC = aSelectedIds[0][1];
        var PORTN = aSelectedIds[0][2];
        var REANCHO = aSelectedIds[0][3];
        var LATITUDE = aSelectedIds[0][4];
        var LONGITUDE = aSelectedIds[0][5];
        var COUNTRYN = aSelectedIds[0][6];
        var LOCID = aSelectedIds[0][7];
        var IND = aSelectedIds[0][7];
    
        view.byId("country").setValue(COUNTRY);
        view.byId("portc").setValue(PORTC);
        view.byId("portn").setValue(PORTN);
        view.byId("reancho").setValue(REANCHO);
        view.byId("latitude").setValue(LATITUDE);
        view.byId("longitude").setValue(LONGITUDE);
        view.byId("countryn").setValue(COUNTRYN);
        view.byId("locid").setValue(LOCID);
        view.byId("ind").setValue(IND);
    
        view.byId("updateTypeTable").setVisible(true);
        view.byId("mainPageFooter2").setVisible(true);
      },
    
      onUpdate : function(){
         
        let COUNTRY = aSelectedIds[0][0];
        let PORTC =   this.getView().byId("portc").getValue();
        let PORTN =  this.getView().byId("portn").getValue();
        let REANCHO =  this.getView().byId("reancho").getValue();
        let LATITUDE =  this.getView().byId("latitude").getValue();
        let LONGITUDE =  this.getView().byId("longitude").getValue();
        let COUNTRYN =  this.getView().byId("countryn").getValue();
        let LOCID =  this.getView().byId("locid").getValue();
        let IND =  this.getView().byId("ind").getValue();
        
        let data = {
          COUNTRY: COUNTRY,
          PORTC: PORTC,
          PORTN: PORTN,
          REANCHO: REANCHO,
          LATITUDE: LATITUDE,
          LONGITUDE: LONGITUDE,
          COUNTRYN: COUNTRYN,
          LOCID: LOCID,
          IND:IND
        };
        console.log(data);
 
 
        var oView = this.getView();
        var JsonData = JSON.stringify(data)
        console.log(data.COUNTRY);
        let EndPoint = "/odata/v4/nautical/PORTLOC/"+data.COUNTRY;
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

      

      
      
 
 
 
      
 
      



    });
  }
);