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

//PESQUISAR REGISTOS PARA EXIBIR /////////////////////////////////////////////////
function getDataForSearch(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('BaseDados')

  return ws.getRange(2,1,ws.getLastRow()-1,3).getDisplayValues()
}