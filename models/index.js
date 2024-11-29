const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); // Instância do Sequelize já configurada

const models = {};

// Caminho base onde estão os subdiretórios com os arquivos `*-model.js`
const basePath = path.resolve(__dirname, '../api/v1');

// Função recursiva para localizar arquivos `*-model.js`
function loadModels(dir) {
  console.log(`Procurando modelos no diretório: ${dir}`);
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      console.log(`Entrando no subdiretório: ${fullPath}`);
      // Se for um diretório, chama recursivamente
      loadModels(fullPath);
    } else if (file.endsWith('-model.js')) {
      console.log(`Encontrado modelo: ${file}`);
      // Importa o modelo diretamente
      const model = require(fullPath)(sequelize, Sequelize.DataTypes);
      if (model && model.name) {
        console.log(`Carregando modelo: ${model.name}`);
        models[model.name] = model;
      } else {
        console.warn(`Modelo inválido ou sem nome em: ${file}`);
      }
    } else {
      console.log(`Ignorando arquivo: ${file}`);
    }
  });
}

// Carrega os modelos de todos os subdiretórios
loadModels(basePath);

// Configura associações, caso existam
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    console.log(`Configurando associações para o modelo: ${modelName}`);
    models[modelName].associate(models);
  }
});

console.log('Modelos carregados:', Object.keys(models));

// Sincroniza o banco de dados automaticamente (apenas para desenvolvimento)
(async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true }); // Ajusta o banco conforme os modelos
      console.log('Tabelas sincronizadas com sucesso!');
    } else {
      console.log('Sincronização automática desativada em produção.');
    }
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error);
  }
})();

module.exports = { sequelize, Sequelize, models };
