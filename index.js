const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs')
const pem = require('pem')
const X509HttpClient = require('soap-x509-http')
const soap = require('soap')
var app = express();

app.use(formidable());

const url= 'https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx?wsdl'
const nodeFoger = require('node-forge')
const constantes = require('constants')
app.get('/clia', async (req, res) => {
  const gnre = require('gnre-auto') 
  // Array de objetos
  let dados = [
    {
      ufFavorecida: "", // Silga do estado do favorecido
      tipoGnre: "0", // Tipo da GNRE (0 - Gnre Simples é o único suportado até o momento)
      receita: "", // Codigo da receita **
      detalhamentoReceita: "", // Detalhamento da receita **
      documentoOrigem: { 
          tipo: "", // Tipo do documento de origem **
          valor: "" // Numero do documento de origem
      },
      produto: "", // Codigo do produto
      referencia: {
          periodo: "", // Periodo de referencia **
          mes: "", // Mes de refencia no formato MM
          ano: "", // Ano de referencia no formato AAAA
          parcela: "", // Quantidade de parcelas no formato X ou XX (caso valor maior que 9)
      },
      dataVencimento: "", // Data de vencimento da guia no formato AAAA-MM-DD
      valorPrincipal: { 
          tipo: "", // Tipo do valor ( Tipo 11 é o valor Principal) **
          valor: "" // Valor principal da guia usando separador decimal com "."
      },
      destinatario: {
          cnpj: "", // Preencher somente um dos campos, CNPJ ou CPF
          cpf: "",
          ie: "",
          razaoSocial: "", // Razao social do destinatário
          municipio: "", // Código IBGE do destinaatário
      },
      valorGnre: "", // Valor da guia usando separador decimal com "."
      dataPagamento: "", // Data de pagamento da guia no formato AAAA-MM-DD
      identificadorGuia: "" // Identificador da Guia **
    }
  ]
  
  // Objeto
  let emitente = {
    cnpj: "", // Preencher somente um dos campos, CNPJ ou CPF ou IE
    cpf: "", 
    ie: "",
    razaoSocial: "", // Razao Social do emitente
    endereco: "", // Endereço do Emitente
    municipio: "", // Municipio do Emitente
    uf: "" // Uf do Emitente
  }
  
  // String
  let lote = "" // Numero do lote recebido através da resposta da função GnreLoteRecepcao
  
  // Objeto
  let certificado = {
     path: __dirname+'\\Certif_Lefisc_2020.pfx', // Caminho do certificado no modelo .pfx
     pass: "lefisc1" // Palavra-passe do certificado
  }

 let result =await  gnre.GnreLoteRecepcao(dados, emitente, certificado)
 console.log(result)
})    

app.get('/',(req,res)=>{
  res.send('incial')
})
const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })