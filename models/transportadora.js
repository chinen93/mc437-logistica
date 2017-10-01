const Entregador = require('./entregador');
const database = require('./MysqlDatabase');

const Transportadora = function (id, name, contato, precoCm, taxa) {
  this.id = id;
  this.nome = name;
  this.contato = contato;
  this.precoCm = precoCm;
  this.taxa = taxa;
};

exports.new = function (nome, contato, precoCm, taxa) {
  const query = `INSERT INTO transportadora(nome_transportadora, contato_responsavel_transportadora, preco_embalagem_cm_quadrado, taxa_entrega) VALUES ('${nome}', '${contato}', '${precoCm}','${taxa}');`;
  database.execSQLQuery(query, () => {});
};

exports.employees = function (id_transportadora, callbackFunction) {
  Entregador.employed_by(id_transportadora, callbackFunction);
};

exports.all = function (callbackFunction) {
  database.execSQLQuery('SELECT * from transportadora;', (e, r) => {
    const all = [];

    for (let i = 0; i < r.length; i += 1) {
      all.push(new Transportadora(
        r[i].id_transportadora,
        r[i].nome_transportadora,
        r[i].contato_responsavel_transportadora,
        r[i].preco_embalagem_cm_quadrado,
        r[i].taxa_entrega
      ));
    }

    callbackFunction(all);
  });
};

exports.delete = function (id) {
  database.execSQLQuery(`DELETE FROM transportadora WHERE id_transportadora=${id};`, () => {});
};

exports.specific = function (id, callbackFunction) {
  database.execSQLQuery(`SELECT * from transportadora where id_transportadora=${id};`, (e, r) => {
    callbackFunction(new Transportadora(
      r[0].id_transportadora,
      r[0].nome_transportadora,
      r[0].contato_responsavel_transportadora,
      r[0].preco_embalagem_cm_quadrado,
      r[0].taxa_entrega
    ));
  });
};

exports.simulate = function (id, distancia_percurso, tamanho_cm2, preso_produto, callbackFunction){
  specific(id, (e, r) => {
    callbackFunction(r.preco_embalagem_cm_quadrado * tamanho_cm2 + r.taxa_entrega * distancia_percurso);
  });
};

exports.update = function (id, nome, contato, precoCm, taxa) {
  const query = `UPDATE transportadora SET contato_responsavel_transportadora='${contato}', nome_transportadora='${nome}', preco_embalagem_cm_quadrado='${precoCm}', taxa_entrega='${taxa}' WHERE id_site=${id};`;

  database.execSQLQuery(query, () => {});
};
