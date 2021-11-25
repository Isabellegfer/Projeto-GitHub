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
  
  //LISTAR COLABORADORES POR FÁBRICA/RESPONSÁVEL
  function fListaColabsPorFabrica(){
    try {
      let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Parametros");
      let values = sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues();    
      return values;
    }
    catch(err) {
      Logger.log(err);
    }
  }
  
  
  
  //VALIDAR LOGIN E SENHA COLABORADOR XXXXXXXXXXXXXXXXXXXX TESTAR DEPOIS
  function mostrarRegistros(){
    let id = '1SHhT17fsS2Tsz2zh78fOuU5A2zBBrGkuMD8QWJe1Joo'
    let ss = SpreadsheetApp.openById(id)
    let shBaseDados = ss.getSheetByName('BaseDados')
    //let lastRow = shBaseDados.getLastRow()
    let lastRow = 10
    let arryColab = []
    let found_record = 'TRUE'
    const cars = ["Saab", "Volvo", "BMW"]
  
      for(let i=2; i<=lastRow ; i++){
        let colabLista = shBaseDados.getRange(i,2).getValue()
        //let fabricaLista = shBaseDados.getRange(i,3).getValue()
  
        //if(colabLista == edicaoNomeColab && fabricaLista == edicaoFabricaColab){
           arryColab.push(colabLista)
  
        //}
      }
      return arryColab
  }  