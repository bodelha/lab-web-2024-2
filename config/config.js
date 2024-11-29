const envConfig = require('./envs-config');

module.exports = {
  development: {
    username: envConfig.database.user,
    password: envConfig.database.password,
    database: envConfig.database.name,
    host: envConfig.database.host,
    port: envConfig.database.port,
    dialect: 'postgres',
    logging: console.log
  },
  // Outras configurações (opcionais, para produção ou teste)
  production: {
    username: envConfig.database.user,
    password: envConfig.database.password,
    database: envConfig.database.name,
    host: envConfig.database.host,
    port: envConfig.database.port,
    dialect: 'postgres'
  }
};
