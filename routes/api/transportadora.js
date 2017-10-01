'use strict';

const express = require('express');

const router = express.Router();

const Transportadora = require('./../../models/transportadora');

router.get('/', (req, res) => {
  Transportadora.all((results) => {
    res.send(results);
  });
});

router.get('/:transportadora_id', (req, res) => {
  const { transportadora_id } = req.params;

  Transportadora.specific(transportadora_id, (results) => {
    res.send(results);
  });
});

router.post('/', (req, res) => {
  const {
    nome, contato, preco, taxa
  } = req.query;

  if (!(nome && contato && preco && taxa)) {
    res.send('Faltando informação');
  }

  Transportadora.new(nome, contato, preco, taxa, () => {
    res.send('Nova transportadora inserida');
  });
});

router.put('/:transportadora_id', (req, res) => {
  const { transportadora_id } = req.params;
  const {
    nome, contato, preco, taxa
  } = req.query;

  if (!(nome && contato && preco, taxa)) {
    res.send('Faltando informação');
  }

  Transportadora.update(transportadora_id, nome, contato, preco, taxa, () => {
    res.send('Transportadora alterada');
  });
});

router.delete('/:transportadora_id', (req, res) => {
  const { transportadora_id } = req.params;

  Transportadora.delete(transportadora_id, () => {
    res.send('Transportadora deletada');
  });
});

module.exports = router;
