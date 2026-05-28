var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;

  if (nome == "" || email == "" || senha == "") {
    res.status(400).send("Preencha todos os campos");
  } else {
    usuarioModel.cadastrar(nome, email, senha)
      .then(function() {
        res.json({ mensagem: "Usuário cadastrado" });
      })
      .catch(function(erro) {
        res.status(500).json(erro);
      });
  }
}

function autenticar(req, res) {
  var email = req.body.email;
  var senha = req.body.senha;

  usuarioModel.autenticar(email, senha)
    .then(function(resultado) {
      if (resultado[0].length > 0) {
        res.json(resultado[0][0]);
      } else {
        res.status(403).send("Email ou senha inválidos");
      }
    })
    .catch(function(erro) {
      res.status(500).json(erro);
    });
}

module.exports = {
  cadastrar,
  autenticar
};