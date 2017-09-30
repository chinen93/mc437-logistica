'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');

router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);

  var query;
  var r;

  if (req.query.type == 'site'){
    Site.delete(req.body.txtId);
  }

  if (req.query.type == 'transportadora'){
    var query = "DELETE FROM transportadora WHERE id_site= " + req.body.txtId + ";"
    var r;
  }

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
