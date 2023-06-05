const mysql = require('mysql'); 
const util = require('util'); 

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB_NAME || "los-diez-anillos",
    port: process.env.MYSQL_PORT || "3306"
}) 

pool.query = util.promisify(pool.query);

module.exports = pool; 