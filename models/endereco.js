const database = require('./MysqlDatabase');

const Endereco = function ({
  id, cep, numero, estado, cidade, endereco
}) {
  this.id = id;
  this.cep = cep;
  this.numero = numero;
  this.estado = estado;
  this.cidade = cidade;
  this.endereco = endereco;
};

const newAddress = function ({
  cep, numero, estado, cidade, endereco
}, onReturn) {
  let query = `SELECT * from estado where sigla='${estado}';`;

  database.execSQLQuery(query, (e, data) => {
    if (!data.length) {
      onReturn({ error: 'Estado inválido' });
    }

    query = `INSERT INTO endereco(cep, numero, estado, cidade, endereco) VALUES ('${cep}', '${numero}', '${estado}', '${cidade}', '${endereco}');`;

    database.execSQLQuery(query, (e, data) => onReturn(data));
  });
};

exports.new = newAddress;

exports.vinculate = function ({
  id_site, cep, numero, estado, cidade, endereco
}, onReturn) {
  database.execSQLQuery(`SELECT * from site where id=${id_site};`, (e, sites) => {
    if (!sites.length) {
      onReturn({ error: 'Não foi possível adicionar o endereço pois o site não foi encontrado' });
      return;
    }

    newAddress({
      cep, numero, estado, cidade, endereco
    }, (data) => {
      if (data.error) {
        onReturn(data);
        return;
      }

      database.execSQLQuery(`UPDATE site SET id_endereco=${data.insertId} WHERE id=${id_site};`, (e) => {
        if (e) {
          onReturn({ error: 'Erro ao associar novo endereço' });
          return;
        }

        onReturn({ message: 'Novo endereço foi vinculado ao site com sucesso' });
      });
    });
  });
};

// exports.desvinculate = function ({
//   id_site
// }, onReturn) {
//   database.execSQLQuery(`SELECT * from site where id=${id_site};`, (e, sites) => {
//     if (!sites.length) {
//       onReturn({ error: 'Não foi possível desvincular o endereço pois o site não foi encontrado' });
//       return;
//     }
//
//     database.execSQLQuery(`UPDATE site SET id_endereco=NULL WHERE id=${id_site};`, (e) => {
//       if (e) {
//         onReturn({ error: 'Erro ao desvincular endereço' });
//         return;
//       }
//
//       onReturn({ message: 'Endereço foi desvinculado com sucesso' });
//     });
//   });
// };

exports.specific = function ({ id }, onReturn) {
  const query = `SELECT * from endereco where id=${id};`;

  database.execSQLQuery(query, (e, enderecos) => {
    if (!enderecos.length) {
      onReturn(null);
      return;
    }

    onReturn(new Endereco(enderecos[0]));
  });
};

exports.findByAttribute = function () {};
