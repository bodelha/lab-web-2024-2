const produtoController = require("./produto-controller");
const produtoSchema = require("./produto-schema");

const baseVersion = "/v1";

const routes = [
    {
        method: "POST",
        path: `${baseVersion}/produtos`,
        options: {
            handler: async (request, h) => {
                console.log(`[Route] Rota POST ${baseVersion}/produtos chamada`);
                return produtoController.criarProduto(request, h);
            },
            validate: {
                payload: produtoSchema.criarProduto.payload,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro de validação:", error.details);
                    throw error;
                }
            },
            response: {
                schema: produtoSchema.getProduto.payload,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro na validação da resposta:", error.details);
                    throw error;
                }
            }
        }
    },
    {
        method: "GET",
        path: `${baseVersion}/produtos/{id}`,
        options: {
            handler: async (request, h) => {
                console.log(`[Route] Rota GET ${baseVersion}/produtos/{id} chamada`);
                return produtoController.obterProdutoPorId(request, h);
            },
            validate: {
                params: produtoSchema.getProduto.params,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro de validação nos parâmetros:", error.details);
                    throw error;
                }
            },
            response: {
                schema: produtoSchema.getProduto.response,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro na validação da resposta:", error.details);
                    throw error;
                }
            }
        }
    },
    {
        method: "PUT",
        path: `${baseVersion}/produtos/{id}`,
        options: {
            handler: async (request, h) => {
                console.log(`[Route] Rota PUT ${baseVersion}/produtos/{id} chamada`);
                return produtoController.atualizarProduto(request, h);
            },
            validate: {
                params: produtoSchema.getProduto.params,
                payload: produtoSchema.criarProduto.payload,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro de validação:", error.details);
                    throw error;
                }
            },
            response: {
                schema: produtoSchema.getProduto.payload,
                failAction: (request, h, error) => {
                    console.log("[Route] Erro na validação da resposta:", error.details);
                    throw error;
                }
            }
        }
    }
];

module.exports = routes;
