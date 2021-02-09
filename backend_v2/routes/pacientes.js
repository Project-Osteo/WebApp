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

//COUNT PACIENTES
router.get('/stats', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT COUNT(id_paciente) as 'num_pacientes' FROM pacientes`,
            (error, result) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    n_pacientes: result[0].num_pacientes
                }
                return res.status(201).send(response);
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


//GET NUM CONSULTAS NUM TREINOS E NUM FEEDBACKS DO PACIENTE BY ID
router.get('/:id/stats', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT COUNT(consultas.id_consulta) as 'num_consultas' FROM consultas WHERE consultas.paciente_id = ?`,
            [req.params.id],
            (error, result) => {
                if (error) { return res.status(500).send({ error: error }) }
                const n_consultas = result[0].num_consultas;
                conn.query(
                    `SELECT COUNT(treinos.id_treino) as 'num_treinos' FROM treinos WHERE treinos.paciente_id = ?`,
                    [req.params.id],
                    (error, resul) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        const n_treinos = resul[0].num_treinos;
                        conn.query(
                            `SELECT COUNT(feedbacks.id_feedback) as 'num_feedbacks' FROM feedbacks
                            JOIN consultas ON feedbacks.consulta_id = consultas.id_consulta 
                                        JOIN pacientes ON consultas.paciente_id = pacientes.id_paciente 
                                        WHERE id_paciente = ?;`,
                            [req.params.id],
                            (error, resu) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) }
                                const response = {
                                    n_consultas: n_consultas,
                                    n_treinos: n_treinos,
                                    n_feedbacks: resu[0].num_feedbacks
                                }
                                return res.status(201).send(response);
                        })
                        
                })
        })
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
