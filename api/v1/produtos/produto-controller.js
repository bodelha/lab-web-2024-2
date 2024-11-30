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

const obterProdutoPorId = async (request, h) => {
    try {
        const { id } = request.params;
        const produto = await produtoBusiness.find(id);

        if (!produto) {
            return h.response({ mensagem: 'Produto não encontrado' }).code(404);
        }

        return h.response(produto).code(200);
    } catch (error) {
        console.error("[Controller] Erro ao buscar produto por ID:", error);
        return h.response({ erro: error.message }).code(500);
    }
};

module.exports = { criarProduto, obterProdutoPorId };
