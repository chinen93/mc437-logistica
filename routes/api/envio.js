'use strict';

const express = require('express');

const router = express.Router();

const Envio = require('./../../models/envio');

router.get('/', (req, res) => {
  const { site_id } = req.query;

  if (site_id) {
    Envio.by_site(site_id, (results) => {
      res.send(results);
    });
  }

  Envio.all((results) => {
    res.send(results);
  });
});

router.get('/:envio_id', (req, res) => {
  const { envio_id } = req.params;

  Envio.specific(envio_id, (results) => {
    if (results)
      res.send(results);
  });
});

router.post('/', (req, res) => {
  const {
    cliente,
    contato_cliente,
    endereco_cliente,
    id_site,
    CPFentregador,
    data_envio,
    prazo_previsto,
    localizacao,
    pontos_de_parada
  } = req.query;

  if (!(cliente && contato_cliente && endereco_cliente && id_site &&
  CPFentregador && data_envio && prazo_previsto && localizacao && pontos_de_parada)) {
    res.send('Faltando informação');
  }

  Envio.new(
    cliente,
    contato_cliente,
    endereco_cliente,
    id_site,
    CPFentregador,
    data_envio,
    prazo_previsto,
    localizacao,
    pontos_de_parada, () => {
      res.send('Novo envio inserido');
    }
  );
});


module.exports = router;
