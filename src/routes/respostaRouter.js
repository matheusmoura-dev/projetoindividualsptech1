var express = require("express");

var router = express.Router();

var respostaController = require("../controllers/respostaController");

router.post("/cadastrar", function(req, res) {

  respostaController.cadastrar(req, res);

});

router.get("/listar", function(req, res) {

  respostaController.listar(req, res);

});

router.get("/listarProjetos", function(req, res) {

  respostaController.listarProjetos(req, res);

});

module.exports = router;