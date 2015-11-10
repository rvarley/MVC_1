; //defensive semicolon

function ModelWrapper() {
  
  "use strict";
  var model = {}; // model object lies outside of the methods.
 
  var Model = {

    getModel : function() { 
     
      $(document).ready(function() {
        var url = "https://spreadsheets.google.com/";
        var feedType = "feeds/cells/";
        var key = "1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/";
        var sheetID = "od6/";
        var etc = "public/values?alt=json"

        $.getJSON(url + feedType + key + sheetID + etc, function(data) {
          //var model = {}; //originally an array, now an object.
          var col_high = 0;

          $.each(data.feed.entry, function(key, value) {
            var cur_col = Number(value.gs$cell.col);  //Returns column value
            if (cur_col > col_high) {
              col_high = cur_col; //reset the value as we iterate
              model[(cur_col).toString()] = {};
              }
              model[value.gs$cell.col][value.gs$cell.row] = value.gs$cell.$t;
            }); // End .each
            console.log("inside = ", model);
          }); // End .getJSON
          console.log("outer = ", model);
      }); // End JQuery wrapper
    
    }, // End getModel()

    setModel : function(to_post) { // input parameters

      var data = {};
      $.each(to_post, function(k, v) {
          data[model[k]["1"]] = v;
      })
      var address = "https://sheetsu.com/apis/0a299348";
      $.post(address, data);
    }

  }; //End Model


  Model.getModel();
  console.log(model);
  Model.setModel("100", "z", "Test2");

} // End ModelWrapper
ModelWrapper();
