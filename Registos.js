//VERIFICAR SE JÁ HÁ REGISTO DE LOCALIZADOR NAQUELA DATA
function verificarLocalizador(regLocalizador){
  let id = '1SHhT17fsS2Tsz2zh78fOuU5A2zBBrGkuMD8QWJe1Joo'      //não esquecer de alterar ID ao mudar planilha!!
  let ss= SpreadsheetApp.openById(id)
  let shParametros = ss.getSheetByName("Parametros")
  let shBaseDados = ss.getSheetByName("BaseDados")
  let lastRow = shParametros.getLastRow()+2 //considerar lastRow como quantidade de colaboradores
  let found_record = ''
  
  shBaseDados.getFilter().sort(2, false) //ordenar BaseDados por data mais recente

  for(let i=2; i<=lastRow ; i++){
    let usercadastrado = shBaseDados.getRange(i,11).getValue()

      if(usercadastrado == regLocalizador){
          found_record = 'TRUE'
      }   
      if(found_record == ''){
        found_record = 'FALSE'
      }
    }
  return found_record
}

//REGISTAR HORAS COLABORADORES
function addRecord(regData,regColaborador,regFabrica,regFeriado,regAusencia,regEntrada,regSaida,regIntervalo,regUndKg,regLocalizador) {
  let id = '1SHhT17fsS2Tsz2zh78fOuU5A2zBBrGkuMD8QWJe1Joo'      //não esquecer de alterar ID ao mudar planilha!!
  let ss= SpreadsheetApp.openById(id)
  let shBaseDados = ss.getSheetByName("BaseDados")
  const ultimaLinha = shBaseDados.getLastRow()
  let horaRegisto = new Date()
  let emailUsuario = Session.getActiveUser().getEmail()
  const uniqueIDs = shBaseDados.getRange(2,1,ultimaLinha-1,1).getValues()
  let maxNum = 0
  uniqueIDs.forEach(r => {
    maxNum = r[0] > maxNum ? r[0] : maxNum
  })
  let regID = maxNum + 1


  const month = new Array()
  month[0] = "Janeiro"
  month[1] = "Fevereiro"
  month[2] = "Março"
  month[3] = "Abril"
  month[4] = "Maio"
  month[5] = "Junho"
  month[6] = "Julho"
  month[7] = "Augosto"
  month[8] = "Setembro"
  month[9] = "Outubro"
  month[10] = "Novembro"
  month[11] = "Dezembro"

  const d = new Date()
  let nomeMes = month[d.getMonth()]

      shBaseDados.appendRow([regID,regData,regColaborador,regFabrica,regFeriado,regAusencia,regEntrada,regSaida,regIntervalo,regUndKg,regLocalizador,emailUsuario,horaRegisto,nomeMes])
      shBaseDados.getRange(ultimaLinha+1,2,1,3).setNumberFormat('@')
}
