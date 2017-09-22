'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/cadastro', (req, res) => {
  res.render('cadastro/index');
});

module.exports = router;
