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

//GETONE PACIENTES by ID
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Pacientes WHERE id_paciente = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    id_paciente: result[0].id_paciente,
                    user_id: result[0].user_id,
                    nome: result[0].nome,
                    sexo: result[0].sexo,
                    nacionalidade: result[0].nacionalidade,
                    localidade: result[0].localidade,
                    telemovel: result[0].telemovel,
                    peso: result[0].peso, 
                    altura:  result[0].altura
                }
                console.log(response);
                return res.status(200).send(response)
            }
        )
    });
});


//GETONE PACIENTES by NOME
router.post('/nome', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Pacientes WHERE nome LIKE ?;',
            [req.body.nome],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    id_paciente: result[0].id_paciente,
                    user_id: result[0].user_id,
                    nome: result[0].nome,
                    sexo: result[0].sexo,
                    nacionalidade: result[0].nacionalidade,
                    localidade: result[0].localidade,
                    telemovel: result[0].telemovel,
                    peso: result[0].peso, 
                    altura:  result[0].altura
                }
                console.log(response);
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
            'SELECT * FROM Consultas WHERE paciente_id = ? ORDER BY id_consulta DESC;',
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
            'SELECT * FROM Treinos WHERE paciente_id = ? ORDER BY id_treino DESC;',
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
                if (error) { return res.status(500).send({ error: error,
                mensagem: 'Este user_id já está a ser utilizado' }) }
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
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Paciente removido com sucesso',
                });

            }
        )
    });
});

module.exports = router;
