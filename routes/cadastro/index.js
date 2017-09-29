'use strict';

const express = require('express');

const router = express.Router();

/* GET cadastro page. */
router.get('/transportadora', (req, res) => {
    var cadastroTitle = "Cadastro de Transportadoras";

    var tableLabel = "Transportadora";

    var tableHeader = [
	"#", "Nome", "Estado", "Contato"
    ];

    var tableContent = [
	["1", "Transp X", "São Paulo", "123"], 
	["2", "Transp Y", "Rio de Janeiro", "456"],
	["3", "Transp Z", "Brasília DF", "789",]
    ];

    var formAdicionar = {
	action: "/adicionar",
	type: "adicionar",
	submitTxt: "Adicionar Transportadora",
	inputs:[
	    {titulo: "Nome", identificador: "txtNome"},
	    {titulo: "Estado", identificador: "txtEstado"},
	    {titulo: "Contato", identificador: "txtContato"}
	]};

    var formRemover = {
	action: "/remover",
	type: "remover",
	submitTxt: "Remover Transportadora",
	inputs:[
	    {titulo: "Identificador", identificador: "txtId"}
	]};
    
    var formAlterar = {
	action: "/alterar",
	type: "alterar",
	submitTxt: "Alterar Transportadora",
	inputs: [
	    {titulo: "Identificador", identificador: "txtId"},
	    {titulo: "Nome", identificador: "txtNome"},
	    {titulo: "Estado", identificador: "txtEstado"},
	    {titulo: "Contato", identificador: "txtContato"}
	]};

    res.render('cadastro/index', {
	cadastroTitle: cadastroTitle,
	tableLabel: tableLabel,
	tableHeader: tableHeader,
	tableContent: tableContent,
	formAdicionar: formAdicionar,
	formRemover: formRemover,
	formAlterar: formAlterar
    });
    var nome=req.body.txtName;
    console.log("get"+nome);
});


router.get('/taxa', (req, res) => {

    var cadastroTitle = "Cadastro de Taxas da Transportadora X";

    var tableLabel = "Taxas";

    var tableHeader = [
	"#", "Estado Origem", "Estado destino", "Valor/Km", "Valor/Kg"
    ];

    var tableContent = [
	["1", "São Paulo", "São Paulo","R$ 0,5", "R$ 5,0"], 
	["2", "São Paulo", "Rio de Janeiro","R$ 0,9", "R$ 8,0"],
	["3", "São Paulo", "Brasília DF","R$ 1,2", "R$ 10,0"]
    ];

    var formAdicionar = {
	action: "/adicionar",
	type: "adicionar",
	submitTxt: "Adicionar Taxa",
	inputs:[
	    {titulo: "Estado Origem", identificador: "txtEstOri"},
	    {titulo: "Estado Destino", identificador: "txtEstDest"},
	    {titulo: "Valor/Km", identificador: "txtValorKm", tipo: "valor"},
	    {titulo: "Valor/Kg", identificador: "txtValorKg", tipo: "valor"}
	]};

    var formRemover = {
	action: "/remover",
	type: "remover",
	submitTxt: "Remover Taxa",
	inputs:[
	    {titulo: "Identificador", identificador: "txtId"}
	]};
    
    var formAlterar = {
	action: "/alterar",
	type: "alterar",
	submitTxt: "Alterar Taxa",
	inputs: [
	    {titulo: "Identificador", identificador: "txtId"},
	    {titulo: "Estado Origem", identificador: "txtEstOri"},
	    {titulo: "Estado Destino", identificador: "txtEstDest"},
	    {titulo: "Valor/Km", identificador: "txtValorKm", tipo: "valor"},
	    {titulo: "Valor/Kg", identificador: "txtValorKg", tipo: "valor"}
	]};

    res.render('cadastro/index', {
	cadastroTitle: cadastroTitle,
	tableLabel: tableLabel,
	tableHeader: tableHeader,
	tableContent: tableContent,
	formAdicionar: formAdicionar,
	formRemover: formRemover,
	formAlterar: formAlterar
    });
    var nome=req.body.txtName;
    console.log("get"+nome);
});


router.get('/site', (req, res) => {

    var cadastroTitle = "Cadastro de Site";

    var tableLabel = "Sites";

    var tableHeader = [
	"#", "Nome", "Estado", "Contato"
    ];

    var tableContent = [
	["1", "Site X", "São Paulo", "098"], 
	["2", "Site Y", "Rio de Janeiro","1234"],
	["3", "Site Z", "Brasília DF","111234"]
    ];

    var formAdicionar = {
	action: "/adicionar",
	type: "adicionar",
	submitTxt: "Adicionar Site",
	inputs:[
	    {titulo: "Nome", identificador: "txtNome"},
	    {titulo: "Estado", identificador: "txtEstado"},
	    {titulo: "Contato", identificador: "txtContato"}
	]};

    var formRemover = {
	action: "/remover",
	type: "remover",
	submitTxt: "Remover Site",
	inputs:[
	    {titulo: "Identificador", identificador: "txtId"}
	]};
    
    var formAlterar = {
	action: "/alterar",
	type: "alterar",
	submitTxt: "Alterar Site",
	inputs: [
	    {titulo: "Identificador", identificador: "txtId"},
	    {titulo: "Nome", identificador: "txtNome"},
	    {titulo: "Estado", identificador: "txtEstado"},
	    {titulo: "Contato", identificador: "txtContato"}
	]};

    res.render('cadastro/index', {
	cadastroTitle: cadastroTitle,
	tableLabel: tableLabel,
	tableHeader: tableHeader,
	tableContent: tableContent,
	formAdicionar: formAdicionar,
	formRemover: formRemover,
	formAlterar: formAlterar
    });
    var nome=req.body.txtName;
    console.log("get"+nome);
});


router.get('/entrega', (req, res) => {

    var cadastroTitle = "Cadastro de Entrega";

    var tableLabel = "Entregas";

    var tableHeader = [
	"#", "Status", "Endereço Origem", "Endereço Destino", "Ultimo Endereço" 
    ];

    var tableContent = [
	["1", "Em Andamento", "Rua X", "São Paulo", "Rua QWE"], 
	["2", "Entregue", "Rua Y", "Rio de Janeiro", "Av RTY"],
	["3", "Em Andamento", "Rua Z", "Brasília DF", "Rua Oi"]
    ];

    var formAdicionar = {
	action: "/adicionar",
	type: "adicionar",
	submitTxt: "Adicionar Entrega",
	inputs:[
	    {titulo: "Endereço Origem", identificador: "txtEndOri"},
	    {titulo: "Endereço Destino", identificador: "txtEndDest"},
	    {titulo: "Ultimo Endereço", identificador: "txtUltEnd"},
	    {titulo: "Em Andamento", identificador: "rdbStatus", tipo: "radio"},
	    {titulo: "Entregue", identificador: "rdbStatus", tipo: "radio"}
	]};

    var formRemover = {
	action: "/remover",
	type: "remover",
	submitTxt: "Remover Entrega",
	inputs:[
	    {titulo: "Identificador", identificador: "txtId"}
	]};
    
    var formAlterar = {
	action: "/alterar",
	type: "alterar",
	submitTxt: "Alterar Entrega",
	inputs: [
	    {titulo: "Identificador", identificador: "txtId"},
	    {titulo: "Endereço Origem", identificador: "txtEndOri"},
	    {titulo: "Endereço Destino", identificador: "txtEndDest"},
	    {titulo: "Ultimo Endereço", identificador: "txtUltEnd"},
	    {titulo: "Em Andamento", identificador: "rdbStatus", tipo: "radio"},
	    {titulo: "Entregue", identificador: "rdbStatus", tipo: "radio"}
	]};

    res.render('cadastro/index', {
	cadastroTitle: cadastroTitle,
	tableLabel: tableLabel,
	tableHeader: tableHeader,
	tableContent: tableContent,
	formAdicionar: formAdicionar,
	formRemover: formRemover,
	formAlterar: formAlterar
    });
    var nome=req.body.txtName;
    console.log("get"+nome);
});


module.exports = router;
