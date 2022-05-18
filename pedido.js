const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PonyOrder',
    password: '123456',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM usuario ORDER BY nit ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}




module.exports = {
   
}