const database = require('./MysqlDatabase');

const Site = function ({
  id, nome, email, id_endereco, created, modified
}) {
  this.id = id;
  this.nome = nome;
  this.contato = email;
  this.id_endereco = id_endereco;
  this.created = created;
  this.modified = modified;
};

exports.new = function (nome, email, onReturn) {
  const query = `INSERT INTO site(nome, email) VALUES ('${nome}', '${email}');`;

  database.execSQLQuery(query, (e, data) => onReturn(data));
};

exports.all = function (onReturn) {
  database.execSQLQuery('SELECT * from site;', (e, data) => {
    const sites = data.map(site => new Site(site.id, site.nome, site.email));

    onReturn(sites);
  });
};


// exports.delete = function ({ id }, onReturn) {
//   const query = `DELETE FROM site WHERE id=${id};`;
//
//   database.execSQLQuery(query, (e, data) => onReturn({ message: data.affectedRows ? 'Site deletado com sucesso' : 'Nenhum dado foi modificado, id não encontrado' }));
// };

exports.specific = function ({ id }, onReturn) {
  const query = `SELECT * from site where id=${id};`;

  database.execSQLQuery(query, (e, sites) => {
    if (!sites.length) {
      onReturn(null);
      return;
    }

    onReturn(new Site(sites[0]));
  });
};

exports.update = function (id, nome, email, onReturn) {
  const updateData = [];

  if (nome) updateData.push(`nome='${nome}'`);
  if (email) updateData.push(`email='${email}'`);

  const query = `UPDATE site SET ${updateData.join(', ')} WHERE id=${id};`;

  database.execSQLQuery(query, (e, data) => onReturn(data));
};

exports.findByAttribute = function () {};
