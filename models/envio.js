const database = require('./MysqlDatabase');
const utils = require('./utils');
const Endereco = require('./endereco');
const Atividade = require('./atividade');
const Transportadora = require('./transportadora');
const Site = require('./site');

const Pacote = function ({
  id,
  id_transportadora,
  id_site,
  id_partida,
  id_destino,
  status,
  preco,
  destinatario,
  created,
  modified
}) {
  this.id = id;
  this.id_transportadora = id_transportadora;
  this.id_site = id_site;
  this.id_partida = id_partida;
  this.id_destino = id_destino;
  this.status = status;
  this.preco = preco;
  this.destinatario = destinatario;
  this.created = created;
  this.modified = modified;
};

const envioComNovosEnderecos = function (
  {
    id_site,
    volume,
    destinatario,
    partida_cep,
    partida_numero,
    partida_estado,
    partida_cidade,
    partida_endereco,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade,
    destino_endereco
  },
  onReturn
) {
  if (!utils.estadoValido(partida_estado)) {
    onReturn({ erro: 'Estado de partida inválido' });
    return;
  }

  if (!utils.estadoValido(destino_estado)) {
    onReturn({ erro: 'Estado de destino inválido' });
    return;
  }

  const query = partida_estado === destino_estado ?
    `select id, nome, taxa_distancia, taxa_tamanho, taxa_fixa from transportadora as t
    join transportadora_estado as te
    on t.id = te.id_transportadora
    where te.estado="${partida_estado}"
    group by id`
    :
    `select id, nome, taxa_distancia, taxa_tamanho, taxa_fixa from transportadora as t
    join transportadora_estado as te
    on t.id = te.id_transportadora
    where te.estado="${partida_estado}" or te.estado="${destino_estado}"
    group by id
    having count(*) > 1;`;

  database.execSQLQuery(query, (e, transportadoras) => {
    if (!transportadoras.length) {
      onReturn({ error: 'Não há transportadoras disponíveis para fazer transporte entre esses locais' });
      return;
    }

    database.execSQLQuery(`SELECT distancia from distancia where partida="${partida_estado}" AND destino="${destino_estado}";`, (e, distancias) => {
      const { distancia } = distancias[0];
      let melhor = { preco: null, transportadora: null };

      transportadoras.forEach((transportadora) => {
        let preco = transportadora.taxa_fixa || 0;

        preco += transportadora.taxa_distancia * distancia;
        preco += transportadora.taxa_tamanho * parseFloat(volume) > 30 ?
          30 : transportadora.taxa_tamanho * parseFloat(volume);

        if (!melhor.preco || preco < melhor.preco) {
          melhor = { preco, transportadora };
        }
      });

      Endereco.new({
        cep: partida_cep, numero: partida_numero, estado: partida_estado, cidade: partida_cidade, endereco: partida_endereco
      }, (partida) => {
        Endereco.new({
          cep: destino_cep, numero: destino_numero, estado: destino_estado, cidade: destino_cidade, endereco: destino_endereco
        }, (destino) => {
          database.execSQLQuery(`INSERT INTO pacote(id_transportadora, id_site, id_partida, id_destino, destinatario, preco)
          VALUES ('${melhor.transportadora.id}', '${id_site}', '${partida.insertId}', '${destino.insertId}', '${destinatario}', '${melhor.preco.toFixed(2)}');`, (e, pacote) => {
            Atividade.new({ id_pacote: pacote.insertId }, () => {});
            onReturn({ message: 'Novo envio foi postado com sucesso', id: pacote.insertId, preco: parseFloat(melhor.preco.toFixed(2)) });
          });
        });
      });
    });
  });
};

const envioComNovoEndereco = function (
  {
    id_site,
    volume,
    destinatario,
    partida,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade,
    destino_endereco
  },
  onReturn
) {
  console.log({
    id_site,
    volume,
    destinatario,
    partida,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade,
    destino_endereco
  });
  if (!utils.estadoValido(destino_estado)) {
    onReturn({ erro: 'Estado de destino inválido' });
    return;
  }

  const query = partida.estado === destino_estado ?
    `select id, nome, taxa_distancia, taxa_tamanho, taxa_fixa from transportadora as t
    join transportadora_estado as te
    on t.id = te.id_transportadora
    where te.estado="${partida.estado}"
    group by id`
    :
    `select id, nome, taxa_distancia, taxa_tamanho, taxa_fixa from transportadora as t
    join transportadora_estado as te
    on t.id = te.id_transportadora
    where te.estado="${partida.estado}" or te.estado="${destino_estado}"
    group by id
    having count(*) > 1;`;

  database.execSQLQuery(query, (e, transportadoras) => {
    if (!transportadoras.length) {
      onReturn({ error: 'Não há transportadoras disponíveis para fazer transporte entre esses locais' });
      return;
    }

    database.execSQLQuery(`SELECT distancia from distancia where partida="${partida.estado}" AND destino="${destino_estado}";`, (e, distancias) => {
      const { distancia } = distancias[0];
      let melhor = { preco: null, transportadora: null };

      transportadoras.forEach((transportadora) => {
        let preco = transportadora.taxa_fixa || 0;

        preco += transportadora.taxa_distancia * distancia;
        preco += transportadora.taxa_tamanho * parseFloat(volume) > 30 ?
          30 : transportadora.taxa_tamanho * parseFloat(volume);

        if (!melhor.preco || preco < melhor.preco) {
          melhor = { preco, transportadora };
        }
      });

      Endereco.new({
        cep: destino_cep, numero: destino_numero, estado: destino_estado, cidade: destino_cidade, endereco: destino_endereco
      }, (destino) => {
        database.execSQLQuery(`INSERT INTO pacote(id_transportadora, id_site, id_partida, id_destino, destinatario, preco)
          VALUES ('${melhor.transportadora.id}', '${id_site}', '${partida.id}', '${destino.insertId}', '${destinatario}', '${melhor.preco.toFixed(2)}');`, (e, pacote) => {
          Atividade.new({ id_pacote: pacote.insertId }, () => {});
          onReturn({ message: 'Novo envio foi postado com sucesso', id: pacote.insertId, preco: parseFloat(melhor.preco.toFixed(2)) });
        });
      });
    });
  });
};

exports.new = function (
  {
    id_site,
    volume,
    destinatario,
    partida_cep,
    partida_numero,
    partida_estado,
    partida_cidade,
    partida_endereco,
    destino_cep,
    destino_numero,
    destino_estado,
    destino_cidade,
    destino_endereco
  },
  onReturn
) {
  database.execSQLQuery(`SELECT id_endereco from site WHERE id=${id_site};`, (e, sites) => {
    if (!sites.length) {
      onReturn({ error: 'Site inválido' });
      return;
    } else if (!(partida_cep || partida_numero || partida_estado || partida_cidade || partida_endereco) && !sites[0].id_endereco) {
      onReturn({ error: 'Endereço de partida inválido' });
      return;
    } else if (!(partida_cep || partida_numero || partida_estado || partida_cidade || partida_endereco)) {
      database.execSQLQuery(`SELECT * FROM endereco WHERE id=${sites[0].id_endereco}`, (e, enderecos) => {
        console.log('oia ai', enderecos, {
          partida: enderecos[0],
          id_site,
          volume,
          destinatario,
          destino_cep,
          destino_numero,
          destino_estado,
          destino_cidade,
          destino_endereco
        });
        envioComNovoEndereco({
          partida: enderecos[0],
          id_site,
          volume,
          destinatario,
          destino_cep,
          destino_numero,
          destino_estado,
          destino_cidade,
          destino_endereco
        }, onReturn);
      });
      return;
    } else if (!(partida_cep && partida_numero && partida_estado && partida_cidade && partida_endereco)) {
      onReturn({ error: 'Endereco de partida inválido' });
      return;
    }

    envioComNovosEnderecos({
      id_site,
      volume,
      destinatario,
      partida_cep,
      partida_numero,
      partida_estado,
      partida_cidade,
      partida_endereco,
      destino_cep,
      destino_numero,
      destino_estado,
      destino_cidade,
      destino_endereco
    }, onReturn);
  });
};

exports.update = function ({
  id
}, onReturn) {
  database.execSQLQuery(`SELECT status from pacote WHERE id=${id};`, (e, status) => {
    if (!status.length) {
      onReturn({ error: 'Pacote não encontrado' });
      return;
    } else if (status[0].status === 3) {
      onReturn({ error: 'Pacote já foi entregue ao destinatário' });
      return;
    } else if (status[0].status === 4) {
      onReturn({ error: 'Pacotes cancelados não podem ter o seu status alterado' });
      return;
    }

    const insertQuery = status[0].status === 1 ? 'O pacote saiu para entrega ao destinatário' : 'O pacote foi entregue';

    database.execSQLQuery(`INSERT INTO atividade(id_pacote, descricao) VALUES ('${id}', '${insertQuery}');`, (e) => {
      if (e) {
        onReturn({ error: 'Não foi possível alterar o status do seu pacote' });
        return;
      }

      database.execSQLQuery(`UPDATE pacote SET status=${status[0].status + 1} WHERE id=${id};`, () => {
        onReturn({ message: 'Status foi alterado com sucesso', status: insertQuery });
      });
    });
  });
};

exports.cancel = function ({
  id
}, onReturn) {
  database.execSQLQuery(`SELECT status from pacote WHERE id=${id};`, (e, status) => {
    if (!status.length) {
      onReturn({ error: 'Pacote não encontrado' });
      return;
    } else if (status[0].status === 3) {
      onReturn({ error: 'Pacotes entregues não podem ser cancelados' });
      return;
    } else if (status[0].status === 4) {
      onReturn({ error: 'Pacotes cancelados não podem ter o seu status alterado' });
      return;
    }

    database.execSQLQuery(`INSERT INTO atividade(id_pacote, descricao) VALUES ('${id}', 'A entrega do pacote foi cancelada');`, (e) => {
      if (e) {
        onReturn({ error: 'Não foi possível alterar o status do seu pacote' });
        return;
      }

      database.execSQLQuery(`UPDATE pacote SET status=4 WHERE id=${id};`, () => {
        onReturn({ message: 'Status foi alterado com sucesso', status: 'A entrega do pacote foi cancelada' });
      });
    });
  });
};

exports.specific = function ({ id }, onReturn) {
  const query = `SELECT * from pacote where id=${id};`;

  database.execSQLQuery(query, (e, pacotes) => {
    if (!pacotes.length) {
      onReturn({ error: 'Pacote não encontrado' });
      return;
    }

    const pacote = new Pacote(pacotes[0]);

    Atividade.by_pacote({ id_pacote: id }, (atividades) => {
      pacote.atividades = atividades;

      Transportadora.specific({ id: pacote.id_transportadora }, (transportadora) => {
        pacote.transportadora = transportadora;

        Endereco.specific({ id: pacote.id_partida }, (partida) => {
          pacote.partida = partida;

          Endereco.specific({ id: pacote.id_destino }, (destino) => {
            pacote.destino = destino;

            Site.specific({ id: pacote.id_site }, (site) => {
              pacote.site = site;

              onReturn(pacote);
            });
          });
        });
      });
    });
  });
};

exports.status = function ({ id }, onReturn) {
  const query = `SELECT id, status, modified FROM pacote WHERE id=${id};`;

  database.execSQLQuery(query, (e, pacotes) => {
    if (!pacotes.length) {
      onReturn({ error: 'Pacote não encontrado' });
      return;
    }

    const pacote = new Pacote(pacotes[0]);

    Atividade.last({ id_pacote: id }, (atividade) => {
      pacote.status_atual = atividade;

      onReturn(pacote);
    });
  });
};

exports.all = function (onReturn) {
  database.execSQLQuery('SELECT * from pacote;', (e, data) => {
    const pacotes = data.map(pacote => new Pacote(pacote));

    onReturn(pacotes);
  });
};
