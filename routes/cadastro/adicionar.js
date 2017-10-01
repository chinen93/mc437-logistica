'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');
const Transportadora = require('./../../models/transportadora');
const Entregador = require('./../../models/entregador');
const Envio = require('./../../models/envio');
var cadastroWithProblem = false

router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);
  const s = req.body;
  const { type } = req.query;

  if (type === 'site') {
    Site.new(s.txtNome,
	     s.txtContato,
	     s.txtEndereçoWeb);
  }

  if (type === 'entregador') {
      if(!isNaN(parseFloat(s.txtCPF))){
	Entregador.new(s.txtIdTransportadora,
		       s.txtCPF,
		       s.txtNome,
		       s.txtPlacaVeiculo,
		       s.txtModeloVeiculo);
      }else{
	cadastroWithProblem = true
      }
  }

  if (type === 'entrega') {
      Envio.new(s.txtClientes,
	       s.txtContatoCliente,
	       s.txtEndCliente,
	       s.slSite,
	       s.txtCpfEntregador,
	       s.txtDataEnv,
	       s.txtDataPrevista,
	       s.txtLocal,
	       s.txtPontosParada);
  }


  if (type === 'transportadora') {
      if(!isNaN(parseFloat(s.txtPrecoCm)) &&
	 !isNaN(parseFloat(s.txtTaxa))){
	Transportadora.new(s.txtNome,
			   s.txtContato,
			   s.txtPrecoCm,
			   s.txtTaxa);
      }else{
	cadastroWithProblem = true
      }
  }
  if(cadastroWithProblem === false){
      res.redirect('/cadastro/'+type+'?alert=1');
  }else{
      res.redirect('/cadastro/'+type+'?alert=0');
  }
});


module.exports = router;
