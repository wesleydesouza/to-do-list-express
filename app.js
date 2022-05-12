const express = require("express");//import tando o express
const path = require("path");

const checkListRouter = require("./src/routes/checklist");
const rootRouter = require("./src/routes/index");
require("./config/database");


const app = express();
app.use(express.json());

//configurando o arquivo estatico no express
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

//usamos o checkList como se fosse um middleware
app.use("/",rootRouter);
app.use("/checklists",checkListRouter);

app.listen(3000, () => {
    console.log("Servidor foi iniciado");
})