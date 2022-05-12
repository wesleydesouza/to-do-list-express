const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//conectando o banco com o app
mongoose.connect("mongodb://localhost/todo-list", { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error(err));