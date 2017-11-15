'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');
const Endereco = require('./../../models/endereco');

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
  const { nome, email } = req.query;

  if (!(nome && email)) {
    res.send({ error: 'Faltando informação' });
    return;
  }

  Site.new(nome, email, (data) => {
    res.send({ message: 'Novo site inserido com sucesso', id: data.insertId });
  });
});

router.post('/:id_site/endereco', (req, res) => {
  const { id_site } = req.params;
  const {
    cep, numero, estado, cidade, endereco
  } = req.query;
  console.log(cep, numero, estado, cidade, endereco);
  if (!(cep && numero && estado && cidade && endereco)) {
    res.send({ error: 'Faltando informação' });
    return;
  }

  Endereco.vinculate({
    id_site, cep, numero, estado, cidade, endereco
  }, (data) => {
    res.send(data);
  });
});

router.put('/:site_id', (req, res) => {
  const { site_id } = req.params;
  const { nome, email } = req.query;

  if (!(nome || email)) {
    res.send({ error: 'Faltando informação' });
    return;
  }

  Site.update(site_id, nome, email, (data) => {
    res.send({ message: data.affectedRows ? 'Site alterado com sucesso' : 'Nenhum dado foi modificado, id não encontrado' });
  });
});

router.delete('/:id', (req, res) => {
  Site.delete(req.params, (data) => {
    res.send(data);
  });
});

router.delete('/:id_site/endereco', (req, res) => {
  Endereco.desvinculate(req.params, (data) => {
    res.send(data);
  });
});


module.exports = router;
