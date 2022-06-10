const Pool = require('pg').Pool
const pool = new Pool({
    user: 'ponyuser',
    host: 'localhost',
    database: 'ponyorder',
    password: '123456789',
    port: 5432,
})  

module.exports = pool; 