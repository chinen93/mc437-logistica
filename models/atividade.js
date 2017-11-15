const database = require('./MysqlDatabase');

const Atividade = function ({
  id, id_pacote, descricao, created
}) {
  this.id = id;
  this.id_pacote = id_pacote;
  this.descricao = descricao;
  this.created = created;
};

exports.new = function ({
  id_pacote
}, onReturn) {
  const query = `INSERT INTO atividade(id_pacote, descricao) VALUES ('${id_pacote}', 'O pacote foi postado');`;

  database.execSQLQuery(query, (e, data) => onReturn(data));
};

const by_pacote = function ({
  id_pacote
}, onReturn) {
  const query = `SELECT * from atividade WHERE id_pacote=${id_pacote};`;

  database.execSQLQuery(query, (e, data) => onReturn(data.map(atividade => new Atividade(atividade))));
};

exports.by_pacote = by_pacote;

exports.last = function ({
  id_pacote
}, onReturn) {
  by_pacote({ id_pacote }, (atividades) => {
    if (!atividades.length) {
      onReturn(null);
      return;
    }

    onReturn(new Atividade(atividades[atividades.length - 1]));
  });
};

exports.findByAttribute = function () {};
