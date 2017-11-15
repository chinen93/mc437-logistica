'use strict';

const express = require('express');

const router = express.Router();

const Consulta = require('./../../models/consulta');

router.get('/', (req, res) => {
  const {
    id_site,
    volume,
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

  if (id_site && !(volume && destino_cep && destino_numero &&
    destino_estado && destino_cidade && destino_endereco)) {
    res.send({ error: 'Faltando informação' });
    return;
  } else if (!id_site && !(volume && partida_cep && partida_numero && partida_estado &&
    partida_cidade && partida_endereco && destino_cep && destino_numero &&
    destino_estado && destino_cidade && destino_endereco)) {
    res.send({ error: 'Faltando informação' });
    return;
  }

  Consulta.new({
    id_site,
    volume,
    partida_cep,
    partida_numero,
    partida_estado,
    partida_cidade,
    partida_endereco,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade
  }, (data) => {
    res.send(data);
  });
});


module.exports = router;
