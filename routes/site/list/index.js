'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../../models/site');
const Transportadora = require('./../../../models/transportadora');
const Envio = require('./../../../models/envio');

/* GET cadastro page. */

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Transportadora
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
router.get('/transportadoras', (req, res) => {
  const listTitle = 'Ações Transportadora';

  const listCadastroTitle = 'Cadastro de Transportadora';
  const urlCadastroTitle = '/site/cadastro/transportadora';

  const listCadastroSubtitle = 'Cadastro de Entregadores da Transportadora';

  const tableHeader = [
    '#', 'Nome', 'Contato', 'Taxa', 'Preço/cm³'
  ];

  const tableLabel = 'Lista Transportadoras';
  const dropdownTitle = 'Transportadoras';

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

    const dropdownList = [];
    for (let i = 0; i < r.length; i += 1) {
      var item = {
        text: r[i].nome,
        url: '/site/cadastro/entregador/?id='+r[i].id
      };
      dropdownList.push(item);
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
  const listTitle = 'Ações Site';

  const listCadastroTitle = 'Cadastro de Site';
  const urlCadastroTitle = '/site/cadastro/site';

  const tableLabel = 'Lista Site';

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
  const urlCadastroTitle = '/site/cadastro/entrega';

  const tableLabel = 'Lista Entrega';

  const tableHeader = [
    '#', 'Cliente', 'Contato Cliente',
    'Endereço Cliente', 'Site', 'Data Envio',
    'Prazo Previsto', 'Localização', 'Pontos De Parada'
  ];


  Envio.all((s) => {
    const tableContent = [];
    console.log(s);
    for (let i = 0; i < s.length; i += 1) {
      tableContent.push([
        s[i].id_envio,
        s[i].cliente,
        s[i].contato_cliente,
        s[i].endereco_cliente,
        s[i].id_site,
        s[i].CPFentregador,
        s[i].data_envio,
        s[i].prazo_previsto,
        s[i].localizacao,
        s[i].pontos_de_parada
      ]);
    }

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
});


module.exports = router;
