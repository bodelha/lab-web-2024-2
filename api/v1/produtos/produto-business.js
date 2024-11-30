const { sequelize } = require('../../../models');
const { Op } = require('sequelize');
const produtoModel = require('./produto-model')(sequelize);
const produtoSchema = require('./produto-schema');

const save = async (produto) => {
    const produtoNormalizado = mapearParaBanco(produto);
    if (produto.id) {
        await produtoModel.update(produtoNormalizado, {
            where: { id: produto.id }
        });
        produtoNormalizado.id = produto.id;
        return mapearParaResposta(produtoNormalizado);
    }

    const produtoSalvo = await produtoModel.create(produtoNormalizado);
    return mapearParaResposta(produtoSalvo);
};

const find = async (id) => {
    try {
        const produto = await produtoModel.findByPk(id);
        return produto ? mapearParaResposta(produto) : null;
    } catch (error) {
        console.error("[Business] Erro ao buscar produto por ID:", error);
        throw error;
    }
};

const findMany = async (filtros = {}) => {
    try {
        const whereClause = {
            status: { [Op.ne]: "removido" }
        };
        if (filtros.categoria) {
            whereClause.categoria = filtros.categoria;
        }
        if (filtros.nome) {
            whereClause.nome = {
                [Op.iLike]: `%${filtros.nome}%`
            };
        }
        if (filtros.status) {
            whereClause.status = filtros.status;
        }
        const produtos = await produtoModel.findAll({
            where: whereClause
        });
        return produtos.map(mapearParaResposta);
    } catch (error) {
        console.error("[Business] Erro ao buscar produtos:", error);
        throw error;
    }
};


const mapearParaBanco = (produto) => {
    return {
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: Object.keys(produtoSchema.categoriasValidas).find(
            key => produtoSchema.categoriasValidas[key] === produto.categoria
        ),
        marca: produto.marca,
        preco: produto.preco,
        quantidadeEstoque: produto.quantidadeEstoque,
        codigoBarras: produto.codigoBarras,
        status: produto.status,
        altura: produto.dimensoes.altura,
        largura: produto.dimensoes.largura,
        profundidade: produto.dimensoes.profundidade,
        unidadeDimensao: produto.dimensoes.unidadeMedida,
        peso: produto.peso.valor,
        unidadePeso: produto.peso.unidadeMedida
    };
};

const mapearParaResposta = (produto) => {
    return {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: produtoSchema.categoriasValidas[produto.categoria],
        marca: produto.marca,
        preco: parseFloat(produto.preco),
        quantidadeEstoque: produto.quantidadeEstoque,
        codigoBarras: produto.codigoBarras,
        status: produto.status,
        dimensoes: {
            altura: produto.altura,
            largura: produto.largura,
            profundidade: produto.profundidade,
            unidadeMedida: produto.unidadeDimensao
        },
        peso: {
            valor: produto.peso,
            unidadeMedida: produto.unidadePeso
        },
        dataCadastro: produto.data_cadastro
    };
};

module.exports = { save, find, findMany };
