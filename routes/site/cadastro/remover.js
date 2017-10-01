'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../../models/site');
const Transportadora = require('./../../../models/transportadora');
const Entregador = require('./../../../models/entregador');
const Envio = require('./../../../models/envio');

let cadastroWithProblem = false;

router.post('/', (req, res) => {
  const s = req.body;
  const { type } = req.query;

  if (type === 'site') {
    if (!isNaN(parseFloat(s.txtId))) {
      Site.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
  }

  if (type === 'entregador') {
    if (!isNaN(parseFloat(s.txtId))) {
      Entregador.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
  }

  if (type === 'entrega') {
    if (!isNaN(parseFloat(s.txtId))) {
      Envio.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
  }

  if (type === 'transportadora') {
    if (!isNaN(parseFloat(s.txtId))) {
      Transportadora.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
  }

  if (!cadastroWithProblem) {
    res.redirect('/site/cadastro/' + type + '?alert=1');
  } else {
    res.redirect('/site/cadastro/' + type + '?alert=0');
  }
});


module.exports = router;
