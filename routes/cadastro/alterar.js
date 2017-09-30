'use strict';

const express = require('express');
const router = express.Router();
const Site = require('./../../models/site');


router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);
  const type = res.type;


  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
