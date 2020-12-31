const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//GETALL CONSULTAS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM Consultas;",
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//GETONE CONSULTA
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Consultas WHERE id_consulta = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//NEW CONSULTA
router.post('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Consultas 
            (paciente_id, data_consulta, descricao_consulta, peso, tratamento, obs_consulta, recomendacao) 
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [
                req.params.id,
                req.body.data, 
                req.body.descricao, 
                req.body.peso, 
                req.body.tratamento, 
                req.body.obs,
                req.body.recomendacao  
            ],
            (error, result, fields) => {
                conn.release();
                console.log(result);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Consulta criada com sucesso!',
                    consulta_id: result.insertId
                });
            }
        )
    });
});

//UPDATE CONSULTA
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE Consultas SET 
                data_consulta = ?,
                descricao_consulta = ?,
                peso = ?,
                tratamento = ?, 
                obs_consulta = ?,
                recomendacao = ?
            WHERE id_consulta = ?`,
            [
                req.body.data, 
                req.body.descricao,
                req.body.peso,
                req.body.tratamento,
                req.body.obs,
                req.body.recomendacao,
                req.params.id
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Consulta alterado com sucesso',
                })
            }
        )
    });   
});

//DELETE CONSULTA
router.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM Consultas WHERE id_consulta = ?',
            [req.params.id], 
            (error, result, field) => {
                conn.release();
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Consulta removida com sucesso',
                });
            }
        )
    });
});


module.exports = router;
