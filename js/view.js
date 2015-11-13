var table = $('table');
var rowmax = 0;
var colmax = 0;
var addform = $('#addrowform');
var test = {1:{1:'num', 2:'2', 3:'3', 5:'4'}, 2:{1:'alpha', 2:'a', 3:'b'}, 4:{1:'hello', 2:'goodbye', 3:'adios'}};

getMax = function() {
    //cycles through the Model and saves number of rows and columns
    for (var i = 0;i < Object.keys(test).length; i++){
        if(Object.keys(test)[i] > colmax) {
            colmax = Object.keys(test)[i];
        }
    }
    for (var key in test){
        var values = test[key];
        for (var j = 0; j < Object.keys(values).length; j++) {
            if(Object.keys(values)[j] > rowmax) {
                rowmax = Object.keys(values)[j];
            }
        }
    }
}

createTable = function() {
    //creates a table with the dimensions of rowmax and colmax
    for (var r = 1; r <= rowmax; r++) {
        var tr = table[0].insertRow(-1);
        for (var c = 1; c <= colmax; c++) {
            var cell = tr.insertCell(-1);
            cell.setAttribute("id", r + ',' + c);
            populateCell(r, c, cell);
        }
    }
}

populateCell = function(r, c, cell) {
    //fills each cell with its corresponding text, empty ojbects are filled with placeholder text to maintain table shape
    if (test[c] && test[c][r]) {
        cell.innerHTML = test[c][r];
    }
    else {
        cell.innerHTML = '&nbsp';
    }   
}

addNewRow = function() {
    //appends a row of text boxes to bottom of the table to pass to Controller
    var tr = table[0].insertRow(rowmax);
    for (var c = 1; c <= colmax; c++) {
        var cell = tr.insertCell(-1);
        cell.setAttribute("id", (c));
        cell.innerHTML = '<input type="text">'
    }
}

addDone = function() {
    //creates a Submit button to send to Controller
   var $done = $('');
    $done.appendTo(addform); 
    console.log($(":submit"))
    $(":submit").click(function() {
        event.preventDefault();
        for (var k = 0; k < $(":text").length; k++) {
            console.log($(":text")[k].value, $(":text")[k].parentNode.getAttribute('id'))
        }
       
       
   //Controller.something?
    })
}


getMax()
createTable()



$("#addrow").click(function() {
    document.getElementById("addrow").disabled = false
    addNewRow()
    addDone()
})


