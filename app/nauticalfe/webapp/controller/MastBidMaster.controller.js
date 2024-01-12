
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
  ],
  function (BaseController,History,MessageToast) {
    "use strict";
 
    return BaseController.extend("nauticalfe.controller.MastBidMaster", {
      onInit() {
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


      },onSave: function () {

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

      }
    });
  }
);