const express = require("express");//import tando o express
const methodOverride = require("method-override");
const path = require("path");

const checkListRouter = require("./src/routes/checklist");
const taskRouter = require("./src/routes/task");
const rootRouter = require("./src/routes/index");
require("./config/database");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
//configurando o arquivo estatico no express
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

//usamos o checkList como se fosse um middleware
app.use("/",rootRouter);
app.use("/checklists",checkListRouter);
app.use("/checklists",taskRouter.checklistDepedent);
app.use("/tasks", taskRouter.simple);
app.listen(3000, () => {
    console.log("Servidor foi iniciado");
})