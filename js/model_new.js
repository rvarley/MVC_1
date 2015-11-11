; // defensive semicolon

function Wrapper() {

    'use strict';

    var Model = {
        url: "https://spreadsheets.google.com/feeds/cells/" +
              "1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM" +
              "/od6/public/values?alt=json",
        data: {},

        getData: function(callback) {
            Model.data = {}
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
            })
            return Model.data
        },


        putData: function(data) {
            var data = {};
            $.each(to_post, function(k, v) {
                data[Model.data[k]["1"]] = v;
            })
            var address = "https://sheetsu.com/apis/0a299348";
            $.post(address, data);
        },

        updateModel: function() {
            //
        }
    }

    var Controller = {
        modelStatus : "old",
        fetchData : function() {
            View.displayList();
           return Model.getData();
        },

        updateData : function(data, position) {
            Model.setData(data, position);
            Model.getModel();
            return Model.currentState;
        },

        eventHandler : function(e) {
            // If Add Button is clicked
            if (e.target.className === "adder") {
                this.updateData(data, end_of_list);

            // If Delete Button is clicked
            } else if (e.target.className === "del") {
                this.updateData(null, e.target.position);

            // If A Cell is Updated
            } else if (e.target.className === "data") {
                this.updateData(val, e.target.position);

            }
            // Should return new copy of model after any button click.
            console.log(Model.currentState);
            return this.fetchData();
        }


    };
}



function displayCallback(data) {
    console.log(data);
}

$(document).ready(function() {
    model.getData(displayCallback);
});

