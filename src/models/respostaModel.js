var conexao = require("../database/conexao");

function cadastrar(fkUsuario, conheceAjuda, frequencia, mensagem) {

  var sql = `
    INSERT INTO mensagem
    (fkUsuario, conheceAjuda, frequencia, mensagem)
    VALUES (?, ?, ?, ?)
  `;

  return conexao.promise().query(sql, [
    fkUsuario,
    conheceAjuda,
    frequencia,
    mensagem
  ]);
}

function cadastrarProjeto(fkUsuario, fkProjeto) {

  var sql = "INSERT INTO usuario_projeto (fkUsuario, fkProjeto) VALUES (?, ?)";

  return conexao.promise().query(sql, [fkUsuario, fkProjeto]);
}

function listar() {

  var sql = `
    SELECT 
      usuario.nome,
      mensagem.conheceAjuda,
      mensagem.frequencia,
      mensagem.mensagem,
      GROUP_CONCAT(projeto.nome) AS projetos
    FROM mensagem
    JOIN usuario
    ON mensagem.fkUsuario = usuario.idUsuario
    LEFT JOIN usuario_projeto
    ON usuario.idUsuario = usuario_projeto.fkUsuario
    LEFT JOIN projeto
    ON usuario_projeto.fkProjeto = projeto.idProjeto
    GROUP BY 
      mensagem.idMensagem,
      usuario.nome,
      mensagem.conheceAjuda,
      mensagem.frequencia,
      mensagem.mensagem
  `;

  return conexao.promise().query(sql);
}

function listarProjetos() {
  var sql = `
    SELECT 
      projeto.nome,
      COUNT(usuario_projeto.fkProjeto) AS qtd
    FROM projeto
    LEFT JOIN usuario_projeto
    ON projeto.idProjeto = usuario_projeto.fkProjeto
    GROUP BY projeto.idProjeto, projeto.nome
  `;

  return conexao.promise().query(sql);
}

module.exports = {
  cadastrar,
  cadastrarProjeto,
  listar,
  listarProjetos
};