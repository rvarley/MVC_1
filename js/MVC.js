; // defensive semicolon
//controller updates information by calling Model.data = {some : info} 

function MVC() {
   "use strict";

    var Model = { // This is the object
        url: "https://spreadsheets.google.com/feeds/cells/" +
              "1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM" +
              "/od6/public/values?alt=json",
        data: {},
    //                        v-----------------a function that will be called within this function.
        getData: function(callback) {
        //Extracts spreadsheet data using the Google Sheets API. Objects are formatted
        //as {Column {Row : Value}} to facilitate 
            $.getJSON(Model.url, function(data) {
                var col_high = 0;

                $.each(data.feed.entry, function(key, value) {
                    var cur_col = Number(value.gs$cell.col);  //Returns column value
                    if (cur_col > col_high) {
                        col_high = cur_col; //reset the value as we iterate
                        Model.data[(cur_col).toString()] = {};
                    }
                    Model.data[value.gs$cell.col][value.gs$cell.row] = value.gs$cell.$t;
                });
                callback(Model.data); 
            }) //   ^------------------------callback function
        }, 
    //                            v----------previously called "data." 
        setModel: function(incomingData) { //this is confusing because the parameter "data"
                                   // is not the same as the var data below. Renamed as 
                                   // "incomingData."
            var data = {};
            $.each(to_post, function(k, v) {
                data[Model[k]["1"]] = v;
            })
            var address = "https://sheetsu.com/apis/0a299348";
            $.post(address, data); // This is the 
        }, // End setModel
     
        updateModel: function() {
            Model.getData();
        }
    }
      
    var View = {
      table : $('table'),
      rowmax : 0,
      colmax : 0,
      addform : $('#addrowform'),
      //test : {1:{1:'num', 2:'2', 3:'3', 5:'4'}, 2:{1:'alpha', 2:'a', 3:'b'}, 4:{1:'hello', 2:'goodbye', 3:'adios'}},

    getMax : function(test) {
        //cycles through the Model and saves number of rows and columns
        View.test = test;
        console.log(View.test);
        for (var i = 0;i < Object.keys(View.test).length; i++){
            if(Object.keys(View.test)[i] > View.colmax) {
                View.colmax = Object.keys(View.test)[i];
            }
        }
        for (var key in View.test){
            var values = View.test[key];
            for (var j = 0; j < Object.keys(values).length; j++) {
                if (Number(Object.keys(values)[j]) > View.rowmax) {
                    View.rowmax = Object.keys(values)[j];
                }
            }
        }
    },

    createTable : function() {
        //creates a table with the dimensions of rowmax and colmax
        for (var r = 1; r <= View.rowmax; r++) {
            var tr = View.table[0].insertRow(-1);
            for (var c = 1; c <= View.colmax; c++) {
                var cell = tr.insertCell(-1);
                cell.setAttribute("id", r + ',' + c);
                View.populateCell(r, c, cell);
            }
        }
    },

    populateCell : function(r, c, cell) {
        //fills each cell with its corresponding text, empty ojbects are filled with placeholder text to maintain table shape
        if (View.test[c] && View.test[c][r]) {
            cell.innerHTML = View.test[c][r];
        }
        else {
            cell.innerHTML = '&nbsp';
        }   
    },

    addNewRow : function() {
        //appends a row of text boxes to bottom of the table to pass to Controller
        var tr = View.table[0].insertRow(View.rowmax);
        for (var c = 1; c <= View.colmax; c++) {
            var cell = tr.insertCell(-1);
            cell.setAttribute("id", (c));
            cell.innerHTML = '<input type="text">'
        }
    },

    addDone : function() {
        //creates a Submit button to send to Controller
        var $done = $('<input type="submit" value="Done" id="donebutton" />');
        $done.appendTo(View.addform); 
        console.log($(":submit"))
        $(":submit").click(function() {
        //Controller.something?
    })                     
    }


    } // end view

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

//....End Model Object....//


function displayCallback(incomingData) {
    View.getMax(incomingData);
    View.createTable();
    //return(incomingData);
    
} // end displayCallback

$(document).ready(function() { 
    Model.getData(displayCallback);



$("#addrow").click(function() {
    document.getElementById("addrow").disabled = true
    View.addNewRow();
    View.addDone();
});

});

} //End MVC    
MVC();




