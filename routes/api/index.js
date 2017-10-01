'use strict';

const express = require('express');

const router = express.Router();

const entregador = require('./entregador.js');
const envio = require('./envio.js');
const site = require('./site.js');
const transportadora = require('./transportadora.js');

router.get('/', (req, res) => {
  res.send('Welcome to our api!');
});

router.use('/entregador', entregador);
router.use('/envio', envio);
router.use('/site', site);
router.use('/transportadora', transportadora);

module.exports = router;
