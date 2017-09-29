'use strict';

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const tableContent = Object.values(req.body).map(value => [value]);

  res.render('cadastro/confirma', {
    tableContent
  });
});


module.exports = router;
