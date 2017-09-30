const database = require("./MysqlDatabase");

Site = function(id, name, contato, endereco){
  this.id       = id;
  this.nome     = name;
  this.contato  = contato;
  this.endereco = endereco;
};

exports.new = function(nome, contato, endereco){
  var query = "INSERT INTO site(nome, contato_responsavel_site, endereco_site) VALUES ('" + nome + "', '" + contato + "', '"+ endereco +"');"

  database.execSQLQuery(query, function(e, r){});
};

exports.all = function(callbackFunction){
  database.execSQLQuery("SELECT * from site;", function(e, r){
    var allSites = [];

    for (var i = 0; i < r.length; i++)
      allSites.push(new Site(r[i].id_site, 
			     r[i].nome, 
			     r[i].contato_responsavel_site, 
			     r[i].endereco_site));

    callbackFunction(allSites);
  });
};

exports.delete = function(id){
  var query = "DELETE FROM site WHERE id_site= " + id + ";";
  database.execSQLQuery(query, function(e, r){});
};

exports.specific = function(id){
  var query = "SELECT * from site where id_site=" + id + ";";
  database.execSQLQuery(query, function(e, r){
    var allSites = [];

    for (var i = 0; i < r.length; i++)
      allSites.push(new Site(r[i].id_site, r[i].nome, r[i].contato_responsavel_site, r[i].endereco_site));

    callbackFunction(allSites);
  });
};

exports.alter = function(id, name, contato, endereco){
  var query = "UPDATE site SET contato_responsavel_site='" + contato + "', 'nome='" + nome + "', '" + endereco + "' WHERE id_site=" + id + ";";
};

exports.findByAttribute = function(atts){

};
