'use strict';

const express = require('express');

const router = express.Router();

const Entregador = require('./../../models/entregador');

router.get('/', (req, res) => {
  Entregador.all((results) => {
    res.send(results);
  });
});

router.get('/:entregador_id/:entregador_cpf', (req, res) => {
  const { entregador_id, entregador_cpf } = req.params;

  Entregador.specific(entregador_cpf, entregador_id, (results) => {
    res.send(results);
  });
});

router.post('/', (req, res) => {
  const {
    cpf, id, nome, placa, modelo
  } = req.query;

  if (!(cpf && id && nome && placa && modelo)) {
    res.send('Faltando informação');
  }

  Entregador.new(cpf, id, nome, placa, modelo, () => {
    res.send('Novo entregador inserido');
  });
});

router.put('/:entregador_id/:entregador_cpf', (req, res) => {
  const { entregador_id, entregador_cpf } = req.params;
  const { nome, placa, modelo } = req.query;

  if (!(nome && placa && modelo)) {
    res.send('Faltando informação');
  }

  Entregador.update(entregador_cpf, entregador_id, nome, placa, modelo, () => {
    res.send('Entregador alterado');
  });
});

router.delete('/:entregador_id/:entregador_cpf', (req, res) => {
  const { entregador_id, entregador_cpf } = req.params;

  Entregador.delete(entregador_cpf, entregador_id, () => {
    res.send('Entregador deletado');
  });
});


module.exports = router;
