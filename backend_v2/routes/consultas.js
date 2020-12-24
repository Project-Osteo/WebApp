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
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result})
            }
        )
    });
});

//GETONE CONSULTA
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Consultas WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                return res.status(200).send({response: result})
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
            (data, descricao, paciente_id, terapeuta_id, peso, tratamento, obs, recomendacao) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                req.body.data, 
                req.body.descricao, 
                req.body.paciente_id,
                req.body.terapeuta_id, 
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
