'use strict';

const express = require('express');

const router = express.Router();

const Envio = require('./../../models/envio');

router.get('/', (req, res) => {
  const { id_site } = req.query;

  if (id_site) {
    Envio.by_site({ id_site }, (results) => {
      res.send(results);
    });
  }

  Envio.all((results) => {
    res.send(results);
  });
});

router.get('/:id_pacote', (req, res) => {
  const { id_pacote: id } = req.params;

  Envio.specific({ id }, (results) => {
    res.send(results);
  });
});

router.get('/:id_pacote/status', (req, res) => {
  const { id_pacote: id } = req.params;

  Envio.status({ id }, (results) => {
    res.send(results);
  });
});

router.post('/', (req, res) => {
  const {
    id_site,
    volume,
    destinatario,
    partida_cep,
    partida_numero,
    partida_estado,
    partida_cidade,
    partida_endereco,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade,
    destino_endereco
  } = req.query;

  if (!(id_site && volume && destino_cep && destino_numero &&
    destino_estado && destino_cidade && destino_endereco && destinatario &&
    id_site)) {
    res.send({ error: 'Faltando informação' });
    return;
  }

  Envio.new({
    volume,
    destinatario,
    partida_cep,
    partida_numero,
    partida_estado,
    partida_cidade,
    partida_endereco,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade,
    destino_endereco,
    id_site
  }, (data) => {
    res.send(data);
  });
});

router.put('/:id_pacote/update', (req, res) => {
  const { id_pacote: id } = req.params;

  Envio.update({ id }, (data) => {
    res.send(data);
  });
});

router.put('/:id_pacote/cancela', (req, res) => {
  const { id_pacote: id } = req.params;
  Envio.cancel({ id }, (data) => {
    res.send(data);
  });
});

module.exports = router;
