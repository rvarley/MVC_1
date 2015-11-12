function Wrapper() {
    'use strict';
    var model = {};

    var Model = { //Back end, talks to data structure and passes info to controller to be sent to the view
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

    setModel : function(num_val, alpha_val, greet_val) { // input parameters

        var data = {};
        $.each(to_post, function(k, v) { 
            data[model[k]["1"]] = v;
      })
      var address = "https://sheetsu.com/apis/0a299348";
      $.post(address, data);
    }
};

    var Controller = {        
        getData : function() {
            return Model.data;
        },

        updateData : function(data, position) {
            Model.set(data, position);// position ~= column 
            return this.getData(); 
        },

        eventHandler : function(input) {
            if(input.target.className === 'submit') {
                this.updateData(data, end_of_list);
                
            }
        }
    };

    var View = {
        var table = $('table')
        var tabrow = document.getElementsByTagName('tr');
        var url = "https://spreadsheets.google.com/feeds/cells/1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/od6/public/values?alt=json";

        $.getJSON(url, function(data) {
            $variable = data
            forElements();
        });

        forElements = function() {
            for (var i = 0; i < $variable.feed.entry.length; i++){
                var row = $variable.feed.entry[i].gs$cell.row;
                var col = $variable.feed.entry[i].gs$cell.col;
                var txt = $variable.feed.entry[i].gs$cell.$t;
                createCell(row, col, txt)
            }
        };

        createCell = function(row, col, txt) {
            if (!tabrow[row-1]) {
                var createrow = table[0].insertRow(-1); //insertRow could be (row-1) for exact index instead of last position
                var cell = createrow.insertCell(-1);
                cell.setAttribute("id", row + "-" + col);
                cell.setAttribute("class", "no-select")
                cell.innerHTML = txt;
            } else {
                var newcell = tabrow[row-1].insertCell(-1); //insertCell could be (col-1) for exact index instead of last position
                newcell.innerHTML = txt;
                newcell.setAttribute("id", row + "-" + col);
                newcell.setAttribute("class", "no-select")
            }
        };

        $(document).click(function( event ) {
            if ($(event.target).is('input[value=Enter]')) {
                alert('enter')
            }
            else if ($(event.target).is('input[value=Edit]')) {
                editFunc()
            }
            else if ($(event.target).is('input[value=Delete]')) {
                deleteFunc()
            }
        });

        editFunc = function () {
            $(document).click(function( event ) {
                var placehold
                if ($(event.target).is('TD') && event.target.className == 'no-select') {
                    var placehold = event.target.firstChild.nodeValue
                    event.target.innerHTML = '<input type="text" placeholder="'+ placehold + '">'
                    event.target.className = 'select'
                }
                else if ($(event.target).is('TD') && event.target.className == 'select') {
                    event.target.innerHTML = placehold
                    event.target.className = 'no-select'
                }
            })
        };

        deleteFunc = function () { 
            $(document).click(function( event ) {
                if ($(event.target).is('TD')) {
                    //console.log(event.target.innerHTML)
                    if (event.target.className == "select") {
                        event.target.className = "no-select";
                    }
                    else if (event.target.className == "no-select") {
                        event.target.className = "select";
                    }
                }
            })
        }
    }

};

Wrapper();