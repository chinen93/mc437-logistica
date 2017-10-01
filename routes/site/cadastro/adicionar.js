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
    Site.new(
      s.txtNome,
      s.txtContato,
      s.txtEndereçoWeb
    );
    urlRedirect = '/site/cadastro/site?alert='+cadastroWithProblem;
  }

  if (type === 'entregador') {
    if (!isNaN(parseFloat(s.txtCPF))) {
      Entregador.new(
        s.txtCPF,
        s.txtIdTransportadora,
        s.txtNome,
        s.txtPlacaVeiculo,
        s.txtModeloVeiculo
      );
    } else {
      cadastroWithProblem = 0;
    }
    urlRedirect = '/site/cadastro/entregador?id='+ s.txtIdTransportadora +'&alert='+cadastroWithProblem;
  }

  if (type === 'entrega') {
    if (!isNaN(parseFloat(s.txtCpfEntregador))) {
	Envio.new(
	    s.txtClientes,
	    s.txtContatoCliente,
	    s.txtEndCliente,
	    s.slSite,
	    s.txtCpfEntregador,
	    s.txtDataEnv,
	    s.txtDataPrevista,
	    s.txtLocal,
	    s.txtPontosParada
	);
    } else {
	cadastroWithProblem = 0;
    }
    urlRedirect = '/site/cadastro/entrega?alert='+cadastroWithProblem;
  }


  if (type === 'transportadora') {
    if (!isNaN(parseFloat(s.txtPrecoCm)) && !isNaN(parseFloat(s.txtTaxa))) {
      Transportadora.new(
        s.txtNome,
        s.txtContato,
        s.txtPrecoCm,
        s.txtTaxa
      );
    } else {
      cadastroWithProblem = 0;
    }
    urlRedirect = '/site/cadastro/transportadora?alert='+cadastroWithProblem;
  }

  res.redirect(urlRedirect);
});


module.exports = router;
