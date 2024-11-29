const produtoBusiness = require("./produto-business");

const criarProduto = async (request, h) => {
    try {
        const produto = request.payload;

        const produtoConvertido = produtoBusiness.converterChaves(produto);

        const result = await produtoBusiness.save(produtoConvertido);
        console.log("Produto salvo:", result);

        return h.response(result).code(201);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return h.response({ error: error.message }).code(400);
    }
};

module.exports = { criarProduto };
