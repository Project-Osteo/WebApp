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
app.get('/api/pacientes', (req, res) => {
    const sqlSelectAllPacientes = 'SELECT * FROM pacientes';
    db.query(sqlSelectAllPacientes, (err, result) => {
        res.send(result);
    })
});

//Listar todas as consultas
app.get('/api/consultas',  (req, res) => {
    const sqlSelectAllConsultas = 'SELECT * FROM consultas';
    db.query(sqlSelectAllConsultas, (err, result) => {
        res.send(result);
    })
});

//Listar consultas do paciente
app.get('/api/pacientes/:id/consultas', (req, res) => {
    var id = req.params.paciente_id;
    const sqlSelectConsultasFromPaciente = "SELECT * FROM consultas WHERE paciente_id = ?";
    db.query(sqlSelectConsultasFromPaciente, [id], (err, result) => {
        console.log(result);
    });
});

//Listar todos os treinos
app.get('/api/treinos',  (req, res) => {
    const sqlSelectAllTreinos = 'SELECT * FROM consultas';
    db.query(sqlSelectAllTreinos, (err, result) => {
        res.send(result);
    })
});

//Listar treinos do paciente
app.get('/api/pacientes/:id/treinos', (req, res) => {
    var id = req.params.paciente_id;
    const sqlSelectTreinosFromPaciente = "SELECT * FROM treinos WHERE paciente_id = ?";
    db.query(sqlSelectTreinosFromPaciente, (err, result) => {
        console.log(result);
    });

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

//Inserir dados paciente POR ACABAR
app.post('/api/utilizador/inserirdados', (req, res) => {
    const user_id;
    const nome;
    const mail;
    const genero;
    const nacionalidade;
    const localidade;
    const data_nascimento;
    const altura;
    const telemovel;

    const sqlInsertDadosPaciente = "INSERT INTO PACIENTES " +
        "(user_id, nome, mail, genero, nacionalidade, localidade, data_nascimento, altura, telemovel)"



});

//Dados paciente
app.get('/api/utilizador/:id', (req, res) => {
    var id = req.params.id
    const sqlSelectDadosPaciente = "SELECT * FROM pacientes WHERE user_id = ?";
    db.query(sqlSelectDadosPaciente, (err, result) => {
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
