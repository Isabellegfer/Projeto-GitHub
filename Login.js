//VALIDAR LOGIN E SENHA COLABORADOR
function checkLogin(username, password){
  let id = '1SHhT17fsS2Tsz2zh78fOuU5A2zBBrGkuMD8QWJe1Joo'
  let ss = SpreadsheetApp.openById(id)
  let webAppSheet = ss.getSheetByName('Parametros')
  let lastRow = webAppSheet.getLastRow()
  let found_record = ''
    for(let i=2; i<=lastRow ; i++){
      let usercadastrado = webAppSheet.getRange(i,1).getValue()
      let passcadastrada = webAppSheet.getRange(i,2).getValue()

        if(usercadastrado == username && passcadastrada == password){
            found_record = 'TRUE'
        }   
        if(found_record == ''){
          found_record = 'FALSE'
        }
      }
    return found_record
}
