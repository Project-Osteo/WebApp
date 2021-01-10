const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

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


//GETONE FEEDBACK BY ID
router.get('/:id', (req, res, next) =>  { 
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM Feedbacks WHERE id_feedback = ?",
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
            (user_id, consulta_id, mensagem) 
            VALUES (?, ?, ?);`,
            [
                req.body.user_id,
                req.body.consulta_id, 
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

//POST FEEDBACK DO TREINO
router.post('/treino/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Feedbacks 
            (user_id, treino_id, mensagem) 
            VALUES (?, ?, ?);`,
            [
                req.body.user_id,
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
                res.status(202).send({
                    mensagem: 'Feedback alterado com sucesso',
                })
            }
        )
    });   
});

module.exports = router;
