const { DataTypes } = require('sequelize');
const produtoSchema = require('./produto-schema'); // Certifique-se de que esse arquivo existe e exporta categoriasValidas

module.exports = (sequelize) => {
    const Produto = sequelize.define('Produto', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'cod_produto'
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        categoria: {
            type: DataTypes.ENUM(...Object.keys(produtoSchema.categoriasValidas)),
            allowNull: false,
        },
        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        quantidadeEstoque: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        codigoBarras: {
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: true,
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        largura: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        profundidade: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        unidadeDimensao: {
            type: DataTypes.ENUM("mm", "cm", "m"),
            allowNull: false,
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        unidadePeso: {
            type: DataTypes.ENUM("g", "kg"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('ativo', 'inativo', 'sem estoque'),
            allowNull: false,
            defaultValue: 'ativo',
        }
    }, {
        tableName: 'produto',
        createdAt: 'data_cadastro',
        updatedAt: 'data_atualizacao',
        timestamps: true,
        underscored: true
    });

    Produto.name = 'Produto';

    return Produto;
};
