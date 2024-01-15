sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    
  ],
  function (Controller,History,Fragment, MessageToast , MessageBox) {
    "use strict";
    let aSelectedIds =[];
    

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
           
            return [oSelectedItem.getBindingContext().getProperty("ZF_VALUE"), oSelectedItem.getBindingContext().getProperty("ZF_DESC")]
 
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

        var value1 =  this.getView().byId("CLASSFIELD").getValue();
        var value2 =  this.getView().byId("CLASSDESC").getValue();


        
        var data = {

          ZF_VALUE: value1,

          ZF_DESC: value2

        };
        console.log(data);


       let that = this;
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/CLASS";
        fetch(EndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then(function (res) {
            
            if (res.ok) {
              
              console.log("Entity created successfully");
              MessageToast.show(`Entity created successfully`);
              that.getView().getModel().refresh();

             

            }
            else {
              res.json().then(data=>{
                if( data && data.error && data.error.message){
                  MessageBox.error(data.error.message)
                }
              })
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })
          this.getView().byId("createTypeTable").setVisible(true)
          this.getView().byId("entryTypeTable").setVisible(false)
          this.getView().byId("mainPageFooter").setVisible(false)
          that.getView().getModel().refresh();
      },
      onCancel: function(){
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("CLASSFIELD").setValue();
        this.getView().byId("CLASSDESC").setValue();
        this.getView().byId("mainPageFooter").setVisible(true)
  
  
  
      },
        
      pressEdit : function(){
 
        if( aSelectedIds.length){
          if( aSelectedIds.length > 1){
             MessageToast.show("Please select one row");
             return
          }
        }else {
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
      onUpdate : function(){
        
        let value1 =  aSelectedIds[0][0];
        let value2 =  this.getView().byId("CLASSDESC1").getValue() ;
  
        let data = {
          ZF_VALUE : value1,
          
          ZF_DESC: value2
  
        };
        console.log(data);
  
        var oView = this.getView();
        var JsonData = JSON.stringify(data)
        let EndPoint = "/odata/v4/nautical/CLASS/"+ data.ZF_VALUE;
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

      pressCopy: function () {

            if( aSelectedIds.length){
              if( aSelectedIds.length > 1){
                  MessageToast.show("Please select one row");
                  return
              }
            }else {
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
