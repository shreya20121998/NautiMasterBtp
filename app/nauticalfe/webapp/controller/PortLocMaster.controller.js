sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"

  ],
  function (Controller, JSONModel, MessageBox, Fragment,MessageToast) {
    "use strict";

    return Controller.extend("nauticalfe.controller.PortLocMaster", {
      onInit: function () {

      }, onCreatePress: function () {

        this.getView().byId("firstTableId").setVisible(false)
        this.getView().byId("newTableId").setVisible(true)
      }, onSave: function () {
        
        var value1 =  this.getView().byId("Countryedit1").getValue();
        var value2 =  this.getView().byId("Countryedit2").getValue();
        var value3 =  this.getView().byId("Countryedit3").getValue();
        var value4 =  this.getView().byId("Countryedit4").getValue();
        var value5 =  this.getView().byId("Countryedit5").getValue();
        var value6 =  this.getView().byId("Countryedit6").getValue();
        var value7 =  this.getView().byId("Countryedit7").getValue();
        var value8 =  this.getView().byId("Countryedit8").getValue();

        var data = {
          Country:value1,
          Portc:value2,
          Portn:value3,
          Reancho:value4,
          Latitude:value5,
          Longitude:value6,
          Countryn:value7,
          Locid:value8

        };

     

        var JsonData = JSON.stringify(data)
        console.log(JsonData);

        let EndPoint = "/odata/v4/nautical/NAUTI_MAS-VOYTYP";
        fetch(EndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JsonData
        })
            .then(function (res) {
                if (res) {
                    console.log("Entity created successfully");
                    MessageToast.show(`Entity created successfully`)
                    
                    oView.getModel().refresh()
                    
                }
                else {
                    console.log("Failed");
                    MessageToast.show(`Failed`)
                }
            })
            .catch(function (err) {
                console.log("error", err);
            })


          

        this.getView().byId("firstTableId").setVisible(true)
        this.getView().byId("newTableId").setVisible(false)
      }, onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
      }, onBackPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      }, onPressExit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MastView");
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
      }
    });
  }
);