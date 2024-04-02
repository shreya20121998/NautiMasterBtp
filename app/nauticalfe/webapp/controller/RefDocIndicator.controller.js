sap.ui.define(
  [
      "sap/ui/core/mvc/Controller",
      "sap/m/ColumnListItem",
      "sap/m/Text",
      "sap/m/Select",
      "sap/ui/core/Item",
      "sap/ui/core/Fragment",
      "sap/ui/core/routing/History"
  ],
  function(BaseController,ColumnListItem, Text, Select, Item,Fragment,History) {
    "use strict";

    return BaseController.extend("nauticalfe.controller.RefDocIndicator", {

      onInit() {
      },
      onBackPress: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMasterDashboard");
      },
      onPressHome: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteHome");
      },
      onCreatePress: function() {
        // Get the reference to the table by its ID
        var oTable = this.byId("firstTableId");

        // Create a new row (ColumnListItem)
        var oNewRow = new ColumnListItem();

        // Add cells to the new row
        oNewRow.addCell(new Select({
            items: [
                new Item({ text: "SALES CONTRACT" }),
                new Item({ text: "PURCHASE CONTRACT" }),
                new Item({ text: "SALES ORDER" }),
                new Item({ text: "PURCHASE ORDER" }),
                new Item({ text: "NOMINATION KEY" }),
                
                // Add more items as needed
             ]
          }));

              oNewRow.addCell(new Text({ text: "" }));
              oNewRow.addCell(new Text({ text: "" }));
              // Add more cells as needed

              // Add the new row to the table
              oTable.addItem(oNewRow);
        },
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
        
    

    });
  }
);
