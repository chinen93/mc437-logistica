'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home/index');
  // res.redirect('/site/list/entregas');
  // res.render('home/index');
});

module.exports = router;
