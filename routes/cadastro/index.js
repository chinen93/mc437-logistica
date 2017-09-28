'use strict';

const express = require('express');

const router = express.Router();

/* GET cadastro page. */
router.get('/', (req, res) => {
  res.render('cadastro/index', {cadastroTitle: "Transportadora: Logística!!",
				tableLabel: "Taxas",
				tableHeader: ["#", "Estado Origem", "Estado destino", "Valor/Km", "Valor/Kg"],
				tableContent: [["1", "São Paulo", "São Paulo","R$ 0,5", "R$ 5,0"], 
						["2", "São Paulo", "Rio de Janeiro","R$ 0,9", "R$ 8,0"],
						["3", "São Paulo", "Brasília DF","R$ 1,2", "R$ 10,0"]]});
  var nome=req.body.txtName;
  console.log("get"+nome);
});


module.exports = router;
