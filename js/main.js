
// An MVC implementation of webpage that taps the Google Sheets API
// for interaction with a single, predefined spreadsheet.  Front end
// is a basic Bootstrap website from template.
//
// Author: Cole Howard
//

;  // Defensive

function Wrapper() {

    'use strict';

    var Model = {

        // Array of arrays (the rows), initialized
        currentState : [],

        // Populates the model
        // Args: cbfunc - a callback function to notify completion
        getModel : function(cbfunc) { 
            var url = "https://spreadsheets.google.com/feeds/cells/1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/od6/public/values?alt=json";
            $.getJSON( url, function(data) {
                var tempRow = [];
                var row;
                var col;
                var txt;
                var maxColNum = 0;
                var maxRowNum = 0;
                var infoLength = data.feed.entry.length;
                Model.currentState = [];
                
                // Establish model layout
                for (var i = 0; i < infoLength; i++){
                    if (parseInt(data.feed.entry[i].gs$cell.col) > maxColNum) {
                        maxColNum = parseInt(data.feed.entry[i].gs$cell.col);
                    }
                    if (parseInt(data.feed.entry[i].gs$cell.row) > maxRowNum) {
                        maxRowNum = parseInt(data.feed.entry[i].gs$cell.row);
                    }
                }
                for (var k = 1; k <= maxRowNum; k++) {
                    tempRow = [];
                    for (var j = 1; j < maxColNum; j++) {
                        tempRow.push(' ');     
                    }
                    Model.currentState.push(tempRow);
                }

                // Populate model with data
                for (var idx = 0; idx < infoLength; idx++){
                   row = parseInt(data.feed.entry[idx].gs$cell.row);
                   col = parseInt(data.feed.entry[idx].gs$cell.col);
                   txt = data.feed.entry[idx].gs$cell.$t;
                   Model.currentState[row-1][col-1] = txt;
                }

                cbfunc();  // Executes when model is populate with spreasheet data
                           // Even if there was nothing in the spreadsheet
            
            });
        },

        appendLine : function(lst) {  // Updates model and spreadsheet
            Model.currentState.push(lst);
            $.post( "https://sheetsu.com/apis/0a299348", { "Num": lst[0], "Alpha" : lst[1], "Greet": lst[2], "Test Column" : lst[3] } );
        },

        setData : function(val, position) {
            // Place holder in case api becomes available
        },

        nonFunc : function() {
            // Does nothing (a dummy callback for the initialization fo the model)
        }
    };

    var Controller = {
        
        fetchData : function() {
            Model.getModel(View.displayList);
        },

        updateData : function(pos_str) {
            
            Model.setData(data, position);
            Model.getModel();
            return Model.currentState;
        },

        eventHandler : function(e) {
            // If Add Button is clicked
            if (e.target.className === "adder") {
                $(e.target).prop("disabled",true);
                View.displayAdd();

            // For Future functionality
            // // If Delete Button is clicked
            // } else if (e.target.className === "del") {
            //     this.updateData(null, e.target.position);

            // // If A Cell is Updated
            // } else if (e.target.className === "data") {
            //     this.updateData(e.target.id);

            } else if (e.target.className === "sub") {
                var addList = [];
                var input = $('.add_box').val();
                var adds = input.split(',');
                for (var i = 0; i < adds.length; i++) {
                    addList.push($.trim(adds[i]));
                }
                Model.appendLine(adds);
                View.removeAdd();
                View.displayList();
            } else if (e.target.className === "update") {
                return Controller.fetchData();
            }
        }
    };


    var View = {
        mainLocale : $(".starter-template"),
        datList : $(".data"),
        
        // Draw framework
        drawDisplay : function() {

            this.mainLocale.append("<h3>Current Spreadsheet Data</h3>");
            this.mainLocale.append("<ul class='data'></ul>");
            this.mainLocale.append("<button class='update'>Fetch Newest Info</button>");
            this.mainLocale.append("<button class='adder'>Add Item</button>");
            // this.mainLocale.append("<button class='del'>Delete</button>");  For later

            // Event Listener
            this.mainLocale.click(function(e) {
                Controller.eventHandler(e);
            });
        },        

        // Draw list
        displayList : function() {
            // From Conner and Dana  Table Visualization
            $('tr').remove();       // Clear old table rows if they exist
            var table = $('table');
            var tabrow = document.getElementsByTagName('tr');
            var tabdat = document.getElementsByTagName('td');
            for (var i = 0; i < Model.currentState.length; i++) {
                for (var j = 0; j < Model.currentState[i].length; j++) {
                    if (!tabrow[i]) {
                        var createrow = table[0].insertRow(-1); //insertRow could be (row-1) for exact index instead of last position
                        var cell = createrow.insertCell(-1);
                        cell.setAttribute("id", i + "-" + j);
                        cell.setAttribute("class", "no-select");
                        cell.innerHTML = Model.currentState[i][j];
                      } else {
                          var newcell = tabrow[i].insertCell(-1); //insertCell could be (col-1) for exact index instead of last position
                          newcell.innerHTML = Model.currentState[i][j];
                          newcell.setAttribute("id", i + "-" + j);
                          newcell.setAttribute("class", "no-select");
             }
        }
    }
},

        // Add text input box and button
        displayAdd : function() { 
            this.mainLocale.append("<input class='add_box' type=text></input>");
            this.mainLocale.append("<button class='sub'>Submit</button>");
            this.mainLocale.append("<p id='direction'>CSV Please</p>");
        },

        // Get rid of text box on submit
        removeAdd : function() {
            $('.add_box').remove();
            $('.sub').remove();
            $('#direction').remove();
            $('.adder').prop("disabled",false);
        }
};

Model.getModel(Model.nonFunc);  // Initialize model
View.drawDisplay();      // Initialize view

}
Wrapper();
Status API Training Shop Blog About Pricing
© 2015 GitHub, Inc. Terms Privacy Security Contact Help