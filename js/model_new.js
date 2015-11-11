; // defensive semicolon
//controller updates information by calling model.data = {some : info} 

var model = { // This is the object
    url: "https://spreadsheets.google.com/feeds/cells/" +
          "1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM" +
          "/od6/public/values?alt=json",
    data: {},

    getData: function(callback) {
    //Extracts spreadsheet data using the Google Sheets API. Objects are formatted
    //as {Column {Row : Value}} to facilitate 
        $.getJSON(model.url, function(data) {
            var col_high = 0;

            $.each(data.feed.entry, function(key, value) {
                var cur_col = Number(value.gs$cell.col);  //Returns column value
                if (cur_col > col_high) {
                    col_high = cur_col; //reset the value as we iterate
                    model.data[(cur_col).toString()] = {};
                }
                model.data[value.gs$cell.col][value.gs$cell.row] = value.gs$cell.$t;
            });
            callback(model.data); // KS added return. This is the outgoing
                                        // data.
        })
    }, 

    setModel: function(data) {
        var data = {};
        $.each(to_post, function(k, v) {
            data[model[k]["1"]] = v;
        })
        var address = "https://sheetsu.com/apis/0a299348";
        $.post(address, data);
    }, // End setModel
 
    updateModel: function(data) {
        model.getData();
    }
}

//....End Model Object....//

function displayCallback(data) {
    console.log(data);
} // end displayCallback
        
$(document).ready(function() { 
    model.getData(displayCallback);
    //console.log(model.updateModel());
});

