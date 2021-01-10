const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');


//GETALL USERS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Utilizadores;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(result);
            }
        )
    });
});

//GETONE USER
router.get('/:id', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query(
            'SELECT * FROM Utilizadores WHERE id_user = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result})
            }
        )
    });
});


//NEW USER
router.post('/register', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query('SELECT * FROM Utilizadores WHERE mail = ?',
        [req.body.mail],
        (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }
            console.log("resultado:" + result);
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'Esse email já se encontra registado'})
            } else {
                bcrypt.hash(req.body.pwd, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        "INSERT INTO Utilizadores (mail, pwd, token) VALUES (?,?,?);",
                        [
                            req.body.mail, 
                            hash,
                            req.body.token
                        ],
                        (error, result) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            const response = {
                                mensagem: 'Utilizador registado com sucesso!',
                                novoUtilizador: {
                                    user_id: result.insertId,
                                    mail: req.body.mail
                                }
                            }
                            return res.status(201).send(response);
                        }
                    )
                });
            }
        })
        
    });
});

//UPDATE USER
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE Utilizadores SET 
                mail = ?,
                pwd = ?
            WHERE id_user = ?`,
            [
                req.body.mail,
                req.body.pwd,
                req.params.id
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Utilizador alterado com sucesso'
                });
            }
        )
    });   
});

//DELETE USER
router.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM Utilizadores WHERE id_user = ?',
            [req.params.id], 
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Utilizador removido com sucesso',
                });
            }
        )
    });
});


router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Utilizadores WHERE mail = ?',
            [req.body.mail],
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                console.log("res:" + results[0].pwd)
                console.log("leng:" + results.length)
                if (results.length < 1) {
                    return res.status(401).send({ mensagem: "Falha no email"});
                }
                bcrypt.compare(req.body.pwd, results[0].pwd, (error, result) => {
                    console.log("oi")
                    if (error) {
                        console.log("erro a verificar pw");
                        return res.status(401).send({ mensagem: "Falha na password"});
                    }
                    if (result) {
                        console.log("verificar pw");
                        return res.status(200).send({ mensagem: "Login efetuado com successo"});
                    }
                    return res.status(401).send({ mensagem: "Falha na autenticação"});
                });
        });
    });
});

module.exports = router;