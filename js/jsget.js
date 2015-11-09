 var table = $('table')
var tabrow = document.getElementsByTagName('tr');
var tabdat = document.getElementsByTagName('td');
var url = "https://spreadsheets.google.com/feeds/cells/1sYkU_8raV14Bqm33dWcaksC3iMm73DH9OMsooxSMItM/od6/public/values?alt=json";

$.getJSON(url, function(data) {
    $variable = data
    forElements();
  })

function forElements() {
  for (var i = 0; i < $variable.feed.entry.length; i++){
    var row = $variable.feed.entry[i].gs$cell.row;
    var col = $variable.feed.entry[i].gs$cell.col;
    var txt = $variable.feed.entry[i].gs$cell.$t;
    createCell(row, col, txt)
  }
}

function createCell(row, col, txt) {
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
}

$(document).click(function( event ) {
  if ($(event.target).is('TD')) {
      if (event.target.className == "select") {
          event.target.className = "no-select";
      }
      else if (event.target.className == "no-select") {
           event.target.className = "select";
      }
   }
});

$("html").on('click', '.btn-default', function() {
    
       var editMode = $(this).hasClass('edit-mode'),
           columns  = $('.table th');
    
    if (!editMode){
        
        $(this).html('Save').addClass('edit-mode');
        
        columns.each(function(){
            
            var txt = $(this).text();
            var input = $('<input type="text">');
            input.val(txt);
            $(this).html(input);
    
        });
        
    } else {
        
        $(this).html('Edit').removeClass('edit-mode');
        
        columns.each(function(){
            
            var newName = $(this).find('input').eq(0).val();
            $(this).html(newName);
        
        });
        
    }
   
}) ;   





