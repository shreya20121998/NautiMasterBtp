sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function( BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.TrChangeVoyage", {
        onInit() {
          var hideButton = this.byId("Hide");
          var hideButton1 = this.byId("Hide1");
          if (hideButton) {
                hideButton.attachPress(this.toggleNavContainer.bind(this));
          }
          if (hideButton1) {
            hideButton1.attachPress(this.toggleBarAndNavContainer.bind(this));
        }
          

        },
        handleNav: function(evt) {
          var navCon = this.byId("navCon");
          var target = evt.getSource().data("target");
          if (target) {
              var animation = this.byId("animationSelect").getSelectedKey();
              navCon.to(this.byId(target), animation);
          } else {
              navCon.back();
          }
      },
      //  for navigation of nav container 2 
        handleNavToPanelA: function() {
        this.navigateToPanel("panelA");
       },

       handleNavToPanelB: function() {
        this.navigateToPanel("panelB");
      },

      navigateToPanel: function(panelId) {
          var navCon = this.byId("navCon2");
          navCon.to(this.byId(panelId));
      }, 
        
        
         // for visiblity of nav container 1
          toggleNavContainer: function() {
            var navCon = this.byId("navCon");
            var bar = this.byId("HBox10");
            // Get the current visibility state of the NavContainer
            var currentVisibility = navCon.getVisible();
            
            // Toggle the visibility state
            navCon.setVisible(!currentVisibility);
            bar.setVisible(!currentVisibility);
            

          },
          // for visiblity of nav container 2
          toggleBarAndNavContainer: function() {
            var navCon2 = this.byId("navCon2");
            var bar2 = this.byId("HBox20");
            var currentVisibility = navCon2.getVisible();

            navCon2.setVisible(!currentVisibility);
            bar2.setVisible(!currentVisibility);
        },
        
    
    
    
        
      });
    }
  );
  