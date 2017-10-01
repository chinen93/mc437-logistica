const database = require('./MysqlDatabase');

const Entregador = function (id_transportadora, cpf, nome, placa, modelo) {
  this.id = id_transportadora;
  this.cpf = cpf;
  this.nome = nome;
  this.placa = placa;
  this.modelo = modelo;
};

exports.new = function (cpf, id_transportadora, nome, placa, modelo) {
  var query = "INSERT INTO entregador(CPFentregador, id_transportadora, nome_entregador, placa_veiculo, modelo_veiculo) VALUES ('" + cpf + "', '" + id_transportadora + "', '" + nome + "', '" + placa + "', '" + modelo + "');";
  database.execSQLQuery(query, () => {});

  var query = "INSERT INTO contratado_por(CPFentregador, id_transportadora) VALUES ('" + cpf + "', '" + id_transportadora + "');";
  database.execSQLQuery(query, () => {});
};

exports.employed_by = function (id_transportadora, callbackFunction){
  const query = "SELECT * FROM entregador WHERE id_transportadora=" + id_transportadora + ";";
  database.execSQLQuery(query, (e, r) => {
    const all = [];

    for (let i = 0; i < r.length; i += 1) {
      all.push(new Entregador(r[i].id_transportadora, r[i].CPFentregador, r[i].nome_entregador, r[i].placa_veiculo, r[i].modelo_veiculo));
    }

    callbackFunction(all);
  });
};

exports.all = function (callbackFunction) {
  database.execSQLQuery('SELECT * from entregador;', (e, r) => {
    const all = [];

    for (let i = 0; i < r.length; i += 1) {
      all.push(new Entregador(r[i].id_transportadora, r[i].CPFentregador, r[i].nome_entregador, r[i].placa_veiculo, r[i].modelo_veiculo));
    }

    callbackFunction(all);
  });
};

exports.delete = function (cpf, id_entregadora) {
  database.execSQLQuery('DELETE FROM entregador WHERE CPFentregador= ' + cpf + "and id_transportadora= " + id_entregadora +" ;", () => {});
};

exports.specific = function (cpf, id_entregadora, callbackFunction) {
  database.execSQLQuery('SELECT * from entregador where CPFentregador=' + cpf + "and id_transportadora= " + id_entregadora +" ;", (e, r) => {
    callbackFunction(new Entregador(r[i].id_transportadora, r[i].CPFentregador, r[i].nome_entregador, r[i].placa_veiculo, r[i].modelo_veiculo));
  });
};

exports.update = function (cpf, id_transportadora, nome, placa, modelo) {
  const query = "UPDATE entregador SET nome_entregador='" + nome + "', ' placa_veiculo='" + placa + "', modelo_veiculo='" + modelo + "' WHERE CPFentregador=" + cpf + " and id_transportadora='" + id_transportadora + "';";

  database.execSQLQuery(query, () => {});
};

exports.findByAttribute = function (atts) {

};
