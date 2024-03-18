sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
    
  ],
  function (Controller,History,Fragment,MessageToast, MessageBox) {
    "use strict";
    let aSelectedIds=[];
    let copyFlag = false;
    let editFlag = false;
    var initialVoycd = "";
    var initialVoydes = "";
    
  

 
    return Controller.extend("nauticalfe.controller.MasterVoyageType", {
 
      onInit: function () {
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);
        // this.getView().setModel(oNewModel, "newModelName");
 
      },
     
      onBackPress: function () {
       

        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMasterDashboard");
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
        }
        else {
          this._oMenuFragment.openBy(oButton);
        }
      },
      
      onBackPressHome: function () {
        const that = this;
        let voyDes = this.getView().byId("voyCodeDesc1").getValue().trim();
        let voyDes3 = this.getView().byId("voyCode").getValue().trim();
        let voyDes2= this.getView().byId("voyCodeDesc").getValue().trim();

        let getvoyCodeDesc2 = aSelectedIds[0][0];
        let getvoyCodeDesc1 = aSelectedIds[0][1]; // Assuming aSelectedIds is accessible here
   
        if (voyDes == getvoyCodeDesc1 ) {
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
           
            return [oSelectedItem.getBindingContext().getProperty("Voycd"), oSelectedItem.getBindingContext().getProperty("Voydes")]
 
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
        }
        else {
          MessageToast.show("Unselect the Selected Row !")
        }
 
      },
     
      pressEdit : function(){
        if (copyFlag) {
          return
        }
 
        if( aSelectedIds.length){
          if( aSelectedIds.length > 1){
             MessageToast.show("Please select one Item");
             return
          }
        }else {
          MessageToast.show("Please select a Item");
          return;
        }
        editFlag= true;
        this.getView().byId("deleteBtn").setEnabled(false);
        this.getView().byId("copyBtn").setEnabled(false);
        this.getView().byId("entryBtn").setEnabled(false);
        this.getView().byId("createTypeTable").setVisible(false);
        let code = aSelectedIds[0][0];
        let desc = aSelectedIds[0][1];
        this.getView().byId("voyCode1").setText(code);
        this.getView().byId("voyCodeDesc1").setValue(desc);
        this.getView().byId('updateTypeTable').setVisible(true);
        // console.log(aSelectedIds[0][0], aSelectedIds[0][1]);
        this.getView().byId("mainPageFooter2").setVisible(true);
 
        // this.onUpdate(code, desc);
 
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
        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
      },
      onUpdate: function(){
        let value1 = aSelectedIds[0][0];
        let value2 = this.getView().byId("voyCodeDesc1").getValue().trim();
        
        if (value2 == "") {
          MessageToast.show("Please Enter Description.");
          return
        }
       
        let UpData = {
          Voycd : value1,
         
          Voydes: value2
 
        };
        // console.log(data);
 
        let oModel = this.getView().getModel();
        let oBindList = oModel.bindList("/VoyTypeSet", {
          $$updateGroupId: "update"
         });
 
         oBindList.attachPatchSent(this.onPatchSent, this);
         oBindList.attachPatchCompleted(this.onPatchCompleted, this);
 
        let oFilter = new sap.ui.model.Filter("Voycd", sap.ui.model.FilterOperator.EQ, UpData.Voycd);
        oBindList.filter(oFilter);
 
        oBindList.requestContexts().then(function (aContexts) {
         
          if (aContexts.length > 0) {
            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject())
            });
            console.log("addata", aData);
           
            let data = aData.filter(item=>item.Voycd == UpData.Voycd);
            console.log("fghj",data, UpData.Voydes);
 
            if (data[0]?.Voydes === UpData.Voydes) {
              sap.m.MessageToast.show("Nothing to Update....make some change.")
            } else {
              let path = `/VoyTypeSet('${UpData.Voycd}')`;
 
            let upContext = aContexts.filter(obj=>obj.sPath=== path);
            // console.log(upContext);
            upContext[0].setProperty("Voydes", UpData.Voydes);
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
        var value1 = this.getView().byId("voyCode").getValue();
        var value2 = this.getView().byId("voyCodeDesc").getValue();
 
        if (!value1 || !value2) {
          MessageToast.show("Please enter both fields.");
          return;
        }
 
        let data = {
          Voycd: value1,
 
          Voydes: value2
        };
        const oJsonModel = new sap.ui.model.json.JSONModel(data);
        that.setModel(oJsonModel, "oJsonModel");
        let oModel = this.getView().getModel();
        let oBindListSP = oModel.bindList("/VoyTypeSet");
 
        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);
 
        oBindListSP.attachEventOnce("dataReceived", function () {
          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("Voycd");
          });
 
          if (existingEntries.includes(value1)) {
            MessageToast.show("Entry already exists with same code.");
          } else {
 
            try {
              oBindListSP.create({
                Voycd: value1,
                Voydes: value2
              });
              that.getModel().refresh();
              that.byId("voyCode").setValue("");
              that.byId("voyCodeDesc").setValue("");
 
              MessageToast.show("Data created Successfully");
 
              that.byId("createTypeTable").setVisible(true);
              that.byId("createTypeTable").removeSelections();
              aSelectedIds =[]
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
          let voyDes = this.getView().byId("voyCodeDesc1").getValue().trim();
          let voyDes3 = this.getView().byId("voyCode").getValue().trim();
          let voyDes2= this.getView().byId("voyCodeDesc").getValue().trim();
          
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
        this.getView().byId("voyCode1").setText("");
        this.getView().byId("voyCodeDesc1").setValue("");
        this.getView().byId("voyCode").setValue("");
        this.getView().byId("voyCodeDesc").setValue("");
        this.getView().byId("editBtn").setEnabled(true);
        this.getView().byId("deleteBtn").setEnabled(true);
        this.getView().byId("copyBtn").setEnabled(true);
        this.getView().byId("entryBtn").setEnabled(true);
      },
     
     
      onDeletePress: function () {
        if (copyFlag || editFlag) {
          return
        }

 
        let aItems = this.byId("createTypeTable").getSelectedItems();
        let oTable = this.byId("createTypeTable");
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
              aSelectedIds = []
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
        this.getView().byId("voyCode").setValue(code);
        this.getView().byId("voyCodeDesc").setValue(desc);
 
        this.getView().byId("mainPageFooter").setVisible(true);
      }
   

    });
 
  });