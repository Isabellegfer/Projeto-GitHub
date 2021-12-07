function ordenarNomesColabs() {
  SpreadsheetApp.getActiveSheet().getFilter().sort(2, true);
};

function allSheets(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  
  sheets.forEach(sh=>{                 
  if(sh.getName().indexOf("Parametros")>-1){
  ordenarNomesColabs();
  }});
}

//SERVER SIDE FUNCTIONS ----------------------------------------------------------------------------
//PESQUISAR REGISTOS PARA EXIBIR /////////////////////////////////////////////////
function getDataForSearch(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('BaseDados')

  return ws.getRange(2,1,ws.getLastRow()-1,10).getDisplayValues()
}

function deleteById(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('BaseDados')
  const custIds = ws.getRange(2,1,ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase())
  const posIndex = custIds.indexOf(id.toString().toLowerCase())
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2

  ws.deleteRow(rowNumber)
}

function getCustomerById(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('BaseDados')
  const custIds = ws.getRange(2,1,ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase())
  const posIndex = custIds.indexOf(id.toString().toLowerCase())
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2
  const customerInfo = ws.getRange(rowNumber,1,1,10).getValues()[0]

  return {custID: customerInfo[0], dataList: customerInfo[1], nomeList: customerInfo[2], fabricaList: customerInfo[3], feriadoList: customerInfo[4], ausenciaList: customerInfo[5], entradaList: customerInfo[6], saidaList: customerInfo[7], intervaloList: customerInfo[8], pesoList: customerInfo[9]}
}

function editCustomerById(id,customerInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('BaseDados')
  const custIds = ws.getRange(2,1,ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase())
  const posIndex = custIds.indexOf(id.toString().toLowerCase())
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2

  ws.getRange(rowNumber,2,1,9).setValues([[
                                          customerInfo.dataList,
                                          customerInfo.nomeList,
                                          customerInfo.fabricaList,
                                          customerInfo.feriadoList,
                                          customerInfo.ausenciaList,
                                          customerInfo.entradaList,
                                          customerInfo.saidaList,
                                          customerInfo.intervaloList,
                                          customerInfo.pesoList
                                         ]])
  return true
}

function addCustomer(customerInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName('BaseDados')
  const ultimaLinha = ws.getLastRow()
  const uniqueIDs = ws.getRange(2,1,ultimaLinha-1,1).getValues()
  let maxNum = 0
  uniqueIDs.forEach(r => {
    maxNum = r[0] > maxNum ? r[0] : maxNum
  })
  let newID = maxNum + 1

  ws.appendRow([newID,customerInfo.dataList,customerInfo.nomeList,customerInfo.fabricaList,customerInfo.feriadoList,customerInfo.ausenciaList,customerInfo.entradaList,customerInfo.saidaList,customerInfo.intervaloList,customerInfo.pesoList])
  ws.getRange(ultimaLinha+1,2,1,13).setNumberFormat('@')
}
