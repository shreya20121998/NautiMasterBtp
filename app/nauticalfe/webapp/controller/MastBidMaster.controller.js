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


    let inputUser = {};
    let inputValue = {};
    let inputRevalue = {};
    let inputCrcy = {};
    let inputDatatype = {};
    let inputTableName = {};
    let inputMutichoice = {};
    let saveObj = {};
    let cancelObj = {};

    return Controller.extend("nauticalfe.controller.MastBidMaster", {
      onInit: function () {
        this.getView().byId("createTypeTable").setVisible(true);
        this.getView().byId("entryTypeTable").setVisible(false);
        this.getView().byId("mainPageFooter").setVisible(false);
        this.getView().byId("updateTypeTable").setVisible(false);
      },
      onCodeLiveChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Check if the input field is for cost code
        if (oInput.getId() === this.getView().createId("Code")) {
          // Validate if the entered value is a number
          if (!(/^\d*$/.test(sValue))) {
            // If not a number, remove the last character
            var sNewValue = sValue.slice(0, -1);
            oInput.setValue(sNewValue);
            // Show an error message to the user
            sap.m.MessageToast.show(" code should only contain numbers.");
          }
        }
      },
      onBackPress: function () {
        const that = this;

        const oView = this.getView();

          let Bname1 = oView.byId("Bname").getValue().trim();
          let Code1 = oView.byId("Code").getValue().trim();
          let Value1 = oView.byId("Value").getValue().trim();
          let Cvalue1 = oView.byId("Cvalue").getValue();
          let Cunit1 = oView.byId("Cunit").getValue().trim();
          let Datatype1 = oView.byId("Datatype").getValue().trim();
          let Tablename1 = oView.byId("Tablename").getValue().trim();
          let MultiChoice1 = oView.byId("MultiChoice").getSelected();

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

           // getting original value that is selected
          let Bname = aSelectedIds[0][0];
          let Value = aSelectedIds[0][2];
          let Cvalue = aSelectedIds[0][3];
          let Cunit = aSelectedIds[0][4];
          let Datatype = aSelectedIds[0][5];
          let Tablename = aSelectedIds[0][6];
          let MultiChoice = aSelectedIds[0][7];

          if (MultiChoice1 === MultiChoice && Bname == Bname1 && Value === Value1
                 && parseFloat(Cvalue) === parseFloat(Cvalue1) && Tablename === Tablename1 
                 && Datatype === Datatype1  && Cunit === Cunit1) {

          
           that.resetView();

           return;
         }
        
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
        } else if (newEntryFlag) {
          
          
        //   if (MultiChoice1 === MultiChoice && Bname == Bname1.trim() && Value === Value1.trim()
        //   && parseFloat(Cvalue) === parseFloat(Cvalue1) && Tablename === Tablename1.trim() && Datatype === Datatype1.trim() 
        //  && Cunit === Cunit1.trim()) {
        //    MessageToast.show("nothing to update ");
        //    return;
        //  }
 
         if ( Bname1.trim() === "" && Value1.trim() === ""
         && Cvalue1.trim() === "" && Tablename1.trim() ==="" && Datatype1.trim() === "" 
         && Cunit1.trim() === "" && MultiChoice1 === false && Code1 === "") {
          this.resetView();

         }
          else {
            sap.m.MessageBox.confirm(
              "Do you want to discard the changes?", {

              title: "Confirmation",
              onClose: function (oAction) {

                if (oAction === sap.m.MessageBox.Action.OK) {
                  // If user clicks OK, reset the view to initial state
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
          let desc = aSelectedIds[0][1];
          let originalDesc = inputFieldUser.getValue();
          console.log(originalDesc, originalDesc.trim());
          if (desc === originalDesc) {

            that.onCancelPressBtn();

            //oRouter.navTo("RouteMasterDashboard");
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
                  inputFieldUser.setEditable(false);
                  saveObj.setVisible(false);
                  cancelObj.setVisible(false);
                  that.resetView();
                  //oRouter.navTo("RouteMasterDashboard");


                }

              }
            }
            )
          }

        }

      },

      onPressHome: function () {
        const that = this;
        const oRouter = this.getOwnerComponent().getRouter();
        if (aSelectedIds.length === 0 && !newEntryFlag) {

          // If no items have been selected, navigate to "RouteMasterDashboard"
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");

        } else if (copyFlag) {

          let bidMasterCode = this.getView().byId("Code").getValue().trim();
          let bidMasterCodeDesc = this.getView().byId("Cardes").getValue().trim();
          let code = aSelectedIds[0][0];
          let bidMasterDesc = aSelectedIds[0][1];

          // Check if the values are unchanged

          if (bidMasterCode === code && bidMasterCodeDesc === bidMasterDesc) {

            // If no changes have been made, reset the view to its initial state

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
                  // If user clicks Cancel, do nothing
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
          let bidMasterCode = this.getView().byId("Code").getValue().trim();
          let bidMasterCodeDesc = this.getView().byId("Cardes").getValue().trim();
          if (bidMasterCode == "" && bidMasterCodeDesc == "") {

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
                  // If user clicks Cancel, do nothing
                }
              }
            }
            );

          }

        } else if (editFlag) {

          let desc = aSelectedIds[0][1];
          let originalDesc = inputFieldUser.getValue();
          console.log(originalDesc, originalDesc.trim());
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
            let value2 = cells[1].getAggregation('items')[0].getProperty("value").trim();
            sap.m.MessageBox.confirm(

              "Do you want to discard the changes?", {

              title: "Confirmation",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  // If user clicks OK, discard changes and reset view
                  cells[1].getAggregation('items')[0].setProperty("value", aSelectedIds[0][1]);
                  that.getView().getModel().refresh();
                  inputFieldUser.setEditable(false);
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
      // on selection change table row event trigger
      selectedItems: function (oEvent) {
        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();

        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {
          if (oSelectedItem.getBindingContext()) {

            let cells = oSelectedItem.getCells();
            let oContext = oSelectedItem.getBindingContext();
            return [oContext.getProperty("Bname"), oContext.getProperty("Code"),  oContext.getProperty("Value"),oContext.getProperty("Cvalue"), oContext.getProperty("Cunit"), oContext.getProperty("Datatype"), oContext.getProperty("Tablename"), oContext.getProperty("MultiChoice")];
          } 

        });
        console.log(aSelectedIds);
        return aSelectedIds;
      },
      
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
      
      pressEdit: function () {
      

        if( editFlag){
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

        inputUser = cells[0].setEditable(true);
        inputValue = cells[2].setEditable(true);
        inputRevalue = cells[3].setEditable(true);
        inputCrcy = cells[4].setEditable(true);
        inputDatatype = cells[5].setEditable(true);
        inputTableName = cells[6].setEditable(true);
        inputMutichoice = cells[7].getAggregation('items')[0].setEditable(true);
    
        saveObj = cells[7].getAggregation('items')[1].setVisible(true);
        cancelObj = cells[7].getAggregation('items')[2].setVisible(true);

        
        this.getView().byId("deleteBtn").setEnabled(false);
        this.getView().byId("copyBtn").setEnabled(false);
        this.getView().byId("entryBtn").setEnabled(false);

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
        }
        else {
          MessageToast.show("Unselect the Selected Row !")
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
          inputUser.setEditable(false);
          inputValue.setEditable(false);
          inputRevalue.setEditable(false);
          inputCrcy.setEditable(false);
          inputDatatype.setEditable(false);
         inputTableName.setEditable(false);
         inputMutichoice.setEditable(false);

        } else {
          sap.m.MessageToast.show("Fail to Update.")
        }
      },
      onCancelPressBtn: function () {


        let that = this;
        console.log("cancel Clicked");
        let Bname = aSelectedIds[0][0];
        let Value = aSelectedIds[0][2];
        let Cvalue = aSelectedIds[0][3];
        let Cunit = aSelectedIds[0][4];
        let Datatype = aSelectedIds[0][5];
        let Tablename = aSelectedIds[0][6];
        let MultiChoice = aSelectedIds[0][7];

        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();

        let cells = aSelectedItems[0].getCells();

        let Bname1    = cells[0].getProperty("value");
        let Value1    = cells[2].getProperty("value");
        let Cvalue1   = cells[3].getProperty("value");
        let Cunit1    = cells[4].getProperty("value");
        let Datatype1 = cells[5].getProperty("value");
        let Tablename1 = cells[6].getProperty("value");
        let MultiChoice1 = cells[7].getAggregation('items')[0].getProperty("selected");

        if (MultiChoice1 === MultiChoice && Bname == Bname1.trim() && Value === Value1.trim()
         && parseFloat(Cvalue) === parseFloat(Cvalue1) && Tablename === Tablename1.trim() && Datatype === Datatype1.trim() 
        && Cunit === Cunit1) {

            inputUser.setEditable(false);
           inputValue.setEditable(false);
           inputRevalue.setEditable(false);
           inputCrcy.setEditable(false);
           inputDatatype.setEditable(false);
          inputTableName.setEditable(false);
          inputMutichoice.setEditable(false);
    
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
              cells[0].setProperty("value",Bname);
              cells[2].setProperty("value", Value);
              cells[3].setProperty("value", parseFloat(Cvalue));
              cells[4].setProperty("value", Cunit);
              cells[5].setProperty("value", Datatype);
                cells[6].setProperty("value", Tablename);
                cells[7].getAggregation('items')[0].setProperty("selected", MultiChoice);
                that.getView().getModel().refresh();
                inputUser = cells[0].setEditable(false);
                inputValue = cells[2].setEditable(false);
                 inputRevalue = cells[3].setEditable(false);
                inputCrcy = cells[4].setEditable(false);
                inputDatatype = cells[5].setEditable(false);
                inputTableName = cells[6].setEditable(false);
                inputMutichoice = cells[7].getAggregation('items')[0].setEditable(false);
          
                saveObj = cells[7].getAggregation('items')[1].setVisible(false);
                cancelObj = cells[7].getAggregation('items')[2].setVisible(false);
                
                that.resetView();


              }

            }
          }
          )
        }

      },
      onUpdatePressBtn: function () {

        let Bname = aSelectedIds[0][0];
        let Code = aSelectedIds[0][1];
        let Value = aSelectedIds[0][2];
        let Cvalue = aSelectedIds[0][3];
        let Cunit = aSelectedIds[0][4];
        let Datatype = aSelectedIds[0][5];
        let Tablename = aSelectedIds[0][6];
        let MultiChoice = aSelectedIds[0][7];

        let oTable = this.byId("createTypeTable");
        let aSelectedItems = oTable.getSelectedItems();

        let cells = aSelectedItems[0].getCells();

        let Bname1    = cells[0].getProperty("value");
        let Value1    = cells[2].getProperty("value");
        let Cvalue1   = cells[3].getProperty("value");
        let Cunit1    = cells[4].getProperty("value");
        let Datatype1 = cells[5].getProperty("value");
        let Tablename1 = cells[6].getProperty("value");
        let MultiChoice1 = cells[7].getAggregation('items')[0].getProperty("selected");

        if (MultiChoice1 === MultiChoice && Bname == Bname1.trim() && Value === Value1.trim()
         && parseFloat(Cvalue) === parseFloat(Cvalue1) && Tablename === Tablename1.trim() && Datatype === Datatype1.trim() 
        && Cunit === Cunit1.trim()) {
          MessageToast.show("nothing to update ");
          return;
        }

        if ( Bname1.trim() === "" || Value1.trim() === ""
        || Cvalue1.trim() === "" || Tablename1.trim() ==="" || Datatype1.trim() === "" 
        || Cunit1.trim() === "") {
          MessageToast.show("Please fill empty field fields ");
          return
        }

        let UpData = {
          Bname: Bname1,
          Code: Code,
          Value : Value1,
          Cvalue : parseFloat(Cvalue1),
          Cunit: Cunit1,
          Datatype : Datatype1,
          Tablename : Tablename1,
          MultiChoice : MultiChoice1


        };

        // console.log(data);

        let oModel = this.getView().getModel();
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

        let oBindList = oModel.bindList("/BidMasterSet", {
          $$updateGroupId: "update"
        });


        oBindList.attachPatchSent(this.onPatchSent, this);
        oBindList.attachPatchCompleted(this.onPatchCompleted, this);

        let oFilter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.EQ, UpData.Code);
        oBindList.filter(oFilter);

        let that = this;

        oBindList.requestContexts().then(function (aContexts) {

          if (aContexts.length > 0) {
            let aData = [];
            aContexts.forEach(context => {
              aData.push(context.getObject());
            });
            console.log("addata", aData);

            let data = aData.filter(item => item.Code == UpData.Code);
            // console.log("fghj", data, UpData.Code);

            // console.log("hello");
            let path = `/BidMasterSet('${UpData.Code}')`;

            let upContext = aContexts.filter(obj => obj.sPath === path);

                cells[0].setProperty("value",Bname1);
            cells[2].setProperty("value",Value1);
            cells[3].setProperty("value",Cvalue1);
            cells[4].setProperty("value",Cunit1);
            cells[5].setProperty("value",Datatype1);
            cells[6].setProperty("value",Tablename1);
            cells[7].getAggregation('items')[0].setProperty("selected", MultiChoice1);


            that.getView().getModel().refresh();

            upContext[0].setProperty("Bname", UpData.Bname.trim());
            // upContext[2].setProperty("Value", UpData.Value.trim());
            // upContext[3].setProperty("Cvalue", UpData.Cvalue);
            // upContext[4].setProperty("Cunit", UpData.Cunit.trim());
            // upContext[5].setProperty("Datatype", UpData.Datatype.trim());
            // upContext[6].setProperty("Tabletype", UpData.Tablename.trim());
            // upContext[7].setProperty("MultiChoice", UpData.MultiChoice);

          }
        });

        oModel.submitBatch("update");
    
      },

      
      // onUpdateOldCode: function () {
      //   let value1 = aSelectedIds[0][0];
      //   let value2 = this.getView().byId("CARDES1").getValue();

      //   let UpData = {
      //     Code: value1,
      //     Cardes: value2
      //   };

      //   let nomModel = this.getView().getModel();
      //   let oBindList = nomModel.bindList("/CarTypeSet", {
      //     $$updateGroupId: "update"
      //   });

      //   oBindList.attachPatchSent(this.onPatchSent, this);
      //   oBindList.attachPatchCompleted(this.onPatchCompleted, this);

      //   let oFilter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.EQ, UpData.Code);
      //   oBindList.filter(oFilter);

      //   oBindList.requestContexts().then(function (aContexts) {
      //     if (aContexts.length > 0) {
      //       let aData = [];
      //       aContexts.forEach(context => {
      //         aData.push(context.getObject())
      //       });

      //       let data = aData.filter(item => item.Code == UpData.Code);

      //       if (data?.Cardes === UpData.Cardes) {
      //         sap.m.MessageToast.show("Nothing to Update..")
      //       } else {
      //         let path = `/CarTypeSet('${UpData.Code}')`;
      //         let upContext = aContexts.filter(obj => obj.sPath === path);
      //         upContext[0].setProperty("Cardes", UpData.Cardes);
      //       }
      //     }
      //   });

      //   nomModel.submitBatch("update");
      // },

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
        const that = this;
        const oView = this.getView();

        let Bname = oView.byId("Bname").getValue();
        let Code = oView.byId("Code").getValue();
        let Value = oView.byId("Value").getValue();
        let Cvalue = oView.byId("Cvalue").getValue();
        let Cunit = oView.byId("Cunit").getValue();
        let Datatype = oView.byId("Datatype").getValue();
        let Tablename = oView.byId("Tablename").getValue();
        let MultiChoice = oView.byId("MultiChoice").getSelected();
        
        if (!Bname || !Code || !Value || !Cvalue || !Cunit || !Cunit || !Datatype || !Tablename || !MultiChoice) {
          MessageToast.show("Please enter all fields."); return;
        }

        let data = {
          Bname: Bname,
          Code: Code,
          Value : Value,
          Cvalue : parseFloat(Cvalue),
          Cunit: Cunit,
          Datatype : Datatype,
          Tablename : Tablename,
          MultiChoice : MultiChoice


        };

        const oJsonModel = new sap.ui.model.json.JSONModel(data);
        this.getView().setModel(oJsonModel, "oJsonModel");
        let oModel = this.getView().getModel();

        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

        let oBindListSP = oModel.bindList("/BidMasterSet");

        oBindListSP.attachCreateSent(this.onCreateSent, this);
        oBindListSP.attachCreateCompleted(this.onCreateCompleted, this);

        oBindListSP.attachEventOnce("dataReceived", function () {

          let existingEntries = oBindListSP.getContexts().map(function (context) {
            return context.getProperty("Code");
          });

          if (existingEntries.includes(Code)) {
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

      onCancelEdit: function () {
        const that = this;
        let updatedValue = this.byId("Cardes1").getValue().trim();
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
        
        let Bname, Code, Value, Cvalue, Cunit, Datatype, Tablename, MultiChoice;
        const that = this;
        let Bname1 = oView.byId("Bname").getValue().trim();
          let Code1 = oView.byId("Code").getValue().trim();
          let Value1 = oView.byId("Value").getValue().trim();
          let Cvalue1 = oView.byId("Cvalue").getValue();
          let Cunit1 = oView.byId("Cunit").getValue().trim();
          let Datatype1 = oView.byId("Datatype").getValue().trim();
          let Tablename1 = oView.byId("Tablename").getValue().trim();
          let MultiChoice1 = oView.byId("MultiChoice").getSelected();

        if (aSelectedIds.length) {

           Bname = aSelectedIds[0][0];
           Code = aSelectedIds[0][1];
           Value = aSelectedIds[0][2];
           Cvalue = aSelectedIds[0][3];
           Cunit = aSelectedIds[0][4];
           Datatype = aSelectedIds[0][5];
           Tablename = aSelectedIds[0][6];
           MultiChoice = aSelectedIds[0][7];
        }
        //console.log(selectedEntryCode, selectedEntryDesc, updatedCode, updatedValue);

        if (MultiChoice1 === MultiChoice && Bname == Bname1 && Value === Value1
          && parseFloat(Cvalue) === parseFloat(Cvalue1) && Tablename === Tablename1 
          && Datatype === Datatype1  && Cunit === Cunit1 && copyFlag == true) {

   
         that.resetView();}
        else if ( Bname1.trim() === "" && Value1.trim() === ""
        && Cvalue1.trim() === "" && Tablename1.trim() ==="" && Datatype1.trim() === "" 
        && Cunit1.trim() === "" && MultiChoice1 === false && Code1 === "") {
         this.resetView();

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
        const that = this;

        aItems.forEach(function (oItem) {
          const oContext = oItem.getBindingContext();
          oContext.delete().then(function () {
            // Successful deletion
            MessageToast.show("Record deleted sucessfully");
            aSelectedIds = []

          }).catch(function (oError) {
            // Handle deletion error
            MessageBox.error("Error deleting item: " + oError.message);
          });
        });
      },

      pressCopy: function () {
        const oView = this.getView();

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
        
        let Bname = aSelectedIds[0][0];
        let Code = aSelectedIds[0][1];
        let Value = aSelectedIds[0][2];
        let Cvalue = aSelectedIds[0][3];
        let Cunit = aSelectedIds[0][4];
        let Datatype = aSelectedIds[0][5];
        let Tablename = aSelectedIds[0][6];
        let MultiChoice = aSelectedIds[0][7];

        oView.byId("Bname").setValue(Bname);
        oView.byId("Code").setValue(Code);
        oView.byId("Value").setValue(Value);

        oView.byId("Cvalue").setValue(parseFloat(Cvalue));
        oView.byId("Cunit").setValue(Cunit)
        oView.byId("Datatype").setValue(Datatype)
        oView.byId("Tablename").setValue(Tablename)
        oView.byId("MultiChoice").setSelected(MultiChoice);

       

        this.getView().byId('entryTypeTable').setVisible(true);
        this.getView().byId("mainPageFooter").setVisible(true);
        

      }
    });
  });
// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/routing/History",
//     "sap/m/MessageToast",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageBox",
//   ],
//   function (BaseController,History,MessageToast,JSONModel,MessageBox) {
//     "use strict";
//     let aSelectedIds = [];
 
//     return BaseController.extend("nauticalfe.controller.MastBidMaster", {
//       onInit() {
//       }, 
//       selectedItems: function (oEvent) {
//         // console.log("hello");
//         let oTable = oEvent.getSource();
//         let aSelectedItems = oTable.getSelectedItems();
 
 
//         aSelectedIds = aSelectedItems.map(function (oSelectedItem) {
//           if (cells) {
//             let cells = oSelectedItem.getCells();
//             // console.log(cells);
//             let bindContext = cells;
 
//             return [
//               bindContext.getProperty("Bname"),
//               bindContext.getProperty("Code"),
//               bindContext.getProperty("Value"),
//               bindContext.getProperty("Cvalue"),
//               bindContext.getProperty("Cunit"),
//               bindContext.getProperty("Datatype"),
//               bindContext.getProperty("Tablename"),
//               bindContext.getProperty("MultiChoice"),
//             ]
//           } else {
//           }
 
//         });
//         console.log(aSelectedIds);
//         return aSelectedIds;
 
//       },

//       onBackPress: function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.navTo("RouteMasterDashboard");
//       },
//       onBackPressHome: function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.navTo("RouteHome");
//       },
//       onExit: function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.navTo("RouteHome");
//       }, 
//       newEntries: function () {
//         this.getView().byId("createTypeTable").setVisible(false)
//         this.getView().byId("entryTypeTable").setVisible(true)
//         this.getView().byId("mainPageFooter").setVisible(true)
//       },

//       onSave: function () {
//         // var that = this.getView();
//         var Bname =  this.byId("Bname").getValue();
//         var Code =  this.byId("Code").getValue();
//         var Value =  this.byId("Value").getValue();
//         var Cvalue =  this.byId("Cvalue").getValue();
//         var Cunit =  this.byId("Cunit").getValue();
//         var Datatype =  this.byId("Datatype").getValue();
//         var Tablename =  this.byId("Tablename").getValue();
//         var MultiChoice =  this.byId("MultiChoice").getSelected();
       
//         // Validation check
//         if (!Bname || !Code || !Value || !Cvalue || !Cunit || !Datatype || !Tablename) {
//             sap.m.MessageToast.show("Error: Please enter all data.");
//             return;
//         }
    
//         let oModel = this.getView().getModel();
//         let oBindListSP = oModel.bindList("/BidMasterSet");
    
//         oBindListSP.attachEventOnce("dataReceived", () => {
//           try {
//             let existingEntries = oBindListSP.getContexts().map(function (context) {
//                 return context.getProperty("Code");
//             });
    
//             if (existingEntries.includes(Code)) {
//                 sap.m.MessageToast.show("Duplicate Voyage Code is not allowed");
//             } else { 
//                 oBindListSP.create({
                    // Bname: Bname,
                    // Code: Code,
                    // Value: Value,
                    // Cvalue: Cvalue,
                    // Cunit: Cunit,
                    // Datatype: Datatype,
                    // Tablename: Tablename,
                    // MultiChoice: MultiChoice
//                 });
    
             
    
//                 // Clear input fields
//                 this.getView().getContent().forEach(function (control) {
//                   if (control instanceof sap.m.Input) {
//                       control.setValue("");
//                   }
//               });
    
//                 sap.m.MessageToast.show("Data created successfully");
//                 oModel.refresh();
    
//                 this.byId("createTypeTable").setVisible(true);
//                 this.byId("entryTypeTable").setVisible(false);
//                 this.byId("mainPageFooter").setVisible(false);
//             }
//           } catch (error) {
//             console.error("Error while saving data:", error);
//             sap.m.MessageToast.show("Error while saving data. See console for details.");
//           }
//         });
    
//         oBindListSP.getContexts(0, 100);
//       },

//       pressCopy: function () {
//         if (aSelectedIds.length) {
//             if (aSelectedIds.length > 1) {
//                 MessageToast.show("Please select one row");
//                 return;
//             }
//         } else {
//             MessageToast.show("Please select a row");
//             return;
//         }
//         var view = this.getView();
//         this.getView().byId("createTypeTable").setVisible(false);
    
//         var Bname = aSelectedIds[0][0];
//         var Code = aSelectedIds[0][1];
//         var Value = aSelectedIds[0][2];
//         var Cvalue = aSelectedIds[0][3];
//         var Cunit = aSelectedIds[0][4];
//         var Datatype = aSelectedIds[0][5];
//         var Tablename = aSelectedIds[0][6];
//         var MultiChoice = aSelectedIds[0][7];
    
//         view.byId("Bname").setValue(Bname);
//         view.byId("Code").setValue(Code);
//         view.byId("Value").setValue(Value);
//         view.byId("Cvalue").setValue(Cvalue);
//         view.byId("Cunit").setValue(Cunit);
//         view.byId("Datatype").setValue(Datatype);
//         view.byId("Tablename").setValue(Tablename);
//         view.byId("MultiChoice").setSelected(MultiChoice);
    
//         view.byId("entryTypeTable").setVisible(true);
//         view.byId("mainPageFooter").setVisible(true);
//       },
    
      
//       pressEdit: function () {
//         if (aSelectedIds.length) {
//             if (aSelectedIds.length > 1) {
//                 sap.m.MessageToast.show("Please select one row");
//                 return;
//             }
//         } else {
//             sap.m.MessageToast.show("Please select a row");
//             return;
//         }
    
//         var view = this.getView();
//         view.byId("createTypeTable").setVisible(false);
    
//         var Bname = aSelectedIds[0][0];
//         var Code = aSelectedIds[0][1];
//         var Value = aSelectedIds[0][2];
//         var Cvalue = aSelectedIds[0][3];
//         var Cunit = aSelectedIds[0][4];
//         var Datatype = aSelectedIds[0][5];
//         var Tablename = aSelectedIds[0][6];
//         var MultiChoice = aSelectedIds[0][7];
    
//         view.byId("Bname1").setValue(Bname);
//         view.byId("Code1").setValue(Code);
//         view.byId("Value1").setValue(Value);
//         view.byId("Cvalue1").setValue(Cvalue);
//         view.byId("Cunit1").setValue(Cunit);
//         view.byId("Datatype1").setValue(Datatype);
//         view.byId("Tablename1").setValue(Tablename);
//         view.byId("MultiChoice1").setSelected(MultiChoice);
    
//         view.byId("updateTypeTable").setVisible(true);
//         view.byId("mainPageFooter2").setVisible(true);
//       },
    
//       onUpdate : function(){
         
//         let Bname = this.getView().byId("Bname1").getValue() ;
//         let Code =   aSelectedIds[0][1];
//         let Value =  this.getView().byId("Value1").getValue();
//         let Cvalue =  this.getView().byId("Cvalue1").getValue();
//         let Cunit =  this.getView().byId("Cunit1").getValue();
//         let Datatype =  this.getView().byId("Datatype1").getValue();
//         let Tablename =  this.getView().byId("Tablename1").getValue();
//         let MultiChoice =  this.getView().byId("MultiChoice").getSelected();
        
//         let data = {
//           Bname: Bname,
//           Code: Code,
//           Value: Value,
//           Cvalue: Cvalue,
//           Cunit: Cunit,
//           Datatype: Datatype,
//           Tablename: Tablename,
//           MultiChoice: MultiChoice
//         };
//         console.log(data);
 
 
//         var oView = this.getView();
//         var JsonData = JSON.stringify(data)
//         console.log(data.Code);
//         let EndPoint = "/odata/v4/nautical/BidMasterSet/"+data.Code;
//         console.log(EndPoint);
//         fetch(EndPoint, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JsonData
//         })
//           .then(function (res) {
           
//             if (res.ok) {
//               // location.reload();
//               console.log("Entry updated successfully");
//               MessageToast.show(`Entry updated successfully`);
//               oView.getModel().refresh();
//               oView.byId("createTypeTable").setVisible(true)
       
//              oView.byId("mainPageFooter2").setVisible(false);
//              oView.byId("updateTypeTable").setVisible(false);
             
 
//             }
//             else {
//               res.json().then((data) => {
//                 if (data && data.error && data.error.message) {
//                     // Show the error message from the backend
//                     MessageBox.error(data.error.message);
//                     return
//                 }
//                 });
//             }
//           })
//           .catch(function (err) {
//             console.log("error", err);
//           })
         
 
//       },
    
//       onDeletePress: function () {
 
//         let aItems = this.byId("createTypeTable").getSelectedItems();
 
//         if (!aItems.length) {
 
//           MessageToast.show("Please Select  Items ");
 
//           return;
//         }
 
//         const that = this;  // creatinh reference for use in Dialog
//         sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
//           MessageBox.confirm(
//             "Are you sure  to delete the selected items?", {
//             title: "Confirm ",
//             onClose: function (oAction) {
//               if (oAction === MessageBox.Action.OK) {
//                 // User confirmed deletion
//                 that.deleteSelectedItems(aItems);
//               } else {
//                 // User canceled deletion
//                 sap.m.MessageToast.show("Deletion canceled");
//               }
//             }
//           }
//           );
//         });
 
//       }, 

//       deleteSelectedItems: function (aItems) {
//         aItems.forEach(function (oItem) {
//           oItem.getBindingContext().delete().catch(function (oError) {
//             if (!oError.canceled) {
//               // Error was already reported to message model
//             }
//           });
//         });
//       },

//       onCancel: function () {
//         this.getView().byId("createTypeTable").setVisible(true).removeSelections();
//         this.getView().byId("updateTypeTable").setVisible(false);
//         this.getView().byId("entryTypeTable").setVisible(false);
//         this.getView().byId("mainPageFooter").setVisible(false);
//         this.getView().byId("mainPageFooter2").setVisible(false);
//       },

      

      
      
 
 
 
      
 
      



//     });
//   }
// );