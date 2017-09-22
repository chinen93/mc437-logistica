'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/cadastro', (req, res) => {
  res.render('home/cadastro');
});

module.exports = router;
