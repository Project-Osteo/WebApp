const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//GETALL TREINOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Treinos;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//GETONE TREINOS
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Treinos WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//NEW TREINO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Treinos 
            (paciente_id, data_treino, descricao_treino, tipo_treino, obs_treino) 
            VALUES (?, ?, ?, ?, ?);`,
            [                
                req.body.paciente_id,
                req.body.data, 
                req.body.descricao, 
                req.body.tipo,
                req.body.obs           
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Treino criado com sucesso!',
                    treino_id: result.insertId
                });
            }
        )
    });
});

module.exports = router;