sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/core/routing/History",
  "sap/m/MessageToast",
  "sap/m/MessageBox"

],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,Fragment,History,MessageBox) {
      "use strict";

      return Controller.extend("nauticalfe.controller.MastPortUpload", {
          onInit: function () {

          },
          
          onPress: function () {
            var oView = this.getView(),
            oButton = oView.byId("button");
            if (!this._oMenuFragment) {
              this._oMenuFragment = Fragment.load({
                name: "nauticalfe.fragments.MastUpdDropDown",
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
         
          onExit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("MastView");
          },onBackPressHome: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1");
          },
          backPress:function(){
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
   
            if (sPreviousHash !== undefined) {
              window.history.go(-1);
            } else {
              const oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("MastView", {}, true);
            }
         },




        onDownloadPress: function () {
          // Handle the press event for "Download as Template" button

          // Add logic to download the template
          this.downloadTemplate();
      },

      downloadTemplate: function () {
          // Add logic to generate and download the template file

          // For example, you can create a Blob with the template content
          var templateContent = "Your template content here";
          var blob = new Blob([templateContent], { type: "application/octet-stream" });

          // Create a temporary link element and trigger the download
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "template.txt";
          link.click();

          // Clean up
          window.URL.revokeObjectURL(link.href);
      },

      onSaveAs:function(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteSaveAsVariant");
      },
      fileupload:function(){

        var oView = this.getView()
        if(!this.byId('fileUpload')){

            Fragment.load({
                name:"nauticalfe.fragments.MastFileUpload",
                controller:this,
                id:oView.getId()
            }).then(function(oDialog){
                oDialog.open()
            })
        }
        else{
            this.byId('fileUpload').open()
        }
    },
    exitDialog:function(){
        var oDialog = this.byId('fileUpload');
        if (oDialog) {
            oDialog.close();
        }
    },
    onFileSelect:function(oEvent){
      console.log("selected");
      var oFileUploader = oEvent.getSource();
      var sFileName = oFileUploader.getValue();
      console.log(sFileName)

      // Set the file name to the Input field
      var oFileNameInput = this.byId("_IDGenInput1");
      oFileNameInput.setValue(sFileName);

      this.exitDialog();
    }

      });
});

          
      
  