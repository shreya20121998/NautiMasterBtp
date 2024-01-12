sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History"
 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment,History) {
        "use strict";
 
        return Controller.extend("nauticalfe.controller.MastMarinePathUpd", {
            onInit: function () {
 
            },
            //file upload dialog box and it's functions
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
            //file upload dialog box and it's functions implementation ends here
           
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
        });
});
 
           
       
   
 