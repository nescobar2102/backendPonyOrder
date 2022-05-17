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
   const getUserByNit = (request, response) => {
    const nit = parseInt(request.params.nit)
  
    pool.query('SELECT * FROM usuario WHERE nit = $1', [nit], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  /**
   * author:nnaguanagua
   * date: 16/0/22
   */
  const deleteUserByNit = (request, response) => {
    const nit = parseInt(request.params.nit)
  
    pool.query('DELETE FROM usuario WHERE nit = $1', [nit], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${nit}`)
    })
  }

  module.exports = {
    getUsers,
    getUserByNit,
    deleteUserByNit
  }

