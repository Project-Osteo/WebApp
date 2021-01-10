var mysql = require('mysql');
var pool = mysql.createPool({
    "user": "root",
    "password": "admin",
    "database": "osteoclinic",
    "host": "localhost",
    "dateStrings": "true",
    "multipleStatements": "true"
});
exports.pool = pool;