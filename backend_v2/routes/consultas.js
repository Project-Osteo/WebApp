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


module.exports = router;
