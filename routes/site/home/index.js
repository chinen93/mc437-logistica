'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/site/list/entregas');
  // res.render('home/index');
});

module.exports = router;
