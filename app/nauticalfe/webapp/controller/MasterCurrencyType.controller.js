sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
   
  ],
  function (Controller,History,Fragment,MessageToast, MessageBox,JSONModel ) {
    "use strict";
    let aSelectedIds = [];
 
    let copyFlag = false;
    let editFlag = false;
 
    let deschanged=[];
    let inputFieldObj  ={};
    let saveObj ={};
    let cancelObj = {}
 
    return Controller.extend("nauticalfe.controller.MasterCurrencyType", {
 
      onInit: function () {
       
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);
 
      },
      // onBackPress: function () {
      //   const oRouter = this.getOwnerComponent().getRouter();
      //   oRouter.navTo("RouteMasterDashboard");
      // },
      // onBackPress: function () {
      //   const that = this;
      //   debugger;
      //   let voyDes = this.getView().byId("NAVOYGCURDES1").getValue().trim();
      //   let voyDes3 = this.getView().byId("NAVOYCUR2").getValue().trim();
      //   let voyDes2= this.getView().byId("NAVOYGCURDES2").getValue().trim();
       
      //   let getvoyCodeDesc2 = aSelectedIds[0][0];
      //   let getvoyCodeDesc1 = aSelectedIds[0][1]; // Assuming aSelectedIds is accessible here
     
      //   if (voyDes === getvoyCodeDesc1) {
      //     this.getView().byId("createTypeTable").setVisible(true).removeSelections();
      //     this.getView().byId("updateTypeTable").setVisible(false);
      //     this.getView().byId("mainPageFooter").setVisible(false);
      //     this.getView().byId("mainPageFooter2").setVisible(false);
 
         
      //     this.getView().byId("editBtn").setEnabled(true);
      //     this.getView().byId("deleteBtn").setEnabled(true);
      //     this.getView().byId("copyBtn").setEnabled(true);
      //     this.getView().byId("entryBtn").setEnabled(true);
      //   }
      //  else if(voyDes2 === getvoyCodeDesc1 && voyDes3 ===getvoyCodeDesc2){
      //   this.getView().byId("createTypeTable").setVisible(true).removeSelections();
      //   this.getView().byId("updateTypeTable").setVisible(false);
      //   this.getView().byId("mainPageFooter").setVisible(false);
      //   this.getView().byId("mainPageFooter2").setVisible(false);
      //   this.getView().byId("entryTypeTable").setVisible(false);
 
 
       
      //   this.getView().byId("editBtn").setEnabled(true);
      //   this.getView().byId("deleteBtn").setEnabled(true);
      //   this.getView().byId("copyBtn").setEnabled(true);
      //   this.getView().byId("entryBtn").setEnabled(true);
      //  }
 
       
       
       
       
       
      //   else {
           
 
     
      //     sap.m.MessageBox.confirm(
 
      //       "Do you want to discard the changes?", {
 
      //       title: "Confirmation",
      //       onClose: function (oAction) {
      //         if (oAction === sap.m.MessageBox.Action.OK) {
      //           // If user clicks OK, discard changes and reset view
      //           that.resetView();
               
      //         }
 
      //       }
      //     }
      //     )
      //   }
      // },
      onBackPress: function () {
        const that = this;
        debugger;
       
        let voyDes = this.getView().byId("NAVOYGCURDES1").getValue().trim();
        let voyDes3 = this.getView().byId("NAVOYCUR2").getValue().trim();
        let voyDes2= this.getView().byId("NAVOYGCURDES2").getValue().trim();
        let getvoyCodeDesc2 = aSelectedIds[0][0];
        let getvoyCodeDesc1 = aSelectedIds[0][1];
         // Assuming aSelectedIds is accessible here
     
        if (voyDes === getvoyCodeDesc1) {
         
            this.getView().byId("createTypeTable").setVisible(true).removeSelections();
            this.getView().byId("updateTypeTable").setVisible(false);
            this.getView().byId("mainPageFooter").setVisible(false);
            this.getView().byId("mainPageFooter2").setVisible(false);
            this.getView().byId("editBtn").setEnabled(true);
            this.getView().byId("deleteBtn").setEnabled(true);
            this.getView().byId("copyBtn").setEnabled(true);
            this.getView().byId("entryBtn").setEnabled(true);
        } else if(voyDes2 === getvoyCodeDesc1 && voyDes3 ===getvoyCodeDesc2){
            this.getView().byId("createTypeTable").setVisible(true).removeSelections();
            this.getView().byId("updateTypeTable").setVisible(false);
            this.getView().byId("mainPageFooter").setVisible(false);
            this.getView().byId("mainPageFooter2").setVisible(false);
            this.getView().byId("entryTypeTable").setVisible(false);
            this.getView().byId("editBtn").setEnabled(true);
            this.getView().byId("deleteBtn").setEnabled(true);
            this.getView().byId("copyBtn").setEnabled(true);
            this.getView().byId("entryBtn").setEnabled(true);
        } else {
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
            )
        }
   
        // Determine if the user is in edit mode or copy mode
        if (!(voyDes === getvoyCodeDesc1 || (voyDes2 === getvoyCodeDesc1 && voyDes3 === getvoyCodeDesc2))) {
            // If not in edit or copy mode, navigate to the "RouteMasterDashboard" screen
            this.getOwnerComponent().getRouter().navTo("RouteMasterDashboard");
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
          }).then(function(oMenu) {
            oMenu.openBy(oButton);
            this._oMenuFragment = oMenu;
            return this._oMenuFragment;
          }.bind(this));
        } else {
          this._oMenuFragment.openBy(oButton);
        }
      },
 
 
      onBackPressHome: function () {
        const that = this;
        let navoDes = this.getView().byId("NAVOYGCURDES1").getValue().trim();
        let getNAVOYGCURDES1 = aSelectedIds[0][1]; // Assuming aSelectedIds is accessible here
   
        if (navoDes == getNAVOYGCURDES1) {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome");
            this.resetView(); // Reset view if conditions met
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
           
            return [oSelectedItem.getBindingContext().getProperty("Navoycur"), oSelectedItem.getBindingContext().getProperty("Navoygcurdes")]
 
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
      // pressEdit : function(){
      //   console.log("copyflag", copyFlag);
      //   if (copyFlag) {
      //     return
      //   }
      //   if( aSelectedIds.length){
      //     if( aSelectedIds.length > 1){
      //        MessageToast.show("Please select one row");
      //        return
      //     }
      //   }else {
      //     MessageToast.show("Please select a row");
      //     return;
      //   }
       
       
      //   editFlag = true;
      //   this.getView().byId("deleteBtn").setEnabled(false);
      //   this.getView().byId("copyBtn").setEnabled(false);
      //   this.getView().byId("entryBtn").setEnabled(false);
 
      //   this.getView().byId("createTypeTable").setVisible(false);
      //   let code = aSelectedIds[0][0];
      //   let desc = aSelectedIds[0][1];
      //   this.getView().byId("NAVOYCUR1").setText(code);
      //   this.getView().byId("NAVOYGCURDES1").setValue(desc);
      //   this.getView().byId('updateTypeTable').setVisible(true);
       
      //   this.getView().byId("mainPageFooter2").setVisible(true);
 
      //   // this.onUpdate(code, desc);
      //   // this._bChangesMade = false;
 
      // },
 
     
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
 
 
      onPatchSent: function (ev) {
        sap.m.MessageToast.show("Updating..")
      },
      onPatchCompleted: function (ev) {
        let oView = this.getView();
        let isSuccess = ev.getParameter('success');
        if (isSuccess) {
          sap.m.MessageToast.show("Successfully Updated.");
         
          this.resetView();
          inputFieldObj.setEditable(false);
          saveObj.setVisible(false);
          cancelObj.setVisible(false);
          oView.getModel().refresh();
        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
      },
      onUpdate : function(){
        deschanged=[]
        let code =  aSelectedIds[0][0];
        let description  = aSelectedIds[0][1];
        // let value2 =  this.getView().byId("DescInput").getValue().trim() ;
        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();
 
        let cells = aSelectedItems[0].getCells();
        let value2  = cells[1].getAggregation('items')[0].getProperty("value").trim() ;
        console.log();
        if(value2 == description){
          MessageToast.show("nothing to update ");
          return;
        }
 
        if (value2 == "") {
          MessageToast.show("Please Enter Description.");
          return
        }
 
        let UpData = {
          Navoycur: code,
 
          Navoygcurdes: value2
 
        };
 
 
        // console.log(data);
 
        let oModel = this.getView().getModel();
        let oBindList = oModel.bindList("/CurTypeSet", {
          $$updateGroupId: "update"
         });
 
         oBindList.attachPatchSent(this.onPatchSent, this);
         oBindList.attachPatchCompleted(this.onPatchCompleted, this);
 
        let oFilter = new sap.ui.model.Filter("Navoycur", sap.ui.model.FilterOperator.EQ, UpData.Navoycur);
        oBindList.filter(oFilter);
 
        oBindList.requestContexts().then(function (aContexts) {
         
          if (aContexts.length > 0) {
            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject())
            });
            console.log("addata", aData);
           
            let data = aData.filter(item=>item.Navoycur == UpData.Navoycur);
            console.log("fghj",data, UpData.Navoygcurdes);
           
            // if (data[0]?.Navoygcurdes === UpData.Navoygcurdes) {
            //   sap.m.MessageToast.show("Nothing to Update.Make Some Changes.")
            // } else {
            // }
              console.log("hello");
              let path = `/CurTypeSet('${UpData.Navoycur}')`;
 
            let upContext = aContexts.filter(obj=>obj.sPath=== path);
            upContext[0].setProperty("Navoygcurdes", UpData.Navoygcurdes.trim());
            deschanged.push(UpData.Navoygcurdes.trim())
            console.log(deschanged);
 
          }
        });
 
        oModel.submitBatch("update");
        // this._bChangesMade = false;
      },
      onCreateSent: function (ev) {
        sap.m.MessageToast.show("Creating..")
        console.log(ev.getParameter("context")?.getObject())
      },
      onCreateCompleted: function (ev) {
        let isSuccess = ev.getParameter('success');
        if (isSuccess) {
          sap.m.MessageToast.show("Successfully Created.")
          copyFlag = false;
        this.getView().byId("editBtn").setEnabled(true);
        this.getView().byId("deleteBtn").setEnabled(true);
        this.getView().byId("copyBtn").setEnabled(true);
        this.getView().byId("entryBtn").setEnabled(true);
        } else {
          sap.m.MessageToast.show("Fail to Create.")
        }
      },
      onSave: function () {
        var that = this.getView();
        var value1 = this.getView().byId("NAVOYCUR2").getValue();
        var value2 = this.getView().byId("NAVOYGCURDES2").getValue();
 
        if (!value1 || !value2) {
          MessageToast.show("Please enter both fields.");
          return;
        }
 
        let data = {
          Navoycur: value1,
 
          Navoygcurdes: value2
        };
        const oJsonModel = new sap.ui.model.json.JSONModel(data);
        that.setModel(oJsonModel, "oJsonModel");
        let oModel = this.getView().getModel();
        let oBindListSP = oModel.bindList("/CurTypeSet");
 
        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);
 
        oBindListSP.attachEventOnce("dataReceived", function () {
          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("Navoycur");
          });
 
          if (existingEntries.includes(value1)) {
            MessageToast.show("Entry already exists with same code.");
          } else {
 
            try {
              oBindListSP.create({
                Navoycur: value1,
                Navoygcurdes: value2
              });
              that.getModel().refresh();
              that.byId("NAVOYCUR2").setValue("");
              that.byId("NAVOYGCURDES2").setValue("");
 
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
        const that = this;
        debugger;
        let voyDes = this.getView().byId("NAVOYGCURDES1").getValue().trim();
        let voyDes3 = this.getView().byId("NAVOYCUR2").getValue().trim();
        let voyDes2= this.getView().byId("NAVOYGCURDES2").getValue().trim();
       
        let getvoyCodeDesc2 = aSelectedIds[0][0];
        let getvoyCodeDesc1 = aSelectedIds[0][1]; // Assuming aSelectedIds is accessible here
     
        if (voyDes === getvoyCodeDesc1) {
          this.getView().byId("createTypeTable").setVisible(true).removeSelections();
          this.getView().byId("updateTypeTable").setVisible(false);
          this.getView().byId("mainPageFooter").setVisible(false);
          this.getView().byId("mainPageFooter2").setVisible(false);
 
         
          this.getView().byId("editBtn").setEnabled(true);
          this.getView().byId("deleteBtn").setEnabled(true);
          this.getView().byId("copyBtn").setEnabled(true);
          this.getView().byId("entryBtn").setEnabled(true);
        }
       else if(voyDes2 === getvoyCodeDesc1 && voyDes3 ===getvoyCodeDesc2){
        this.getView().byId("createTypeTable").setVisible(true).removeSelections();
        this.getView().byId("updateTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("mainPageFooter2").setVisible(false);
        this.getView().byId("entryTypeTable").setVisible(false);
 
 
       
        this.getView().byId("editBtn").setEnabled(true);
        this.getView().byId("deleteBtn").setEnabled(true);
        this.getView().byId("copyBtn").setEnabled(true);
        this.getView().byId("entryBtn").setEnabled(true);
       }
 
       
       
       
       
       
        else {
           
 
     
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
          )
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
        this.getView().byId("createTypeTable").setVisible(true).removeSelections();
        this.getView().byId("NAVOYCUR1").setText("");
        this.getView().byId("NAVOYGCURDES1").setValue("");
        this.getView().byId("NAVOYCUR2").setValue("");
        this.getView().byId("NAVOYGCURDES2").setValue("");
        this.getView().byId("editBtn").setEnabled(true);
        this.getView().byId("deleteBtn").setEnabled(true);
        this.getView().byId("copyBtn").setEnabled(true);
        this.getView().byId("entryBtn").setEnabled(true);
      },
      onDeletePress: function () {
 
        let aItems = this.byId("createTypeTable").getSelectedItems();
        let oTable = this.byId("createTypeTable")
 
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
                  oTable.removeSelections();
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
            }).catch(function (oError) {
              // Handle deletion error
              MessageBox.error("Error deleting item: " + oError.message);
            });
          });
        },
 
      pressCopy: function () {
 
        if (editFlag) {
          return;
        }
 
        if( aSelectedIds.length){
 
          if( aSelectedIds.length > 1){
 
             MessageToast.show("Please select one row");
             return
 
          }
        }else {
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
 
        this.getView().byId('entryTypeTable').setVisible(true);
 
        this.getView().byId("NAVOYCUR2").setValue(code);
        this.getView().byId("NAVOYGCURDES2").setValue(desc);
 
        this.getView().byId("mainPageFooter").setVisible(true);
 
      }
 
    });
 
  });