'use strict';

const express = require('express');

const router = express.Router();

const mysql = require('mysql');


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'mamute1802!',
    database : 'Logistica'
  });

  return connection.query(sqlQry, function(error, results, fields){
      return results;
  });
}


/* GET cadastro page. */
router.get('/transportadoras', (req, res) => {

  var listTitle = "Ações Transportadora";

  var listCadastroTitle = "Cadastro de Transportadora";
  var urlCadastroTitle = "/cadastro/transportadora"

  var listCadastroSubtitle = "Cadastro de Entregadores da Transportadora";

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Taxa', 'Preço/cm³'
  ];
  const tableContent = [
    ['1', 'Transp X', '1234', 'R$ 1,23', 'R$ 1,23'],
    ['2', 'Transp Y', '123', 'R$ 4,56', 'R$ 1,23'],
    ['3', 'Transp Z', '12344', 'R$ 7,89', 'R$ 1,23']
  ];

  var tableLabel = "Lista Transportadoras";
  var dropdownTitle = "Transportadoras";
  var dropdownList = [
      {text:"Transportadora X", url:"/cadastro/entregador?id=1"},
      {text:"Transportadora Y", url:"/cadastro/entregador?id=2"},
      {text:"Transportadora Z", url:"/cadastro/entregador?id=3"}
  ];



  res.render('list/index', {
      listTitle: listTitle,
      listCadastroTitle: listCadastroTitle,
      listCadastroSubtitle: listCadastroSubtitle,
      urlCadastroTitle: urlCadastroTitle,
      dropdownTitle: dropdownTitle,
      dropdownList: dropdownList,
      tableLabel: tableLabel,
      tableHeader: tableHeader,
      tableContent: tableContent
  });
  var nome=req.body.txtName;
  console.log("get"+nome);
});

router.get('/sites', (req, res) => {

  var listTitle = "Ações Site";

  var listCadastroTitle = "Cadastro de Site";
  var urlCadastroTitle = "/cadastro/site"

  var tableLabel = "Lista Site";

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Endereço Web'
  ];

  var query = "SELECT * from site;";

  var SQLResponse = function(){
    this.rows = [];
  }

  var sqlResponse = new SQLResponse();

  execSQLQuery(query, sqlResponse)

  console.log(sqlResponse.rows);

  var tableContent = [
      // {id: r.rows.id_site, nome: r.rows.nome, contato: r.rows.contato_responsavel_site}
  ];

  var listCadastroSubtitle = undefined;
  var dropdownList = undefined;
  var dropdownTitle = undefined;

  res.render('list/index', {
      listTitle: listTitle,
      listCadastroTitle: listCadastroTitle,
      listCadastroSubtitle: listCadastroSubtitle,
      urlCadastroTitle: urlCadastroTitle,
      dropdownTitle: dropdownTitle,
      dropdownList: dropdownList,
      tableLabel: tableLabel,
      tableHeader: tableHeader,
      tableContent: tableContent
  });
  var nome=req.body.txtName;
  console.log("get"+nome);
});


router.get('/entregas', (req, res) => {

  var listTitle = "Ações Entrega";

  var listCadastroTitle = "Cadastro de Entrega";
  var urlCadastroTitle = "/cadastro/entrega"

  var tableLabel = "Lista Entrega";

  const tableHeader = [
    '#', 'Cliente', 'Contato Cliente', 
    'Endereço Cliente', 'Site', 'Data Envio',
    'Prazo Previsto', 'Localização', 'Pontos De Parada'
  ];
  const tableContent = [
    ['1', 'Cliente X', 'Contato Cliente X', 
    'Endereço Cliente X', 'Site X', 'Data Envio',
    'Prazo Previsto', 'Localização', 'Pontos De Parada'],
    ['1', 'Cliente X', 'Contato Cliente X', 
    'Endereço Cliente X', 'Site X', 'Data Envio',
    'Prazo Previsto', 'Localização', 'Pontos De Parada'],
    ['1', 'Cliente X', 'Contato Cliente X', 
    'Endereço Cliente X', 'Site X', 'Data Envio',
    'Prazo Previsto', 'Localização', 'Pontos De Parada']
  ];

  var listCadastroSubtitle = undefined;
  var dropdownTitle = undefined;
  var dropdownList = undefined;

  res.render('list/index', {
      listTitle: listTitle,
      listCadastroTitle: listCadastroTitle,
      listCadastroSubtitle: listCadastroSubtitle,
      urlCadastroTitle: urlCadastroTitle,
      dropdownTitle: dropdownTitle,
      dropdownList: dropdownList,
      tableLabel: tableLabel,
      tableHeader: tableHeader,
      tableContent: tableContent
  });
  var nome=req.body.txtName;
  console.log("get"+nome);
});


module.exports = router;
