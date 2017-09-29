'use strict';

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const tableContent = Object.keys(req.body).map(key => [req.body[key]]);

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
