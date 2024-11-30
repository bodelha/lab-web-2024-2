const { sequelize } = require('../../../models');
const produtoModel = require('./produto-model')(sequelize);
const produtoSchema = require('./produto-schema');

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

const save = async (produto) => {
    const produtoNormalizado = mapearParaBanco(produto);
    const produtoSalvo = await produtoModel.create(produtoNormalizado);
    return mapearParaResposta(produtoSalvo);
};


module.exports = { save };
