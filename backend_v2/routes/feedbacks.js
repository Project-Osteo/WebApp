const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');
const dateFormat = require('dateformat');

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM Feedbacks;",
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//COUNT FEEDBACKS
router.get('/stats', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT COUNT(id_feedback) as 'num_feedbacks' FROM feedbacks`,
            (error, result) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    n_feedbacks: result[0].num_feedbacks
                }
                return res.status(201).send(response);
            }
        )
    });
});

//GET FEEDBACKS DO USER = ID
router.get('/user/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT feedbacks.* FROM feedbacks 
            JOIN consultas ON feedbacks.consulta_id = consultas.id_consulta 
            JOIN pacientes ON consultas.paciente_id = pacientes.id_paciente 
            WHERE user_id = ?;`,
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});



//GET FEEDBACKS DA CONSULTA = ID
router.get('/consulta/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM Feedbacks WHERE consulta_id = ? ORDER BY id_feedback DESC",
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//GET FEEDBACKS DO TREINO = ID
router.get('/treino/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM Feedbacks WHERE treino_id = ? ORDER BY id_feedback DESC",
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});


//GETONE FEEDBACK BY ID
router.get('/:id', (req, res, next) =>  { 
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM Feedbacks WHERE id_feedback = ?",
            [req.params.id],
            (error, result,fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//POST FEEDBACK DA CONSULTA 
router.post('/consulta/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Feedbacks 
            (consulta_id, mensagem)
            VALUES (?, ?);`,
            [
                req.body.consulta_id,
                req.body.mensagem
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                var dataehora = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
                const response = {
                    id_feedback: result.insertId,
                    consulta_id: req.body.consulta_id,
                    mensagem: req.body.mensagem,
                    dataehora: dataehora
                }
                res.status(201).send(response);
            }
        )
    });
});

//POST FEEDBACK DO TREINO
router.post('/treino/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Feedbacks 
            (treino_id, mensagem) 
            VALUES (?, ?);`,
            [
                req.body.treino_id, 
                req.body.mensagem
            ],
            (error, result, fields) => {
                conn.release();
                console.log(result);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Feedback adicionado com sucesso!',
                    feedback_id: result.insertId
                });
            }
        )
    });
});

//UPDATE FEEDBACK
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE Feedbacks SET 
                mensagem = ?,
                dataehora = CURRENT_TIMESTAMP()
            WHERE id_feedback = ?`,
            [
                req.body.mensagem,
                req.params.id
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                var dataehora = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
                const response = {
                    id_feedback: req.params.id,
                    consulta_id: req.body.consulta_id,
                    mensagem: req.body.mensagem,
                    dataehora: dataehora
                }
                res.status(202).send(response)
            }
        )
    });   
});





//DELETE FEEDBACK
router.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM Feedbacks WHERE id_feedback = ?',
            [req.params.id], 
            (error, result, field) => {
                conn.release();
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Feedback apagado',
                });
            }
        )
    });
});

module.exports = router;
