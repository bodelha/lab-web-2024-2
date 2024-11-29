const Joi = require("joi");

const categoriasValidas = {
    ELETRONICOS: "Eletrônicos",
    ROUPAS: "Roupas",
    LIVROS: "Livros",
    ALIMENTOS: "Alimentos",
    BELEZA: "Beleza",
    BRINQUEDOS: "Brinquedos"
};

const criarProduto = {
    payload: Joi.object({
        nome: Joi
            .string()
            .min(2)
            .required(),
        descricao: Joi
            .string()
            .max(255),
        categoria: Joi
            .string()
            .valid(...Object.values(categoriasValidas))
            .required(),
        marca: Joi
            .string()
            .max(100),
        preco: Joi
            .number()
            .precision(2)
            .positive()
            .required(),
        quantidadeEstoque: Joi
            .number()
            .integer()
            .positive()
            .greater(0)
            .required(),
        codigoBarras: Joi
            .string()
            .length(13)
            .pattern(/^\d{13}$/)
            .required(),
        dimensoes: Joi.object({
            altura: Joi
                .number()
                .positive(),
            largura: Joi
                .number()
                .positive(),
            profundidade: Joi
                .number()
                .positive(),
            unidadeMedida: Joi
                .string()
                .valid("mm", "cm", "m")
        })
            .prefs({
                presence: "required"
            }),
        peso: Joi
            .object({
                valor: Joi
                    .number()
                    .positive(),
                unidadeMedida: Joi
                    .string()
                    .valid("kg", "g")
            })
            .prefs({
                presence: "required"
            }),
        status: Joi
            .string()
            .valid("ativo", "inativo", "sem estoque")
            .default("ativo"),
        dataCadastro: Joi
            .date()
            .iso()
    })
}

module.exports = {
    categoriasValidas,
    criarProduto
}