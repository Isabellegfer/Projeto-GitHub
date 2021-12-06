//VALIDAR LOGIN E SENHA COLABORADOR - NOVOS REGISTOS
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

//////////////////////////////////////////////////////////////////////////////////////////////////
//VALIDAR LOGIN E SENHA RESPONSÁVEL PARA ALTERAÇÃO DE REGISTOS 
function checkLoginEdicao(username,password){
  let id = '1SHhT17fsS2Tsz2zh78fOuU5A2zBBrGkuMD8QWJe1Joo'
  let ss = SpreadsheetApp.openById(id)
  let shParametros = ss.getSheetByName('Parametros')
  let data = shParametros.getDataRange().getValues()
  let found_record = ''
  let linhaBD = 0

//Encontrar linha do colaborador informado
  for(let i = 0; i<data.length;i++){
    if(data[i][0] == username){             //[0] because column A
      linhaBD = i+1
    }
  }  
  //Avaliar login, senha e função para acessar Tela de Alteração
    let userLista = shParametros.getRange(linhaBD,1).getValue()
    let passLista = shParametros.getRange(linhaBD,2).getValue()
    let funcaoLista = shParametros.getRange(linhaBD,3).getValue()

      if(userLista==username && passLista==password && (funcaoLista=='Responsável' || funcaoLista=='Administração')){
        found_record = 'TRUE'
      }else if(funcaoLista=='Colaborador'){
        found_record = 'PROIBIDO'
      }else if(found_record == ''){
        found_record = 'FALSE'
      }
    Logger.log(found_record)
    return found_record
}