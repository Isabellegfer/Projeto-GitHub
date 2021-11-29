function ordenarNomesColabs() {
  SpreadsheetApp.getActiveSheet().getFilter().sort(1, true);
};

function allSheets(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  
  sheets.forEach(sh=>{                 
  if(sh.getName().indexOf("Parametros")>-1){
  ordenarNomesColabs();
  }});
}