sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.TrCompareLivefrieghtReport", {
        onInit() {
            
        },
        onSaveAs:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSaveAsVariant");
        },
        openDialogWithNavContainer: function() {
          // Create Page 1 content
          var oPage1Content = new sap.m.VBox({
              items: [
                  new sap.m.Text({ text: "Content for Page 1" }),
                  new sap.m.Button({
                      text: "Go to Page 2",
                      press: function() {
                          oNavContainer.to(oPage2);
                      }
                  })
              ]
          });
      
          // Create Page 1
          var oPage1 = new sap.m.Page({
              title: "Page 1",
              content: oPage1Content
          });
      
          // Create Page 2 content
          var oPage2Content = new sap.m.VBox({
              items: [
                  new sap.m.Text({ text: "Content for Page 2" }),
                  new sap.m.Button({
                      text: "Go to Page 1",
                      press: function() {
                          oNavContainer.to(oPage1);
                      }
                  })
              ]
          });
      
          // Create Page 2
          var oPage2 = new sap.m.Page({
              title: "Page 2",
              content: oPage2Content
          });
      
          // Create the NavContainer
          var oNavContainer = new sap.m.NavContainer({
              initialPage: oPage1,
              pages: [oPage1, oPage2]
          });
      
          // Create the Dialog
          var oDialog = new sap.m.Dialog({
              title: "Dialog with NavContainer",
              contentWidth: "80%",
              contentHeight: "80%",
              draggable: true,
              content: [oNavContainer],
              endButton: new sap.m.Button({
                  text: "Close",
                  press: function() {
                      oDialog.close();
                  }
              })
          });
      
          // Open the Dialog
          oDialog.open();
      }
      
         });
    }
  );
  