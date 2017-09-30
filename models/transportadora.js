const database = require("./MysqlDatabase");

Site = function(id, name, contato, endereco){
  this.id       = id;
  this.nome     = name;
  this.contato  = contato;
  this.endereco = endereco;
};
