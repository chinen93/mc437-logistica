'use strict';

const express = require('express');

const router = express.Router();

/* GET cadastro page. */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Transportadora
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/transportadora', (req, res) => {
  const cadastroTitle = 'Cadastro de Transportadoras';
  const tableLabel = 'Transportadora';
  const tableHeader = [
    '#', 'Nome', 'Contato', 'Taxa', 'Preço/cm³'
  ];
  const tableContent = [
    ['1', 'Transp X', '1234', 'R$ 1,23', 'R$ 1,23'],
    ['2', 'Transp Y', '123', 'R$ 4,56', 'R$ 1,23'],
    ['3', 'Transp Z', '12344', 'R$ 7,89', 'R$ 1,23']
  ];
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Transportadora',
    inputs: [
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Contato', identificador: 'txtContato' },
      { titulo: 'Taxa', identificador: 'txtTaxa' , tipo: 'valor'},
      { titulo: 'Preço/cm³', identificador: 'txtPrecoCm' , tipo: 'valor'}

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
      { titulo: 'Taxa', identificador: 'txtTaxa' , tipo: 'valor'},
      { titulo: 'Preço/cm³', identificador: 'txtPrecoCm' , tipo: 'valor'}
    ]
  };
  const formType = 'transportadora';

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
  const cadastroTitle = 'Cadastro de Site';
  const tableLabel = 'Sites';
  const tableHeader = [
    '#', 'Nome', 'Contato', 'Endereço Web'
  ];
  const tableContent = [
    ['1', 'Site X', '098', 'http://'],
    ['2', 'Site Y', '1234', 'http://'],
    ['3', 'Site Z', '111234', 'http://']
  ];
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
  const clients = [
      {id: 'Cliente X', nome: 'Cliente X'},
      {id: 'Cliente Y', nome: 'Cliente Y'},
      {id: 'Cliente C', nome: 'Cliente C'},
      {id: 'Cliente Z', nome: 'Cliente Z'}
  ];

  const sites = [
      {id: '1', nome: 'Site X'},
      {id: '2', nome: 'Site Y'},
      {id: '3', nome: 'Site C'},
      {id: '4', nome: 'Site Z'}
  ];

  const entregadores = [
      {id: '123456', nome: 'Entregador X'},
      {id: '123457', nome: 'Entregador Y'},
      {id: '333414', nome: 'Entregador C'},
  ];

  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Entrega',
    inputs: [
      { titulo: 'Cliente', identificador: 'slClientes', tipo: 'select', options: clients},
      { titulo: 'Contato Cliente', identificador: 'txtContatoCliente' },
      { titulo: 'Endereço Cliente', identificador: 'txtEndCliente' },
      { titulo: 'Site', identificador: 'slSite', tipo: 'select', options: sites},
      { titulo: 'Entregador', identificador: 'slEntregador', tipo: 'select', options: entregadores},
      { titulo: 'Data Envio', identificador: 'txtDataEnv' },
      { titulo: 'Previsão Entrega', identificador: 'txtDataPrevista' },
      { titulo: 'Localização', identificador: 'txtLocal' },
      { titulo: 'Pontos Parada', identificador: 'txtPontosParada'}
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
      { titulo: 'Cliente', identificador: 'slClientes', tipo: 'select', options: clients},
      { titulo: 'Contato Cliente', identificador: 'txtContatoCliente' },
      { titulo: 'Endereço Cliente', identificador: 'txtEndCliente' },
      { titulo: 'Site', identificador: 'slSite', tipo: 'select', options: sites},
      { titulo: 'Data Envio', identificador: 'txtDataEnv' },
      { titulo: 'Previsão Entrega', identificador: 'txtDataPrevista' },
      { titulo: 'Localização', identificador: 'txtLocal' },
      { titulo: 'Pontos Parada', identificador: 'txtPontosParada'}
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
