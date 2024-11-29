const Hapi = require("@hapi/hapi");
const routes = require("./config/routes");
const config = require('./config/envs-config');
const { sequelize } = require('./models');

const server = Hapi.server({
    port: config.port,
    host: config.host,
});

const initializeModels = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
        process.exit(1);
    }
};

const startServer = async () => {
    await initializeModels();
    routes.forEach((path) => server.route(path));
    await server.start();
    console.log(`Servidor foi inicializado com sucesso em ${server.info.uri}`);
};

module.exports = startServer;
