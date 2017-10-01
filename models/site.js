const database = require('./MysqlDatabase');

const Site = function (id, name, contato, endereco) {
  this.id = id;
  this.nome = name;
  this.contato = contato;
  this.endereco = endereco;
};


exports.new = function (nome, contato, endereco) {
  const query = `INSERT INTO site(nome, contato_responsavel_site, endereco_site) VALUES ('${nome}', '${contato}', '${endereco}');`;
  database.execSQLQuery(query, () => {});
};

exports.all = function (callbackFunction) {
  database.execSQLQuery('SELECT * from site;', (e, r) => {
    const allSites = [];

    console.log(e);

    for (let i = 0; i < r.length; i += 1) {
      allSites.push(new Site(
        r[i].id_site,
        r[i].nome,
        r[i].contato_responsavel_site,
        r[i].endereco_site
      ));
    }

    callbackFunction(allSites);
  });
};


exports.delete = function (id) {
  const query = `DELETE FROM site WHERE id_site=${id};`;
  database.execSQLQuery(query, () => {});
};

exports.specific = function (id, callbackFunction) {
  const query = `SELECT * from site where id_site=${id};`;
  database.execSQLQuery(query, (e, r) => {
    const allSites = [];

    for (let i = 0; i < r.length; i += 1) {
      allSites.push(new Site(
        r[i].id_site,
        r[i].nome,
        r[i].contato_responsavel_site,
        r[i].endereco_site
      ));
    }

    callbackFunction(allSites);
  });
};

exports.update = function (id, nome, contato, endereco) {
  const query = `UPDATE site SET contato_responsavel_site='${contato}', 'nome='${nome}', '${endereco}' WHERE id_site=${id};`;
  database.execSQLQuery(query, () => {});
};

exports.findByAttribute = function (atts) {

};
