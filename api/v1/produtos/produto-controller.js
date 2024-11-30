const produtoBusiness = require("./produto-business");

const criarProduto = async (request, h) => {
    try {
        const produto = await produtoBusiness.save(request.payload);

        return h.response(produto).code(201);
    } catch (error) {
        console.error("[Controller] Erro ao criar produto:", error);
        return h.response({ erro: error.message }).code(500);
    }
};

module.exports = { criarProduto };
