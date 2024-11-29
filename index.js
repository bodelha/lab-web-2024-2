const startServer = require("./server");

startServer()
    .then(() => console.log("Server listening..."))
    .catch((error) => {
        console.error("Erro ao iniciar o servidor:", error);
    });
