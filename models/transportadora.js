const database = require("./MysqlDatabase");

Transportadora = function(id, name, contato, precoCm, taxa){
  this.id       = id;
  this.nome     = name;
  this.contato  = contato;
  this.precoCm  = precoCm;
  this.taxa     = taxa;
};

exports.new = function(nome, contato, precoCm, taxa){
  var query = "INSERT INTO transportadora(nome_transportadora, contato_responsavel_transportadora, preco_embalagem_cm_quadrado, taxa_entrega) VALUES ('" + nome + "', '" + contato + "', '"+ precoCm + "','" + taxa + "');"
  database.execSQLQuery(query, function(e, r){});
};

exports.all = function(callbackFunction){
  database.execSQLQuery("SELECT * from transportadora;", function(e, r){
    var all = [];

    for (var i = 0; i < r.length; i++)
      all.push(new Transportadora(r[i].id_transportadora, r[i].nome_transportadora, r[i].contato_responsavel_transportadora, r[i].preco_embalagem_cm_quadrado, r[i].taxa_entrega));

    callbackFunction(all);
  });
};

exports.delete = function(id){
  database.execSQLQuery("DELETE FROM transportadora WHERE id_transportadora= " + id + ";", function(e, r){});
};

exports.specific = function(id){
  database.execSQLQuery("SELECT * from transportadora where id_transportadora=" + id + ";", function(e, r){
    var all = [];

    for (var i = 0; i < r.length; i++)
      all.push(new Site(r[i].id_site, r[i].nome, r[i].contato_responsavel_site, r[i].endereco_site));

    callbackFunction(all);
  });
};
