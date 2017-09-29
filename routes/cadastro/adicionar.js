'use strict';

const express = require('express');

const router = express.Router();

const mysql = require('mysql');


function execSQLQuery(sqlQry, resCallback){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'mamute1802!',
    database : 'Logistica'
  });

  connection.query(sqlQry, function(error, results, fields){
      resCallback(error, results);

      connection.end();

      console.log(error);
      console.log(results);

  });
}


router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);

  if (req.query.type == 'site'){
    var query = "INSERT INTO site(nome, contato_responsavel_site, endereco_site) VALUES ('" + req.body.txtNome + "', '" + req.body.txtContato + "', '"+ req.body.txtEndereçoWeb +"');"
    execSQLQuery(query, function(e, r){});
  }

  if (req.query.type == 'transportadora'){
    var query = "INSERT INTO transportadora(nome_transportadora, contato_responsavel_transportadora, preco_embalagem_cm_quadrado, taxa_entrega) VALUES ('" + req.body.txtNome + "', '" + req.body.txtContato + "', '"+ req.body.txtPrecoCm + "','" + req.body.txtTaxa + "');"
    execSQLQuery(query, function(e, r){});
  }

  if (req.query.type == "entrega"){
    var query = "INSERT INTO envio(cliente, contato_cliente, endereco_cliente, id_site, CPFentregador, data_envio, prazo_previsto, localizacao, pontos_de_parada) VALUES ('" + req.body.txt  +"', "988571132", "Rua neusa francisca dos santos 197 parque sevilha sumare sp", 1, 355, '2017-09-28', '2017-10-01', "fornecedor", "rua 1, rua 2, av brasil");"

  }

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
