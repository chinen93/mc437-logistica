const database = require('./MysqlDatabase');
const utils = require('./utils');

const consulta = function (
  {
    volume,
    partida_estado,
    destino_estado
  },
  onReturn
) {
  if (!utils.estadoValido(partida_estado)) onReturn({ erro: 'Estado de partida inválido' });

  if (!utils.estadoValido(destino_estado)) onReturn({ erro: 'Estado de destino inválido' });

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
      console.log('o melhor', melhor);
      onReturn({
        message: `Preço calculado de R$${melhor.preco.toFixed(2)} e tempo estimado de ${distancia + 2} dias`,
        preco: parseFloat(melhor.preco.toFixed(2)),
        tempo: distancia + 2
      });
    });
  });
};

exports.new = function (
  {
    id_site,
    volume,
    partida_estado,
    destino_estado
  },
  onReturn
) {
  if (!id_site) {
    consulta({
      volume,
      partida_estado,
      destino_estado
    }, onReturn);
  } else {
    database.execSQLQuery(`SELECT id_endereco FROM site WHERE id=${id_site}`, (e, sites) => {
      if (!sites.length) {
        onReturn({ error: 'A consulta não pôde ser feita pois o site não foi encontrado' });
        return;
      } else if (!sites[0].id_endereco) {
        onReturn({ error: 'O site não tem nenhum endereço vinculado' });
        return;
      }

      database.execSQLQuery(`SELECT estado FROM endereco WHERE id=${sites[0].id_endereco}`, (e, estados) => {
        consulta({
          volume,
          partida_estado: estados[0].estado,
          destino_estado
        }, onReturn);
      });
    });
  }
};
