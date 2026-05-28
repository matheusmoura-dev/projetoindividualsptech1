var conexao = require("../database/conexao");

function cadastrar(nome, email, senha) {
  var sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
  return conexao.promise().query(sql, [nome, email, senha]);
}

function autenticar(email, senha) {
  var sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
  return conexao.promise().query(sql, [email, senha]);
}

module.exports = {
  cadastrar,
  autenticar
};