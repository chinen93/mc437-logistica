'use strict';

const express = require('express');

const router = express.Router();

/* GET cadastro page. */
router.get('/transportadora', (req, res) => {
  const cadastroTitle = 'Cadastro de Transportadoras';
  const tableLabel = 'Transportadora';
  const tableHeader = [
    '#', 'Nome', 'Estado', 'Contato'
  ];
  const tableContent = [
    ['1', 'Transp X', 'São Paulo', '123'],
    ['2', 'Transp Y', 'Rio de Janeiro', '456'],
    ['3', 'Transp Z', 'Brasília DF', '789']
  ];
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Transportadora',
    inputs: [
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Estado', identificador: 'txtEstado' },
      { titulo: 'Contato', identificador: 'txtContato' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Transportadora',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Transportadora',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Estado', identificador: 'txtEstado' },
      { titulo: 'Contato', identificador: 'txtContato' }
    ]
  };
  const formType = 'transportadora';

  res.render('cadastro/index', {
    cadastroTitle,
    tableLabel,
    tableHeader,
    tableContent,
    formAdicionar,
    formRemover,
    formAlterar,
    formType
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});

router.get('/taxa', (req, res) => {
  const cadastroTitle = 'Cadastro de Taxas da Transportadora X';
  const tableLabel = 'Taxas';
  const tableHeader = [
    '#', 'Estado Origem', 'Estado destino', 'Valor/Km', 'Valor/Kg'
  ];
  const tableContent = [
    ['1', 'São Paulo', 'São Paulo', 'R$ 0,5', 'R$ 5,0'],
    ['2', 'São Paulo', 'Rio de Janeiro', 'R$ 0,9', 'R$ 8,0'],
    ['3', 'São Paulo', 'Brasília DF', 'R$ 1,2', 'R$ 10,0']
  ];
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Taxa',
    inputs: [
      { titulo: 'Estado Origem', identificador: 'txtEstOri' },
      { titulo: 'Estado Destino', identificador: 'txtEstDest' },
      { titulo: 'Valor/Km', identificador: 'txtValorKm', tipo: 'valor' },
      { titulo: 'Valor/Kg', identificador: 'txtValorKg', tipo: 'valor' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Taxa',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Taxa',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Estado Origem', identificador: 'txtEstOri' },
      { titulo: 'Estado Destino', identificador: 'txtEstDest' },
      { titulo: 'Valor/Km', identificador: 'txtValorKm', tipo: 'valor' },
      { titulo: 'Valor/Kg', identificador: 'txtValorKg', tipo: 'valor' }
    ]
  };
  const formType = 'taxa';

  res.render('cadastro/index', {
    cadastroTitle,
    tableLabel,
    tableHeader,
    tableContent,
    formAdicionar,
    formRemover,
    formAlterar,
    formType
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});


router.get('/site', (req, res) => {
  const cadastroTitle = 'Cadastro de Site';
  const tableLabel = 'Sites';
  const tableHeader = [
    '#', 'Nome', 'Estado', 'Contato'
  ];
  const tableContent = [
    ['1', 'Site X', 'São Paulo', '098'],
    ['2', 'Site Y', 'Rio de Janeiro', '1234'],
    ['3', 'Site Z', 'Brasília DF', '111234']
  ];
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Site',
    inputs: [
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Estado', identificador: 'txtEstado' },
      { titulo: 'Contato', identificador: 'txtContato' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Site',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Site',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Nome', identificador: 'txtNome' },
      { titulo: 'Estado', identificador: 'txtEstado' },
      { titulo: 'Contato', identificador: 'txtContato' }
    ]
  };
  const formType = 'site';

  res.render('cadastro/index', {
    cadastroTitle,
    tableLabel,
    tableHeader,
    tableContent,
    formAdicionar,
    formRemover,
    formAlterar,
    formType
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});


router.get('/entrega', (req, res) => {
  const cadastroTitle = 'Cadastro de Entrega';
  const tableLabel = 'Entregas';
  const tableHeader = [
    '#', 'Status', 'Endereço Origem', 'Endereço Destino', 'Ultimo Endereço'
  ];
  const tableContent = [
    ['1', 'Em Andamento', 'Rua X', 'São Paulo', 'Rua QWE'],
    ['2', 'Entregue', 'Rua Y', 'Rio de Janeiro', 'Av RTY'],
    ['3', 'Em Andamento', 'Rua Z', 'Brasília DF', 'Rua Oi']
  ];
  const formAdicionar = {
    action: '/adicionar',
    type: 'adicionar',
    submitTxt: 'Adicionar Entrega',
    inputs: [
      { titulo: 'Endereço Origem', identificador: 'txtEndOri' },
      { titulo: 'Endereço Destino', identificador: 'txtEndDest' },
      { titulo: 'Ultimo Endereço', identificador: 'txtUltEnd' },
      { titulo: 'Em Andamento', identificador: 'rdbStatus', tipo: 'radio' },
      { titulo: 'Entregue', identificador: 'rdbStatus', tipo: 'radio' }
    ]
  };
  const formRemover = {
    action: '/remover',
    type: 'remover',
    submitTxt: 'Remover Entrega',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' }
    ]
  };
  const formAlterar = {
    action: '/alterar',
    type: 'alterar',
    submitTxt: 'Alterar Entrega',
    inputs: [
      { titulo: 'Identificador', identificador: 'txtId' },
      { titulo: 'Endereço Origem', identificador: 'txtEndOri' },
      { titulo: 'Endereço Destino', identificador: 'txtEndDest' },
      { titulo: 'Ultimo Endereço', identificador: 'txtUltEnd' },
      { titulo: 'Em Andamento', identificador: 'rdbStatus', tipo: 'radio' },
      { titulo: 'Entregue', identificador: 'rdbStatus', tipo: 'radio' }
    ]
  };
  const formType = 'entrega';

  res.render('cadastro/index', {
    cadastroTitle,
    tableLabel,
    tableHeader,
    tableContent,
    formAdicionar,
    formRemover,
    formAlterar,
    formType
  });
  const nome = req.body.txtName;
  console.log('get' + nome);
});


module.exports = router;
