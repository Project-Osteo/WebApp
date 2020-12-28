const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const rotaUtilizadores = require("./routes/utilizadores");
const rotaConsultas = require("./routes/consultas");
const rotaPacientes = require("./routes/pacientes");
const rotaTreinos = require("./routes/treinos");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); //apenas dados json no body

app.use("/utilizadores", rotaUtilizadores);
app.use("/consultas", rotaConsultas);
app.use("/pacientes", rotaPacientes);
app.use("/treinos", rotaTreinos);

//quando não encontra rota
app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
