'use strict';

const express = require('express');

const router = express.Router();

const Site = require('./../../models/site');
const Transportadora = require('./../../models/transportadora');


router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);

  const { type } = req.body;

  if (type === 'site') { Site.delete(req.body.txtId); }

  if (type === 'transportadora') { Transportadora.delete(req.body.txtId); }

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
