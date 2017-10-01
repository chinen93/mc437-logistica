const database = require('./MysqlDatabase');

Envio = function(id_envio, cliente, contato_cliente, endereco_cliente, id_site, CPFentregador, data_envio, prazo_previsto, localizacao, pontos_de_parada){
  this.id_envio         = id_envio;
  this.cliente          = cliente;
  this.contato_cliente  = contato_cliente;
  this.endereco_cliente = endereco_cliente;
  this.id_site          = id_site;
  this.CPFentregador    = CPFentregador;
  this.data_envio       = data_envio;
  this.prazo_previsto   = prazo_previsto;
  this.localizacao      = localizacao;
  this.pontos_de_parada = pontos_de_parada;
};

exports.new = function (cliente, contato_cliente, endereco_cliente, id_site, CPFentregador, data_envio, prazo_previsto, localizacao, pontos_de_parada) {
  const query = "INSERT INTO envio(cliente, contato_cliente, endereco_cliente, id_site, CPFentregador, data_envio, prazo_previsto, localizacao, pontos_de_parada) ";
  query      += "VALUES('" + cliente + "', '" + contato_cliente +  "', '" + endereco_cliente + "', '" id_site + "', '" + CPFentregador + "', '" + data_envio + "','" + prazo_previsto + "','" + localizacao + "','" + pontos_de_parada + "');";
  database.execSQLQuery(query, () => {});

  const query = "INSERT INTO entregue_por(id_envio, CPFentregador) VALUES(" + id_envio + "','" + CPFentregador + "');";
  database.execSQLQuery(query, () => {});
};

exports.all = function (callbackFunction) {
  database.execSQLQuery('SELECT * from envio;', (e, r) => {
    const all = [];

    for (let i = 0; i < r.length; i += 1) {
      all.push(new Envio(r[i].id_envio, r[i].cliente, r[i].contato_cliente, r[i].endereco_cliente, r[i].id_site, r[i].CPFentregador, r[i].data_envio, r[i].prazo_previsto, r[i].localizacao, r[i].pontos_de_parada));
    }

    callbackFunction(all);
  });
};

exports.delete = function (id) {
  //Este modelo nao eh deletavel
};

exports.specific = function (id, callbackFunction) {
  database.execSQLQuery('SELECT * from envio where id_envio=' + id + ';', (e, r) => {
    callbackFunction(new Envio(r[i].id_envio, r[i].cliente, r[i].contato_cliente, r[i].endereco_cliente, r[i].id_site, r[i].CPFentregador, r[i].data_envio, r[i].prazo_previsto, r[i].localizacao, r[i].pontos_de_parada))
  });
};

exports.updateLocalization = function(id, newLocalization){
  const query = "UPDATE envio SET localizacao='" + newLocalization + "' WHERE id_envio=" + id + ';';
  database.execSQLQuery(query, (e, r) => {});
};

exports.addCheckpoint = function(id, checkpoint){
  specific(id, (e) => {
    var track = JSON.parse(e.pontos_de_parada);

    track.push(checkpoint);

    const query = "UPDATE envio SET pontos_de_parada='" + JSON.stringfy(track) + "' WHERE id_envio=" + id + ';';
    database.execSQLQuery(query, (e, r) => {});
  })
};

exports.by_site = function(idSite, callbackFunction){
  database.execSQLQuery("SELECT * from envio where id_site= " + idSite + ";", (e, r) => {
    const all = [];

    for (let i = 0; i < r.length; i += 1) {
      all.push(new Envio(r[i].id_envio, r[i].cliente, r[i].contato_cliente, r[i].endereco_cliente, r[i].id_site, r[i].CPFentregador, r[i].data_envio, r[i].prazo_previsto, r[i].localizacao, r[i].pontos_de_parada));
    }

    callbackFunction(all);
  });
};

exports.update = function (id, name, contato, endereco) {
  //Este modelo nao faz update
};

exports.findByAttribute = function (atts) {

};
