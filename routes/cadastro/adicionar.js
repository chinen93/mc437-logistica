'use strict';

const express = require('express');

const router = express.Router();

const mysql = require('mysql');


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'mamute1802!',
    database : 'Logistica'
  });

  connection.query(sqlQry, function(error, results, fields){
      // if(error)
      //   res.json(error);
      // else
      //   res.json(results);
      if (error)
        res = error;
      else
        res = results;

      connection.end();

      console.log(error);
      console.log(results);

  });
}


router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);

  if (req.query.type == 'site'){
    var query = "INSERT INTO site(nome, contato_responsavel_site) VALUES ('" + req.body.txtNome + "', '" + req.body.txtContato + "');"
    var r;

    execSQLQuery(query, r);

    console.log(r);
  }

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
