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

  var query;
  var r;

  if (req.query.type == 'site'){
    var query = "DELETE FROM site WHERE id_site= " + req.body.txtId + ";"
    var r;
  }

  if (req.query.type == 'transportadora'){
    var query = "DELETE FROM transportadora WHERE id_site= " + req.body.txtId + ";"
    var r;
  }

  execSQLQuery(query, r);

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
