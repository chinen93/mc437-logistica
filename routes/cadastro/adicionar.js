'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');

router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);

  if (req.query.type == 'site'){
    var s = req.body;
    Site.new(s.txtNome, s.txtContato, s.txtEndereçoWeb)
  }

  if (req.query.type == 'transportadora'){
    var query = "INSERT INTO transportadora(nome_transportadora, contato_responsavel_transportadora, preco_embalagem_cm_quadrado, taxa_entrega) VALUES ('" + req.body.txtNome + "', '" + req.body.txtContato + "', '"+ req.body.txtPrecoCm + "','" + req.body.txtTaxa + "');"
    // execSQLQuery(query, function(e, r){});
    console.log(req.body.contato);
  }

  if (req.query.type == "entrega"){
    var query = "INSERT INTO envio(cliente, contato_cliente, endereco_cliente, id_site, CPFentregador, data_envio, prazo_previsto, localizacao, pontos_de_parada) VALUES ('" + req.body.txtCliente  +"', '" + req.body.txtContatoCliente + "', '" + req.body.txtEndCliente + "', '" + req.body.slSite + "',' " + req.body.txtCpfEntregador + "', '" + req.body.txtDataEnv + "', '"
    + req.body.txtDataPrevista + "', '" + req.body.txtLocal + "', '" + req.body.txtPontosParada + "');"

    // execSQLQuery(query, function(e, r){});
  }

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
