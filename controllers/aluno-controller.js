var listaAlunos = [];

const getAlunos = async (request, h) => {

    const {query} = request;

    let resultado;
    if (query.nome && query.idade) {
        resultado = listaAlunos
        .filter(aluno => aluno.nome == query.nome && aluno.idade == query.idade)
    }else{
        return listaAlunos;
    }

    return resultado;
}

const createAluno = async (request, h) => {
    console.log(request.payload)
    request.payload.id = Math.floor(Math.random() * 1000)
    listaAlunos.push(request.payload);

    return h.response(request.payload).code(201);
}

const alunoPorId = async (request, h) => {
    const idAluno = request.params.id;
    console.log(idAluno);
    const alunoProcurado = listaAlunos.find(aluno => aluno.id == idAluno);
    if (alunoProcurado) {
        return h.response(alunoProcurado).code(200);
    }
    return h.response({}).code(404);
}

module.exports = { getAlunos, createAluno, alunoPorId };
