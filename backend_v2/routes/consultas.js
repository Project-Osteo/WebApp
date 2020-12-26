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
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Consultas 
            (paciente_id, data_consulta, descricao_consulta, peso, tratamento, obs_consulta, recomendacao) 
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [
                req.body.paciente_id,
                req.body.data, 
                req.body.descricao, 
                req.body.peso, 
                req.body.tratamento, 
                req.body.obs,
                req.body.recomendacao  
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Consulta criada com sucesso!',
                    consulta_id: result.insertId
                });
            }
        )
    });
});


module.exports = router;
