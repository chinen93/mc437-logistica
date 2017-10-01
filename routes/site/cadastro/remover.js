'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../../models/site');
const Transportadora = require('./../../../models/transportadora');
const Entregador = require('./../../../models/entregador');
const Envio = require('./../../../models/envio');

let cadastroWithProblem = 1;
let urlRedirect = '';

router.post('/', (req, res) => {
  const s = req.body;
  const { type } = req.query;

  if (type === 'site') {
    if (!isNaN(parseFloat(s.txtId))) {
      Site.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
    urlRedirect = '/site/cadastro/site?alert='+cadastroWithProblem;
  }

  if (type === 'entregador') {
    if (!isNaN(parseFloat(s.txtCPF))) {
      Entregador.delete(s.txtCPF);
    } else {
      cadastroWithProblem = true;
    }
    urlRedirect = '/site/cadastro/entregador?id='+ s.txtIdTransportadora +'&alert='+cadastroWithProblem;
  }

  if (type === 'entrega') {
    if (!isNaN(parseFloat(s.txtId))) {
      Envio.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
    urlRedirect = '/site/cadastro/entrega?alert='+cadastroWithProblem;
  }

  if (type === 'transportadora') {
    if (!isNaN(parseFloat(s.txtId))) {
      Transportadora.delete(s.txtId);
    } else {
      cadastroWithProblem = true;
    }
    urlRedirect = '/site/cadastro/transportadora?alert='+cadastroWithProblem;
  }

  res.redirect(urlRedirect);
});


module.exports = router;
