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

        currentState : getModel(),

        // Array of arrays (the rows)
        getModel : function() {
            var modelData = [];
            var url = "https://spreadsheets.google.com/feeds/cells/1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/od6/public/values?alt=json";

            $.getJSON( url, function( data ) {
            /// Connor's Code

               for (var i = 0; i < data.feed.entry.length; i++){
                   var row = data.feed.entry[i].gs$cell.row;
                   var col = data.feed.entry[i].gs$cell.col;
                   var txt = data.feed.entry[i].gs$cell.$t;
                   modelData.push([row, col, txt]);
                   // if (!tabrow[row-1]) {
                   //     var createrow = table[0].insertRow(row-1);
                   //     var cell = createrow.insertCell(-1);
                   //     cell.setAttribute("id", row + "-" + col);
                   //     cell.innerHTML = txt;
                   // } 
                   // else {
                   //     var newcell = tabrow[row-1].insertCell(-1);
                   //     newcell.innerHTML = txt;
                   }
            

                });




            return modelData;
        },

        setData : function(val, position) {
            // 
        }

        // Array will be populated by dictionaries with column headers
        // from the spreadsheet as keys
        // Get info from Google
        // Push that info into Model
        // Method to get spreadsheet data
        // Push add data to data structure and up to Google
        // Remove deleted data from list and Google


    };

    var Controller = {

        fetchData : function() {
            Model.getModel();
            return Model.currentState;
        },

        updateData : function(data, position) {
            Model.setData(data, position);
            Model.getModel();
            return Model.currentState;
        },

        eventHandler : function(e, data) {
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
            return this.fetchData();
        }


    };


    var View = {
        mainLocale : $(".starter-template"),
        datList : $(".data"),
        drawDisplay : function() {
            // Add event listner

            this.mainLocale.append("<h3>Current Spreadsheet Data</h3>");
            this.mainLocale.append("<ul class='data'></ul>");
            this.mainLocale.append("<button class='adder'>Add Item</button>");
            this.mainLocale.append("<button class='del'>Delete</button>");
            this.mainLocale.append("<button class='update'>Fetch Newest Info</button>");

            this.mainLocale.click(function(e) {
                Controller.eventHandler(e, data);
            });
        },        

        // Draw list
        displayList : function() {
            // append, add attrib = add checkbox, add radio buttons (both with No Display)
            $.each(Model.objectname, function(){
                // this.datList.append("<li>" + ???)
            });
            this.datList.append("<li>Woot</li>");
            this.datList.append("<li>What</li>");
        },

        refreshList : function(info) {
            // Republish everything in the model

        }

    };


console.log('please');
View.drawDisplay();



}

Wrapper();
