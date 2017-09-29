'use strict';

const express = require('express');

const router = express.Router();

/* GET cadastro page. */
router.get('/transportadoras', (req, res) => {

  var listTitle = "Ações Transportadora";

  var listCadastroTitle = "Cadastro de Transportadora";
  var urlCadastroTitle = "/cadastro/transportadora" 

  var listCadastroSubtitle = "Cadastro de Taxas da Transportadora";

  var tableHeader = [
      "#", "Nome", "Contato"
  ];

  var tableContent = [
      {id: "1", nome: "Transportadora", contato: "Contato"}
  ];

  var tableLabel = "Lista Tranportadoras";
  var dropdownTitle = "Transportadoras";
  var dropdownList = [
      {text:"Transportadora X", url:"/cadastro/taxa?id=1"},
      {text:"Transportadora Y", url:"/cadastro/taxa?id=2"},
      {text:"Transportadora Z", url:"/cadastro/taxa?id=3"}
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

  var tableHeader = [
      "#", "Nome", "Contato"
  ];

  var tableContent = [
      {id: "1", nome: "Site", contato: "Contato"}
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

  var tableHeader = [
	"#", "Status", "Endereço Origem", "Endereço Destino", "Ultimo Endereço" 
  ];

  var tableContent = [
	["1", "Em Andamento", "Rua X", "São Paulo", "Rua QWE"], 
	["2", "Entregue", "Rua Y", "Rio de Janeiro", "Av RTY"],
	["3", "Em Andamento", "Rua Z", "Brasília DF", "Rua Oi"]
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
