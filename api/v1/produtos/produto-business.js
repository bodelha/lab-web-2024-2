const produtoModel = require('./produto-model');

const save = async (produto) => {
    try {
        console.log("Produto recebido para salvar:", produto);

        const saved = await produtoModel.Produto.create(produto);

        console.log("Produto salvo:", saved);

        return produto;
    } catch (error) {
        console.log("Erro ao salvar produto:", error);
        throw error;
    }
}

const converterChaves = (produto) => {
    return {
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: produto.categoria,
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


module.exports = { converterChaves, save };
