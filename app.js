require("dotenv").config();

var express = require("express");
var cors = require("cors");
var path = require("path");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

var usuarioRouter = require("./src/routes/usuarioRouter");
var respostaRouter = require("./src/routes/respostaRouter");

app.use("/usuarios", usuarioRouter);
app.use("/respostas", respostaRouter);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "inicio.html"));
});

app.listen(3333, function() {
  console.log("Servidor rodando na porta 3333");
});