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

        if (!produto | produto.status=='removido') {
            return h.response({ mensagem: 'Produto não encontrado' }).code(404);
        }

        return h.response(produto).code(200);
    } catch (error) {
        console.error("[Controller] Erro ao buscar produto por ID:", error);
        return h.response({ erro: error.message }).code(500);
    }
};

const atualizarProduto = async (request, h) => {
    try {
        const { id } = request.params;
        const produtoAtualizado = request.payload;
        const produtoExistente = await produtoBusiness.find(id);
        if (!produtoExistente) {
            return h.response({ erro: "Produto não encontrado" }).code(404);
        }
        const produtoParaSalvar = { ...produtoExistente, ...produtoAtualizado };
        const produtoSalvo = await produtoBusiness.save(produtoParaSalvar);

        return h.response(produtoSalvo).code(200);
    } catch (error) {
        console.error("[Controller] Erro ao atualizar produto:", error);
        return h.response({ erro: error.message }).code(500);
    }
};

const removerProduto = async (request, h) => {
    try {
        const { id } = request.params;
        const produtoExistente = await produtoBusiness.find(id);

        if (!produtoExistente) {
            return h.response({ erro: "Produto não encontrado" }).code(404);
        }

        const produtoParaSalvar = { 
            ...produtoExistente, 
            status: 'removido', 
            dataRemocao: new Date()
        };

        const produtoSalvo = await produtoBusiness.save(produtoParaSalvar);

        return h.response(produtoSalvo).code(204);
    } catch (error) {
        console.error("[Controller] Erro ao remover produto:", error);
        return h.response({ erro: error.message }).code(500);
    }
};

module.exports = { criarProduto, obterProdutoPorId, atualizarProduto, removerProduto };
