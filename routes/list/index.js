'use strict';

const express = require('express');

const router = express.Router();

/* GET cadastro page. */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Transportadora
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
router.get('/transportadoras', (req, res) => {
  const Transportadora = require('./../../models/transportadora');

  const listTitle = 'Ações Transportadora';

  const listCadastroTitle = 'Cadastro de Transportadora';
  const urlCadastroTitle = '/cadastro/transportadora';

  const listCadastroSubtitle = 'Cadastro de Entregadores da Transportadora';

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Taxa', 'Preço/cm³'
  ];

  const tableLabel = 'Lista Transportadoras';
  const dropdownTitle = 'Transportadoras';
  const dropdownList = [
    { text: 'Transportadora X', url: '/cadastro/entregador?id=1' },
    { text: 'Transportadora Y', url: '/cadastro/entregador?id=2' },
    { text: 'Transportadora Z', url: '/cadastro/entregador?id=3' }
  ];

  Transportadora.all((r) => {
    const tableContent = [];

    console.log(r);

    for (let i = 0; i < r.length; i += 1) {
      tableContent.push([r[i].id, 
			 r[i].contato, 
			 r[i].nome, 
			 r[i].precoCm, 
			 r[i].taxa]);
    }


    res.render('list/index', {
      listTitle,
      listCadastroTitle,
      listCadastroSubtitle,
      urlCadastroTitle,
      dropdownTitle,
      dropdownList,
      tableLabel,
      tableHeader,
      tableContent
    });
  });

  const nome = req.body.txtName;
  console.log('get' + nome);
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Sites
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/sites', (req, res) => {
  const Site = require('./../../models/site');
  const listTitle = 'Ações Site';

  const listCadastroTitle = 'Cadastro de Site';
  const urlCadastroTitle = '/cadastro/site';

  const tableLabel = 'Lista Site';

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Endereço Web'
  ];

  Site.all((s) => {
    const tableContent = [];

    for (let i = 0; i < s.length; i += 1) {
      tableContent.push([s[i].id, 
			 s[i].nome, 
			 s[i].contato, 
			 s[i].endereco]);
    }

    res.render('list/index', {
      listTitle,
      listCadastroTitle,
      urlCadastroTitle,
      tableLabel,
      tableHeader,
      tableContent
    });
  });
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Entregas
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

router.get('/entregas', (req, res) => {
  const listTitle = 'Ações Entrega';

  const listCadastroTitle = 'Cadastro de Entrega';
  const urlCadastroTitle = '/cadastro/entrega';

  const tableLabel = 'Lista Entrega';

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

  res.render('list/index', {
    listTitle,
    listCadastroTitle,
    urlCadastroTitle,
    tableLabel,
    tableHeader,
    tableContent
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});


module.exports = router;
