//GLOBAIS
let ss = SpreadsheetApp.getActiveSpreadsheet()
let shLogin = ss.getSheetByName("Login")
let shParametros = ss.getSheetByName("Parametros")
let shBaseDados = ss.getSheetByName("BaseDados")
//___________________________

//SEMPRE ABRIR NA ABA DE LOGIN E OCULTAR OUTRAS
function onOpen(){
  ss.setActiveSheet(shLogin).setActiveSelection('C4')
  shParametros.getFilter().sort(1, true)
  shParametros.hideSheet()
  shBaseDados.hideSheet()
  shLogin.getRange(4,3).setValue('')
  shLogin.getRange(6,4).setValue('Selecionar Ação')
}

//VALIDAR LOGIN E SENHA (APENAS RESPONSÁVEIS E SECRETÁRIAS)
function Confirmar(){
  shParametros.showSheet()
  shParametros.showColumns(6,3)

  let loginInformado = shLogin.getRange(3,3).getValue()
  let senhaInformada = shLogin.getRange(4,3).getValue()
  let avals = shParametros.getRange("F1:F").getValues();
  let lastRow = avals.filter(String).length;

    for(let i=2; i<=lastRow ; i++){
    let userCadastrado = shParametros.getRange(i,6).getValue()
    let passCadastrada = shParametros.getRange(i,7).getValue()
    let funcaoCadastrada = shParametros.getRange(i,8).getValue()

      //login como responsável (visualização apenas de BaseDados)
      if(userCadastrado==loginInformado && passCadastrada==senhaInformada && funcaoCadastrada=="Responsável"){
        shBaseDados.showSheet()
        shParametros.hideColumns(6,3)
        shParametros.hideSheet()
        ss.setActiveSheet(shBaseDados)
        shLogin.getRange(4,3).setValue('')
        shLogin.getRange(5,3).setValue('')
      return
      //login como secretária (visualização total)
      }else if(userCadastrado==loginInformado && passCadastrada==senhaInformada &&funcaoCadastrada=="Administração"){
        shBaseDados.showSheet()
        shParametros.showSheet()
        shParametros.hideColumns(6,3)
        ss.setActiveSheet(shBaseDados)
        shLogin.getRange(4,3).setValue('')
        shLogin.getRange(5,3).setValue('')
      return
    }
  }       
    if(shBaseDados.isSheetHidden()){
      shParametros.hideColumns(6,3)
      shParametros.hideSheet()
      shLogin.getRange(4,3).setValue('')
      Browser.msgBox('Senha incorreta, tente novamente.');
    }
}

//FUNÇÕES AUXILIARES ----------------------------->

//TRANFORMAR A VALIDAÇÃO DE DADOS DA CÉLULA EM BOTÃO (FOLHA LOGIN)
function onEdit(e) {
  if (e.range.getA1Notation() == 'D6') {
    if (/^\w+$/.test(e.value)) {        
      eval(e.value)()
      e.range.setValue("Selecionar Ação")
    }
  }
}









