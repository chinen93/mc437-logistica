'use strict';

const express = require('express');

const router = express.Router();

const envio = require('./envio.js');
const site = require('./site.js');
const consulta = require('./consulta.js');

router.get('/', (req, res) => {
  res.send('Welcome to our api!');
});

router.use('/envio', envio);
router.use('/site', site);
router.use('/consulta', consulta);

module.exports = router;
