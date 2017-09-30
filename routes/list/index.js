'use strict';

const express = require('express');

const Site = require('./../../models/site');

const router = express.Router();

/* GET cadastro page. */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Transportadora
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
router.get('/transportadoras', (req, res) => {

  var listTitle = "Ações Transportadora";

  var listCadastroTitle = "Cadastro de Transportadora";
  var urlCadastroTitle = "/cadastro/transportadora"

  var listCadastroSubtitle = "Cadastro de Entregadores da Transportadora";

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Taxa', 'Preço/cm³'
  ];
  // const tableContent = [
  //   ['1', 'Transp X', '1234', 'R$ 1,23', 'R$ 1,23'],
  //   ['2', 'Transp Y', '123', 'R$ 4,56', 'R$ 1,23'],
  //   ['3', 'Transp Z', '12344', 'R$ 7,89', 'R$ 1,23']
  // ];

  var tableLabel = "Lista Transportadoras";
  // var dropdownTitle = "Transportadoras";
  // var dropdownList = [
  //     {text:"Transportadora X", url:"/cadastro/entregador?id=1"},
  //     {text:"Transportadora Y", url:"/cadastro/entregador?id=2"},
  //     {text:"Transportadora Z", url:"/cadastro/entregador?id=3"}
  // ];

  execSQLQuery("SELECT * from transportadora;", function(e, r){
    var tableContent = [];

    console.log(r);
    for (var i = 0; i < r.length; i++)
      tableContent.push([r[i].id_transportadora, r[i].contato_responsavel_transportadora, r[i].nome_transportadora, r[i].preco_embalagem_cm_quadrado, r[i].taxa_entrega])

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
  });

  var nome=req.body.txtName;
  console.log("get"+nome);
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Sites
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/sites', (req, res) => {

  var listTitle = "Ações Site";

  var listCadastroTitle = "Cadastro de Site";
  var urlCadastroTitle = "/cadastro/site"

  var tableLabel = "Lista Site";

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Endereço Web'
  ];

  Site.all(function(s){
    var tableContent = [];

    for (var i = 0; i < s.length; i++)
      tableContent.push([ s[i].id, s[i].nome, s[i].contato, s[i].endereco])

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
  });

});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Entregas
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

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
