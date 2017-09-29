'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/list/entregas');
  // res.render('home/index');
});

module.exports = router;
