const express = require("express");//import tando o express

const app = express();

//criando uma rota
app.get("/", (req, res) => {
    res.send("<h1>Minha Lista de Tarefas</h1>");
});

//criando um MiddleWare
app.use(express.json());

const log = (req, res, next) =>{
    console.log(req.body);
    console.log(`Data: ${Date.now()}`);
    next();
}

app.use(log);

//devolvendo um json
app.get("/json", (req, res) =>{
    
    res.json({title: "Tarefa X", done: true});
})

//criando um servidor
app.listen(3000, () => {
    console.log("Servidor foi iniciado");
})