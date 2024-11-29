const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Aluno', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true,
            field: 'cod_aluno'
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nome'
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'aluno',
        timestamps: false // Desabilita o createdAt e updatedAt do Sequelize
    });
};
