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
      if(!isNaN(parseFloat(s.txtId))){
	Site.alter(s.txtId, 
		   s.txtNome, 
		   s.txtContato, 
		   s.txtEndereçoWeb);
      }else{
	cadastroWithProblem = true
      }
  }

  if (type === 'entregador') { 
      if(!isNaN(parseFloat(s.txtId)) &&
	 !isNaN(parseFloat(s.txtCPF))){
	Entregador.alter(s.txtId, 
			 s.txtIdTransportadora,
			 s.txtCPF, 
			 s.txtNome, 
			 s.txtPlacaVeiculo, 
			 s.txtModeloVeiculo);
      }else{
	cadastroWithProblem = true
      }
  }

  if (type === 'entrega') { 
      if(!isNaN(parseFloat(s.txtId))){
	Site.alter(s.txtId, 
		   s.txtClientes, 
		   s.txtContatoCliente, 
		   s.txtEndCliente, 
		   s.slSite, 
		   s.txtCpfEntregador, 
		   s.txtDataEnv, 
		   s.txtDataPrevista, 
		   s.txtLocal,  
		   s.txtPontosParada);
      }else{
	cadastroWithProblem = true
      }
  }

  if (type === 'transportadora') { 
      if(!isNaN(parseFloat(s.txtId)) &&
	 !isNaN(parseFloat(s.txtPrecoCm)) &&
	 !isNaN(parseFloat(s.txtTaxa))){
	Transportadora.alter(s.txtId,
			     s.txtNome, 
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
