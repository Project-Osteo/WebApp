var mysql = require('mysql');
var pool = mysql.createPool({
    "user": "root",
    "password": "admin",
    "database": "osteoclinic_db_v3",
    "host": "localhost"
});
exports.pool = pool;