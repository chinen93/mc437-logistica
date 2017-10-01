'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');

router.get('/', (req, res) => {
  Site.all((results) => {
    res.send(results);
  });
});

router.get('/:site_id', (req, res) => {
  const { site_id } = req.params;

  Site.specific(site_id, (results) => {
    res.send(results);
  });
});

router.post('/', (req, res) => {
  const {
    nome, contato, endereco
  } = req.query;

  if (!(nome && contato && endereco)) {
    res.send('Faltando informação');
  }

  Site.new(nome, contato, endereco, () => {
    res.send('Novo site inserido');
  });
});

router.put('/:site_id', (req, res) => {
  const { site_id } = req.params;
  const { nome, contato, endereco } = req.query;

  if (!(nome && contato && endereco)) {
    res.send('Faltando informação');
  }

  Site.update(site_id, nome, contato, endereco, () => {
    res.send('Site alterado');
  });
});

router.delete('/:site_id', (req, res) => {
  const { site_id } = req.params;

  Site.delete(site_id, () => {
    res.send('Site deletado');
  });
});


module.exports = router;
