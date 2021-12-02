//ABRIR TELA HTML
function doGet(request) {
  return HtmlService.createTemplateFromFile('displayHTML').evaluate();
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

//LISTAR COLABORADORES CADASTRADOS NA TELA DE LOGIN
function getSelectList(){
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Parametros");
    let values = sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues();    
    return values;
  }
  catch(err) {
    Logger.log(err);
  }
}

//LISTAR FÁBRICAS CADASTRADAS NA TELA DE LOGIN
function chamarListaFabricas(){
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Parametros");
    let values = sheet.getRange(2,10,sheet.getLastRow()-1,1).getValues();
    return values;
  }
  catch(err) {
    Logger.log(err);
  }
}
