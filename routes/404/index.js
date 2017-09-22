'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('404/index');
});

module.exports = router;
