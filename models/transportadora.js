const database = require('./MysqlDatabase');

const Transportadora = function ({ id, nome }) {
  this.id = id;
  this.nome = nome;
};

exports.specific = function ({ id }, onReturn) {
  const query = `SELECT * from transportadora where id=${id};`;

  database.execSQLQuery(query, (e, transportadoras) => {
    if (!transportadoras.length) {
      onReturn(null);
      return;
    }

    onReturn(new Transportadora(transportadoras[0]));
  });
};
