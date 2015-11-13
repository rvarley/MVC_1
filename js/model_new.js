; // defensive semicolon

function Wrapper() {

    'use strict';

    var Model = {
        url: "https://spreadsheets.google.com/feeds/cells/" +
              "1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM" +
              "/od6/public/values?alt=json",
        data: {},

        getData: function(callback) {
            $.getJSON(Model.url, function(data) {
                var col_high = 0;

                $.each(data.feed.entry, function(key, value) {
                    var cur_col = Number(value.gs$cell.col);  //Returns column value
                    if (cur_col > col_high) {
                        col_high = cur_col; //reset the value as we iterate
                        Model.data[(cur_col).toString()] = {};
                    }
                    Model.data[value.gs$cell.col][value.gs$cell.row] = value.gs$cell.$t;
                }); // End .each
                callback(Model.data);
            });
        },


        putData: function(to_post) {
            var new_row = {};
            $.each(to_post, function(k, v) {
                new_row[Model.data[k]["1"]] = v;
            });
            var address = "https://sheetsu.com/apis/0a299348";
            $.post(address, new_row);
        },

        updateModel: function() {
            //
        }
    };

    


    var Controller = {
        flip: {},

        alert: function() {
            Model.getData(displayCallback);
            View.displayTable()
        },

        


    };

    var View = {
        table: $("#myTable"),

        rowCount: $("#myTable tr"),

        startTable: $("#button").click(function() {
            Controller.alert();
        }),

        displayTable: function appendColumn() {
                // var tbl = document.getElementById('my-table'), // table reference
                //     i;
                // open loop for each row and append cell
                console.log(this.rowCount.size())
                
                



            //     function() {
            // // append, add attrib = add checkbox, add radio buttons (both with No Display)
            // $.each(Model.data, function(){
            //     // this.datList.append("<li>" + ???)
            // });
            // this.table.append('column 1 valuecolumn 2 value');
            // this.table.append("<td>Woot</td>");
            // this.table.append("<td>What</td>");
            // this.table.append("<tr></tr>")

             
            }
        },
        

    };




}

Wrapper();

function displayCallback(data) {
    console.log(data);
}



