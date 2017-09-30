'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');
const Transportadora = require('./../../models/transportadora');


router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);
  const s = req.body;
  const { type } = req.query;

  if (type === 'site') { Site.new(s.txtNome, s.txtContato, s.txtEndereçoWeb); }

  if (type === 'transportadora') { Transportadora.new(s.txtNome, s.txtContato, s.txtPrecoCm, s.txtTaxa); }

  if (type === 'entrega') {
    const query = "INSERT INTO envio(cliente, contato_cliente, endereco_cliente, id_site, CPFentregador, data_envio, prazo_previsto, localizacao, pontos_de_parada) VALUES ('" + req.body.txtCliente + "', '" + req.body.txtContatoCliente + "', '" + req.body.txtEndCliente + "', '" + req.body.slSite + "',' " + req.body.txtCpfEntregador + "', '" + req.body.txtDataEnv + "', '"
    + req.body.txtDataPrevista + "', '" + req.body.txtLocal + "', '" + req.body.txtPontosParada + "');";

    // execSQLQuery(query, function(e, r){});
  }

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
