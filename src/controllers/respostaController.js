var respostaModel = require("../models/respostaModel");

function cadastrar(req, res) {

  var fkUsuario = req.body.fkUsuario;
  var conheceAjuda = req.body.conheceAjuda;
  var frequencia = req.body.frequencia;
  var mensagem = req.body.mensagem;
  var projetos = req.body.projetos;

  if (
    fkUsuario == "" ||
    conheceAjuda == "" ||
    frequencia == "" ||
    mensagem == "" ||
    projetos == undefined
  ) {

    res.status(400).send("Preencha todos os campos");

  } else {

    respostaModel.cadastrar(
      fkUsuario,
      conheceAjuda,
      frequencia,
      mensagem
    )

    .then(function() {

      for (var i = 0; i < projetos.length; i++) {
        respostaModel.cadastrarProjeto(fkUsuario, projetos[i]);
      }

      res.json({
        mensagem: "Resposta cadastrada"
      });

    })

    .catch(function(erro) {
      res.status(500).json(erro);
    });
  }
}

function listar(req, res) {

  respostaModel.listar()

  .then(function(resultado) {

    res.json(resultado[0]);

  })

  .catch(function(erro) {

    res.status(500).json(erro);

  });

}

function listarProjetos(req, res) {
  respostaModel.listarProjetos()
  .then(function(resultado) {
    res.json(resultado[0]);
  })
  .catch(function(erro) {
    res.status(500).json(erro);
  });
}

module.exports = {
  cadastrar,
  listar,
  listarProjetos
};