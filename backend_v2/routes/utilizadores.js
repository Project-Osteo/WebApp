const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//GETALL USERS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Utilizadores;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result});
            }
        )
    });
});

//GETONE USER
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
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
    mysql.getConnection((error, conn) => {
        const sql ="INSERT INTO Utilizadores (mail, pwd, token) VALUES (?,?,?);SELECT Pacientes.nome, Pacientes.telemovel FROM Pacientes WHERE telemovel = ?;"
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            sql,
            [
                req.body.mail, 
                req.body.pwd, 
                req.body.token,
                req.body.telemovel
            ],
            (error, result, fields) => {
                
                console.log(result);
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Utilizador registado com sucesso!',
                    user_id: result.insertId,
                    res: result
                });
            }
        )
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

/* 
app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'nelsan' && req.body.password === '1234'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
}) */

module.exports = router;