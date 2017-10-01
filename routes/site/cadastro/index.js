'use strict';

const express = require('express');

const router = express.Router();
const Site = require('./../../../models/site');
const Transportadora = require('./../../../models/transportadora');
const Envio = require('./../../../models/envio');
const Entregador = require('./../../../models/entregador');

/* GET cadastro page. */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Transportadora
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/transportadora', (req, res) => {
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

  const { alert } = req.query;

  Transportadora.all((r) => {
    const tableContent = [];

    console.log(r);
    for (let i = 0; i < r.length; i += 1) {
      tableContent.push([
        r[i].id,
        r[i].contato,
        r[i].nome,
        r[i].precoCm,
        r[i].taxa
      ]);
    }

    res.render('cadastro/index', {
      alert,
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
  var cadastroTitle = 'Cadastro de Entregador';

  const idTransportadora = req.query.id;

  Transportadora.specific(idTransportadora, (r) => {
     cadastroTitle += ' da Transportadora: [' + r.nome  + ']';
  });

  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Entregador',
    inputs: [
      { titulo: 'Id Transportadora', identificador: 'txtIdTransportadora', tipo: 'hidden', value: idTransportadora},
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
      { titulo: 'Id Transportadora', identificador: 'txtIdTransportadora', tipo: 'hidden', value: idTransportadora},
      { titulo: 'CPF', identificador: 'txtCPF' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Entregador',
    inputs: [
      { titulo: 'Id Transportadora', identificador: 'txtIdTransportadora', tipo: 'hidden', value: idTransportadora},
      { titulo: 'CPF', identificador: 'txtCPF' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Placa Veículo', identificador: 'txtPlacaVeiculo' },
      { titulo: 'Modelo Veículo', identificador: 'txtModeloVeiculo' }
    ]
  };

  const tableLabel = 'Entregadores';
  const tableHeader = [
    'CPF', 'Nome', 'Placa Veículo', 'Modelo Veículo'
  ];
  const formType = 'entregador';

  const { alert } = req.query;

  Entregador.employed_by(idTransportadora, (r) => {
    const tableContent = [];

    console.log(r);
    for (let i = 0; i < r.length; i += 1) {
      tableContent.push([
        r[i].cpf,
        r[i].nome,
        r[i].placa,
        r[i].modelo
      ]);
    }

    res.render('cadastro/index', {
      alert,
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
// Site
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/site', (req, res) => {
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
  const { alert } = req.query;
  const formType = 'site';

  const tableLabel = 'Sites';
  const tableHeader = [
    '#', 'Nome', 'Contato', 'Endereço Web'
  ];
  Site.all((s) => {
    const tableContent = [];

    for (let i = 0; i < s.length; i += 1) {
      tableContent.push([
        s[i].id,
        s[i].nome,
        s[i].contato,
        s[i].endereco
      ]);
    }

    res.render('cadastro/index', {
      alert,
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

  const sites = [];
  Site.all((s) => {
    for (let i = 0; i < s.length; i += 1) {
      sites.push({ id: s[i].id, nome: s[i].nome });
    }
  });

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
      { titulo: 'CPF Entregador', identificador: 'txtCpfEntregador' },
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
  const { alert } = req.query;
  const formType = 'entrega';

  Envio.all((r) => {
    const tableContent = [];

    console.log(r);
    for (let i = 0; i < r.length; i += 1) {
      tableContent.push([
        r[i].id,
        r[i].cliente,
        r[i].contatoCliente,
        r[i].endCliente,
        r[i].slSite,
        r[i].dataEnv,
        r[i].dataPrevista,
        r[i].local,
        r[i].pontosParada]);
    }

    res.render('cadastro/index', {
      alert,
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


module.exports = router;
