const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');


//GETALL PACIENTES
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Pacientes;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//GETONE PACIENTES
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Pacientes WHERE user_id = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result)
            }
        )
    });
});

//GETALL CONSULTAS DO PACIENTE
router.get('/:id/consultas', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT Consultas.* FROM Consultas JOIN Pacientes ON Consultas.paciente_id = Pacientes.id_paciente WHERE Pacientes.id_paciente = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result)
            }
        )
    });
});


//GET ALL TREINOS DO PACIENTE
router.get('/:id/treinos', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT Treinos.* FROM Treinos JOIN Pacientes ON Treinos.paciente_id = Pacientes.id_paciente WHERE Pacientes.id_paciente = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result)
            }
        )
    });
});

//NEW PACIENTE
router.post('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Pacientes 
            (user_id, nome, sexo, nacionalidade, localidade, telemovel, peso, altura) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                req.params.id,
                req.body.nome, 
                req.body.sexo, 
                req.body.nacionalidade, 
                req.body.localidade, 
                req.body.telemovel, 
                req.body.peso, 
                req.body.altura
            ],
            (error, result, fields) => {
                conn.release();
                console.log(result);
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Paciente inserido com sucesso!',
                    paciente_id: result.insertId
                });
            }
        )
    });
});

//UPDATE PACIENTE
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE Pacientes SET 
                nome = ?, 
                sexo = ?, 
                nacionalidade = ?, 
                localidade = ?,
                telemovel = ?,
                peso = ?, 
                altura = ?             
            WHERE id_paciente = ?`,
            [
                req.body.nome, 
                req.body.sexo,
                req.body.nacionalidade, 
                req.body.localidade,
                req.body.telemovel, 
                req.body.peso, 
                req.body.altura,
                req.params.id
            ],
            (error, result, fields) => {
                conn.release();
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Paciente alterado com sucesso',
                })
            }
        )
    });   
});

//DELETE PACIENTE
router.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM Pacientes WHERE id_paciente = ?',
            [req.params.id], 
            (error, result, field) => {
                conn.release();
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Paciente removido com sucesso',
                });

            }
        )
    });
});

module.exports = router;
