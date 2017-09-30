'use strict';

const express = require('express');

const router = express.Router();

function execSQLQuery(sqlQry, resCallback) {
  const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME || 'localhost',
    port: process.env.RDS_PORT || 3306,
    user: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || '',
    database: process.env.RDS_DB_NAME || 'logistica'
  });

  connection.query(sqlQry, (error, results) => {
    resCallback(error, results);

    connection.end();

    console.log(error);
    console.log(results);
  });
}

/* GET cadastro page. */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Transportadora
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/transportadora', (req, res) => {
  const Transportadora = require('./../../models/transportadora');

  const cadastroTitle = 'Cadastro de Transportadoras';
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Transportadora',
    inputs: [
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Contato', identificador: 'txtContato' },
      { titulo: 'Taxa', identificador: 'txtTaxa', tipo: 'valor' },
      { titulo: 'Preço/cm³', identificador: 'txtPrecoCm', tipo: 'valor' }

    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Transportadora',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Transportadora',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Contato', identificador: 'txtContato' },
      { titulo: 'Taxa', identificador: 'txtTaxa', tipo: 'valor' },
      { titulo: 'Preço/cm³', identificador: 'txtPrecoCm', tipo: 'valor' }
    ]
  };
  const formType = 'transportadora';
  const tableLabel = 'Transportadora';
  const tableHeader = [
    '#', 'Nome', 'Contato', 'Taxa', 'Preço/cm³'
  ];
  Transportadora.all(function(r){
    var tableContent = [];

    console.log(r);
    for (var i = 0; i < r.length; i++)
      tableContent.push([r[i].id, 
			 r[i].contato, 
			 r[i].nome, 
			 r[i].precoCm, 
			 r[i].taxa])

      var listCadastroSubtitle = undefined;
      var dropdownList = undefined;
      var dropdownTitle = undefined;

      res.render('cadastro/index', {
	cadastroTitle,
	tableLabel,
	tableHeader,
	tableContent,
	formAdicionar,
	formRemover,
	formAlterar,
	formType
      });
      const nome = req.body.txtName;
      console.log('get' + nome);
  });
  
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Entregador
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/entregador', (req, res) => {
  const cadastroTitle = 'Cadastro de Entregador da Transportadora X';
  const tableLabel = 'Entregadores';
  const tableHeader = [
    '#', 'CPF', 'Nome', 'Placa Veículo', 'Modelo Veículo'
  ];
  const tableContent = [
    ['1', '123456', 'Paulo', 'CCC1234', 'Carro 1'],
    ['2', '123457', 'Janeiro', 'AAA5678', 'Carro 3'],
    ['3', '333414', 'Brasílio', 'PLA1234', 'Carro 4']
  ];
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Entregador',
    inputs: [
      { titulo: 'CPF', identificador: 'txtCPF' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Placa Veículo', identificador: 'txtPlacaVeiculo' },
      { titulo: 'Modelo Veículo', identificador: 'txtModeloVeiculo' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Entregador',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Entregador',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'CPF', identificador: 'txtCPF' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Placa Veículo', identificador: 'txtPlacaVeiculo' },
      { titulo: 'Modelo Veículo', identificador: 'txtModeloVeiculo' }
    ]
  };
  const formType = 'entregador';

  res.render('cadastro/index', {
    cadastroTitle,
    tableLabel,
    tableHeader,
    tableContent,
    formAdicionar,
    formRemover,
    formAlterar,
    formType
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Site
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/site', (req, res) => {
  const Site = require('./../../models/site');

  const cadastroTitle = 'Cadastro de Site';
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Site',
    inputs: [
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Contato', identificador: 'txtContato' },
      { titulo: 'Endereço Web', identificador: 'txtEndereçoWeb' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Site',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Site',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Contato', identificador: 'txtContato' },
      { titulo: 'Endereço Web', identificador: 'txtEndereçoWeb' }
    ]
  };

  const formType = 'site';

  const tableLabel = 'Sites';
  const tableHeader = [
    '#', 'Nome', 'Contato', 'Endereço Web'
  ];
  Site.all(function(s){
    var tableContent = [];

    for (var i = 0; i < s.length; i++)
      tableContent.push([ s[i].id, 
			  s[i].nome, 
			  s[i].contato, 
			  s[i].endereco]);

      var listCadastroSubtitle = undefined;
      var dropdownList = undefined;
      var dropdownTitle = undefined;

      res.render('cadastro/index', {
	cadastroTitle,
	tableLabel,
	tableHeader,
	tableContent,
	formAdicionar,
	formRemover,
	formAlterar,
	formType
      });
      const nome = req.body.txtName;
      console.log('get' + nome);
  });

  
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Entrega
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/entrega', (req, res) => {
  const cadastroTitle = 'Cadastro de Entrega';
  const tableLabel = 'Entregas';
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

  const sites = [
    { id: '1', nome: 'Site X' },
    { id: '2', nome: 'Site Y' },
    { id: '3', nome: 'Site C' },
    { id: '4', nome: 'Site Z' }
  ];

  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Entrega',
    inputs: [
      { titulo: 'Cliente', identificador: 'txtClientes' },
      { titulo: 'Contato Cliente', identificador: 'txtContatoCliente' },
      { titulo: 'Endereço Cliente', identificador: 'txtEndCliente' },
      {
        titulo: 'Site', identificador: 'slSite', tipo: 'select', options: sites
      },
      { titulo: 'Entregador', identificador: 'txtCpfEntregador' },
      { titulo: 'Data Envio', identificador: 'txtDataEnv' },
      { titulo: 'Previsão Entrega', identificador: 'txtDataPrevista' },
      { titulo: 'Localização', identificador: 'txtLocal' },
      { titulo: 'Pontos Parada', identificador: 'txtPontosParada' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Entrega',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Entrega',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Cliente', identificador: 'txtClientes' },
      { titulo: 'Contato Cliente', identificador: 'txtContatoCliente' },
      { titulo: 'Endereço Cliente', identificador: 'txtEndCliente' },
      {
        titulo: 'Site', identificador: 'slSite', tipo: 'select', options: sites
      },
      { titulo: 'Data Envio', identificador: 'txtDataEnv' },
      { titulo: 'Previsão Entrega', identificador: 'txtDataPrevista' },
      { titulo: 'Localização', identificador: 'txtLocal' },
      { titulo: 'Pontos Parada', identificador: 'txtPontosParada' }
    ]
  };
  const formType = 'entrega';

  res.render('cadastro/index', {
    cadastroTitle,
    tableLabel,
    tableHeader,
    tableContent,
    formAdicionar,
    formRemover,
    formAlterar,
    formType
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});


module.exports = router;
