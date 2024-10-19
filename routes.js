const { required } = require("joi");
const alunoController = require("./controllers/aluno-controller");
const alunoSchema = require("./controllers/aluno-schema")

const routes = [
    {
        method: "GET",
        path: "/ping",
        handler: (request, h) => {
            return "pong";
        }
    },
    {
        method: "GET",
        path: "/alunos",
        options: {
            handler: alunoController.getAlunos
        }
    },
    {
        method: "POST",
        path: "/alunos",
        options: {
            handler: alunoController.createAluno,
            validate: alunoSchema.createAluno
        }
    },
    {
        method: "GET",
        path: "/alunos/{id}",
        options: {
            handler: alunoController.alunoPorId,
            validate: alunoSchema.consultaPorId
        }
    }
];

module.exports = routes;