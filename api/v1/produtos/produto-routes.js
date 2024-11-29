const produtoController = require("./produto-controller");
const produtoSchema = require("./produto-schema");

const baseVersion = '/v1';

const routes = [
    {
        method: "POST",
        path: `${baseVersion}/produtos`,
        options: {
            handler: async (request, h) => {
                console.log(`[Route] Rota POST ${baseVersion}/produtos chamada`);
                return produtoController.criarProduto(request, h);
            },
            validate: produtoSchema.criarProduto,
            validate: {
                payload: produtoSchema.criarProduto.payload,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro de validação:", error.details);
                    throw error;
                }
            }
        }
    }
]

module.exports = routes;
