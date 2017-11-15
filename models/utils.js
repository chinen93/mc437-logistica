const database = require('./MysqlDatabase');

const estados = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'RJ',
  'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

exports.estadoValido = function (estado) {
  return estados.indexOf(estado) > -1;
};

exports.findByAttribute = function () {};
