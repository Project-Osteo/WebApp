const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'osteoclinic_db_testsql'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//Listar todos os pacientes
app.get('/api/get/pacientes', (req, res) => {
    const sqlSelectAllPacientes = 'SELECT * FROM pacientes';
    db.query(sqlSelectAllPacientes, (err, result) => {
        res.send(result);
    })
});

//Listar todas as consultas
app.get('/api/get/consultas',  (req, res) => {
    const sqlSelectAllConsultas = 'SELECT * FROM consultas';
    db.query(sqlSelectAllConsultas, (err, result) => {
        res.send(result);
    })
});

//Listar todos os treinos
app.get('/api/get/treinos',  (req, res) => {
    const sqlSelectAllTreinos = 'SELECT * FROM consultas';
    db.query(sqlSelectAllTreinos, (err, result) => {
        res.send(result);
    })
});

//Inserir novo utilizador
app.post('/api/registar', (req, res) => {
    const nome ; 
    const email;
    const password;

    const sqlInsertUser = "INSERT INTO utilizadores (nome, mail, pwd) VALUES (?,?,?)";
    db.query(sqlInsertUser, [nome, email, password], (err, result) => {
        console.log(result);
    });
});

//Inserir treino
app.post('/api/treinos/novo', (req, res) => {
    const paciente_id;
    const datatreino;
    const tipotreino;
    const descricao;
    const obs;

    const sqlInsertTreino = "INSERT INTO treinos (paciente_id, data_treino, descricao, tipo, obs)" +  
        "VALUES (?, ?, ?, ?, ?)";
        db.query(sqlInsertTreino, [paciente_id, datatreino, tipotreino, descricao, obs], (err, req) => {
            console.log(result);
        });
});



//Informaçao de uma consulta do paciente
//Informaçao de um treino do paciente



//PEDIDOS MOBILE
//Listar todas as consultas do user
//Listar todos os treinos do user
//Informaçao de uma consulta do user
//Informaçao de um treino do user






app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
