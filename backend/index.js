const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'osteoclinic_db'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Listar todos os pacientes -> ok
app.get('/api/pacientes', (req, res) => {
    const sqlSelectAllPacientes = 'SELECT * FROM pacientes';
    db.query(sqlSelectAllPacientes, (err, result) => {
        res.send(result);
        console.log('erro', err);
    });
});

//Listar todas as consultas -> ok
app.get('/api/consultas',  (req, res) => {
    const sqlSelectAllConsultas = 'SELECT * FROM consultas';
    db.query(sqlSelectAllConsultas, (err, result) => {
        res.send(result);
    });
});

//Listar consultas do paciente -> ok
app.get('/api/pacientes/:id/consultas', (req, res) => {
    const id = req.params.id;
    const sqlSelectConsultasFromPaciente = "SELECT * FROM consultas WHERE paciente_id = ?";
    db.query(sqlSelectConsultasFromPaciente, [id], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

//Listar todos os tratamentos de uma consulta -> ok
app.get('/api/consulta/:id/tratamento', (req, res) => {
    const id = req.params.id;
    const sqlSelectTratamentosFromConsulta = "SELECT * FROM tratamentos WHERE consulta_id = ?";
    db.query(sqlSelectTratamentosFromConsulta, [id], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

//Listar todos os treinos -> ok
app.get('/api/treinos',  (req, res) => {
    const sqlSelectAllTreinos = 'SELECT * FROM treinos';
    db.query(sqlSelectAllTreinos, (err, result) => {
        console.log(result);
        res.send(result);
    });
});


//Listar treinos do paciente -> ok
app.get('/api/pacientes/:id/treinos', (req, res) => {
    var id = req.params.id;
    const sqlSelectTreinosFromPaciente = "SELECT * FROM treinos WHERE paciente_id = ?";
    db.query(sqlSelectTreinosFromPaciente, [id], (err, result) => {
        console.log(result);
        res.send(result);
    });

});

//Listar users -> ok
app.get('/api/utilizadores', (req, res) => {
    const sqlSelectAllUsers = "SELECT * FROM utilizadores";
    db.query(sqlSelectAllUsers, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

//Inserir novo utilizador -> ok
app.post('/api/registar', (req, res) => {
    const name = "";
    const email = "";
    const password = "";

    const sqlInsertUser = "INSERT INTO utilizadores (nome, mail, pwd) VALUES (?,?,?)";
    db.query(sqlInsertUser, [name, email, password], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

//Inserir dados paciente -> ok
app.post('/api/utilizador/inserirdados', (req, res) => {
    const user_id = "";
    const nome = "";
    const mail = "";
    const genero = "";
    const nacionalidade = "";
    const localidade = "";
    const data_nascimento = "";
    const altura = "";
    const telemovel = "";

    const sqlInsertDadosPaciente = "INSERT INTO PACIENTES " +
        "(user_id, nome, mail, genero, nacionalidade, localidade, data_nascimento, altura, telemovel)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsertDadosPaciente, [user_id, nome, mail, genero, nacionalidade, localidade, 
        data_nascimento, altura, telemovel], (err, result) => {
            console.log(result);
            res.send(result);
        });
});

//Dados paciente
app.get('/api/pacientes/:id', (req, res) => {
    const id = req.params.id;

    const sqlSelectDadosPaciente = "SELECT * FROM pacientes WHERE user_id = ?";
    db.query(sqlSelectDadosPaciente, [id], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

//Inserir treino
app.post('/api/treinos/novo', (req, res) => {
    const paciente_id = "";
    const datatreino = "";
    const tipotreino = "";
    const descricao = "";
    const obs = "";

    const sqlInsertTreino = "INSERT INTO treinos (paciente_id, data_treino, descricao, tipo, obs)" +  
        "VALUES (?, ?, ?, ?, ?)";
        db.query(sqlInsertTreino, [paciente_id, datatreino, tipotreino, descricao, obs], (err, req) => {
            console.log(result);
            res.send(result);
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
