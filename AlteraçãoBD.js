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

//LISTAR COLABORADORES POR FÁBRICA/RESPONSÁVEL  --- ajustar pra pegar só da fábrica
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

//LOCALIZAR DADOS REGISTADOS E PREENCHER INPUTS PARA ALTERAÇÃO DE REGISTO (caso exista)
function preencherRegisto(localizadorInput){
  let id = '1SHhT17fsS2Tsz2zh78fOuU5A2zBBrGkuMD8QWJe1Joo'
  let ss = SpreadsheetApp.openById(id)
  let shBaseDados = ss.getSheetByName('BaseDados')
  let data = shBaseDados.getDataRange().getValues()
  let found_record = ''
  let linhaLocalizadorBD = 1

//Encontrar linha do colaborador informado
  for(let i = 1; i<data.length && linhaLocalizadorBD == 1;i++){
    if(data[i][9] == localizadorInput){             //[0] because column A
      linhaLocalizadorBD = i+1
    }
  }  
  //Avaliar se o localizador inserido é o mesmo do localizador da BD (data+nome)
    //let dataAlterar = shBaseDados.getRange(linhaLocalizadorBD,1).getValue()
    //let nomeAlterar = shBaseDados.getRange(linhaLocalizadorBD,2).getValue()
    //let fabricaAlterar = shBaseDados.getRange(linhaLocalizadorBD,3).getValue()
    let feriadoAlterar = shBaseDados.getRange(linhaLocalizadorBD,4).getValue()
    let ausenciaAlterar = shBaseDados.getRange(linhaLocalizadorBD,5).getValue()
    let entradaAlterar = shBaseDados.getRange(linhaLocalizadorBD,6).getValue()
    //let saidaAlterar = shBaseDados.getRange(linhaLocalizadorBD,7).getValue()
    //let intervaloAlterar = shBaseDados.getRange(linhaLocalizadorBD,8).getValue()
    let pesoAlterar = shBaseDados.getRange(linhaLocalizadorBD,9).getValue()

      if(linhaLocalizadorBD == 1){
        found_record = 'NovoRegisto'
      }else if(ausenciaAlterar !== ''){
        found_record = 'InserirAusencia'
      }else if(pesoAlterar !== ''){
        found_record = 'InserirPeso'
      }else if(entradaAlterar !== 0){
        found_record = 'InserirHoras'
      }else if(found_record == ''){
        found_record = 'FALSE'                 //apenas erro
      }
    Logger.log(found_record)
    return found_record
}



















//VALIDAR LOGIN E SENHA COLABORADOR XXXXXXXXXXXXXXXXXXXX TESTAR DEPOIS
function mostrarTabelaRegistros(){
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