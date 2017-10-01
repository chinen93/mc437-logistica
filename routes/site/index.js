'use strict';

const express = require('express');

const router = express.Router();

const home = require('./home/index.js');
const cadastro = require('./cadastro/index.js');
const adicionar = require('./cadastro/adicionar.js');
const alterar = require('./cadastro/alterar.js');
const remover = require('./cadastro/remover.js');
const list = require('./list/index.js');


router.use('/', home);
router.use('/cadastro', cadastro);
router.use('/cadastro/adicionar', adicionar);
router.use('/cadastro/alterar', alterar);
router.use('/cadastro/remover', remover);
router.use('/list', list);

module.exports = router;
