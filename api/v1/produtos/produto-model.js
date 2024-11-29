const Sequelize = require('sequelize');
const database = require('../../../config/db');
const { categoriasValidas } = require('./produto-schema');

const Produto = database.sequelize.define('Produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'cod_produto'
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    categoria: {
        type: Sequelize.ENUM(...Object.keys(categoriasValidas)),
        allowNull: false,
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    quantidadeEstoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    codigoBarras: {
        type: Sequelize.STRING(13),
        allowNull: false,
        unique: true,
    },
    altura: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    largura: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    profundidade: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    unidadeDimensao: {
        type: Sequelize.ENUM("mm", "cm", "m"),
        allowNull: false,
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    unidadePeso: {
        type: Sequelize.ENUM("g", "kg"),
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('ativo', 'inativo', 'sem estoque'),
        allowNull: false,
        defaultValue: 'ativo',
    }
}, {
    tablename: 'produto',
    createdAt: 'data_cadastro',
    updatedAt: 'data_atualizacao',
    timestamps: true,
    underscored: true
});

module.exports = { Produto };