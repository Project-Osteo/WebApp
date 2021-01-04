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
                conn.release();
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
            'SELECT Treinos.id_treino, Treinos.paciente_id, Treinos.data_treino, Treinos.descricao_treino, Treinos.tipo_treino, Treinos.obs_treino, Pacientes.nome FROM Treinos JOIN Pacientes ON Treinos.paciente_id = Pacientes.id_paciente WHERE id_treino = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//NEW TREINO
router.post('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Treinos 
            (paciente_id, data_treino, descricao_treino, tipo_treino, obs_treino) 
            VALUES (?, ?, ?, ?, ?);`,
            [                
                req.params.id,
                req.body.data_treino, 
                req.body.descricao_treino, 
                req.body.tipo_treino,
                req.body.obs_treino
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

//UPDATE TREINO
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE Treinos SET 
                data_treino = ?,
                descricao_treino = ?,
                tipo_treino = ?, 
                obs_treino = ?
            WHERE id_treino = ?`,
            [
                req.body.data_treino, 
                req.body.descricao_treino,
                req.body.tipo_treino,
                req.body.obs_treino,
                req.params.id
            ],
            (error, result, fields) => {
                conn.release();
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Treino alterado com sucesso',
                })
            }
        )
    });   
});

//DELETE TREINO     
router.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM Treinos WHERE id_treino = ?',
            [req.params.id], 
            (error, result, field) => {
                conn.release();
                console.log(error);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Treino removido com sucesso',
                });
            }
        )
    });
});

module.exports = router;