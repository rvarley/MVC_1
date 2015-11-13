// An MVC implementation of webpage that taps the Google Sheets API
// for interaction with a single, predefined spreadsheet.  Front end
// is a basic Bootstrap website from template.
//
// Author: Cole Howard
//

;  // Defensive

function Wrapper() {

    'use strict';

    var model = {
        url: "https://spreadsheets.google.com/feeds/cells/" +
              "1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM" +
              "/od6/public/values?alt=json",
        currentState: {},

        getModel: function(callback) {
            $.getJSON(model.url, function(data) {
                var col_high = 0;

                $.each(data.feed.entry, function(key, value) {
                    var cur_col = Number(value.gs$cell.col);  //Returns column value
                    if (cur_col > col_high) {
                        col_high = cur_col; //reset the value as we iterate
                        model.currentState[(cur_col).toString()] = {};
                    }
                    model.currentState[value.gs$cell.col][value.gs$cell.row] = value.gs$cell.$t;
                }); // End .each
                callback();
            })
        },

        appendLine: function(data) {
            var data = {};
            $.each(to_post, function(k, v) {
                data[model[k]["1"]] = v;
            })
            var address = "https://sheetsu.com/apis/0a299348";
            $.post(address, data);
        },

        updateModel: function() {
            // may not be necessary?
        }
    }

    // var Model = {

        // Array of arrays (the rows), initialized
        // currentState : [],

        // Populates the model
        // Args: cbfunc - a callback function to notify completion
        // getModel : function(cbfunc) { 
        //     var url = "https://spreadsheets.google.com/feeds/cells/1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/od6/public/values?alt=json";
        //     $.getJSON( url, function(data) {
        //         var tempRow = [];
        //         var row;
        //         var col;
        //         var txt;
        //         var maxColNum = 0;
        //         var maxRowNum = 0;
        //         var infoLength = data.feed.entry.length;
        //         Model.currentState = [];
                
        //         // Establish model layout
        //         for (var i = 0; i < infoLength; i++){
        //             if (parseInt(data.feed.entry[i].gs$cell.col) > maxColNum) {
        //                 maxColNum = parseInt(data.feed.entry[i].gs$cell.col);
        //             }
        //             if (parseInt(data.feed.entry[i].gs$cell.row) > maxRowNum) {
        //                 maxRowNum = parseInt(data.feed.entry[i].gs$cell.row);
        //             }
        //         }
        //         for (var k = 1; k <= maxRowNum; k++) {
        //             tempRow = [];
        //             for (var j = 1; j < maxColNum; j++) {
        //                 tempRow.push(' ');     
        //             }
        //             Model.currentState.push(tempRow);
        //         }

        //         // Populate model with data
        //         for (var idx = 0; idx < infoLength; idx++){
        //            row = parseInt(data.feed.entry[idx].gs$cell.row);
        //            col = parseInt(data.feed.entry[idx].gs$cell.col);
        //            txt = data.feed.entry[idx].gs$cell.$t;
        //            Model.currentState[row-1][col-1] = txt;
        //         }

        //         cbfunc();  // Executes when model is populate with spreasheet data
        //                    // Even if there was nothing in the spreadsheet
            
        //     });
        // },

        // appendLine : function(lst) {  // Updates model and spreadsheet
        //     Model.currentState.push(lst);
        //     $.post( "https://sheetsu.com/apis/0a299348", { "Num": lst[0], "Alpha" : lst[1], "Greet": lst[2], "Test Column" : lst[3] } );
        // },

        // setData : function(val, position) {
        //     // Place holder in case api becomes available
        // },

        // nonFunc : function() {
        //     // Does nothing (a dummy callback for the initialization fo the model)
        // }
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
                for (var i = 0; i < adds.length; i++) { // this is an issue we need to fix
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
        table: $('table'),
        rowmax: 0,
        colmax: 0,
        addform: $('#addrowform'),
        test: {1:{1:'num', 2:'2', 3:'3', 5:'4'}, 2:{1:'alpha', 2:'a', 3:'b'}, 4:{1:'hello', 2:'goodbye', 3:'adios'}},

        getMax: function() {
            //cycles through the Model and saves number of rows and columns
            for (var i = 0;i < Object.keys(View.test).length; i++){
                if(Object.keys(View.test)[i] > View.colmax) {
                    View.colmax = Object.keys(test)[i];
                }
            }
            for (var key in View.test){
                var values = View.test[key];
                for (var j = 0; j < Object.keys(values).length; j++) {
                    if(Object.keys(values)[j] > View.rowmax) {
                        View.rowmax = Object.keys(values)[j];
                    }
                }
            }
        },

        createTable: function() {
            //creates a table with the dimensions of rowmax and colmax
            for (var r = 1; r <= View.rowmax; r++) {
                var tr = View.table[0].insertRow(-1);
                for (var c = 1; c <= View.colmax; c++) {
                    var cell = tr.insertCell(-1);
                    cell.setAttribute("id", r + ',' + c);
                    populateCell(r, c, cell);
                }
            }
        },

        populateCell: function(r, c, cell) {
            //fills each cell with its corresponding text, empty ojbects are filled with placeholder text to maintain table shape
            if (View.test[c] && View.test[c][r]) {
                cell.innerHTML = View.test[c][r];
            }
            else {
                cell.innerHTML = '&nbsp';
            }   
        },

        addNewRow: function() {
            //appends a row of text boxes to bottom of the table to pass to Controller
            var tr = View.table[0].insertRow(View.rowmax);
            for (var c = 1; c <= View.colmax; c++) {
                var cell = tr.insertCell(-1);
                cell.setAttribute("id", (c));
                cell.innerHTML = '<input type="text">'
            }
        },

        addDone: function() {
            //creates a Submit button to send to Controller
            var $done = $('<input type="submit" value="Done" id="donebutton" />');
            $done.appendTo(View.addform); 
            console.log($(":submit"))
            $(":submit").click(function() {
            //Controller.something?
            })                     
        }

        getMax()
        createTable()



        $("#addrow").click(function() {
            document.getElementById("addrow").disabled = true
            addNewRow()
            addDone()
        })

        // mainLocale : $(".starter-template"),
        // datList : $(".data"),
        
        // // Draw framework
        // drawDisplay : function() {

        //     this.mainLocale.append("<h3>Current Spreadsheet Data</h3>");
        //     this.mainLocale.append("<ul class='data'></ul>");
        //     this.mainLocale.append("<button class='update'>Fetch Newest Info</button>");
        //     this.mainLocale.append("<button class='adder'>Add Item</button>");
        //     // this.mainLocale.append("<button class='del'>Delete</button>");  For later

        //     // Event Listener
        //     this.mainLocale.click(function(e) {
        //         Controller.eventHandler(e);
        //     });
        // },        

        // // Draw list
        // displayList : function() {
        //     // From Conner and Dana  Table Visualization
        //     $('tr').remove();       // Clear old table rows if they exist
        //     var table = $('table');
        //     var tabrow = document.getElementsByTagName('tr');
        //     var tabdat = document.getElementsByTagName('td');
        //     for (var i = 0; i < Model.currentState.length; i++) {
        //         for (var j = 0; j < Model.currentState[i].length; j++) {
        //             if (!tabrow[i]) {
        //                 var createrow = table[0].insertRow(-1); //insertRow could be (row-1) for exact index instead of last position
        //                 var cell = createrow.insertCell(-1);
        //                 cell.setAttribute("id", i + "-" + j);
        //                 cell.setAttribute("class", "no-select");
        //                 cell.innerHTML = Model.currentState[i][j];
        //               } else {
        //                   var newcell = tabrow[i].insertCell(-1); //insertCell could be (col-1) for exact index instead of last position
        //                   newcell.innerHTML = Model.currentState[i][j];
        //                   newcell.setAttribute("id", i + "-" + j);
        //                   newcell.setAttribute("class", "no-select");
        //      }
        // }
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