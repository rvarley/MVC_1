var table = $('table');
var tabrow = document.getElementsByTagName('tr');
$variable = [];
var url = "https://spreadsheets.google.com/feeds/cells/1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/od6/public/values?alt=json";

$.getJSON( url, function( data ) {
   assignVariable(data);
});

function assignVariable(data){
   $variable = data
   declareVars();
   //console.log($variable)
};

var declareVars = function() {
   for (var i = 0; i < $variable.feed.entry.length; i++){
       var row = $variable.feed.entry[i].gs$cell.row;
       var col = $variable.feed.entry[i].gs$cell.col;
       var txt = $variable.feed.entry[i].gs$cell.$t;
       if (!tabrow[row-1]) {
           var createrow = table[0].insertRow(row-1);
           var cell = createrow.insertCell(-1);
           cell.setAttribute("id", row + "-" + col);
           cell.innerHTML = txt;
       } 
       else {
           var newcell = tabrow[row-1].insertCell(-1);
           newcell.innerHTML = txt;
       }
   }
};