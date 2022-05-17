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
  const createUser = (request, response) => {
    const { nombre, correo_electronico } = request.body
  
    pool.query('INSERT INTO usuario (nombre, correo_electronico) VALUES ($1, $2)', [nombre, correo_electronico], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with nit: ${result.insertNit}`)
    })
  }
  const updateUser = (request, response) => {
    const nit = parseInt(request.params.nit)
    const { nombre, correo_electronico } = request.body
  
    pool.query(
      'UPDATE usuario SET nombre = $1, correo_electronico = $2 WHERE nit = $3',
      [nombre, correo_electronico, nit],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with nit: ${nit}`)
      }
    )
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
    deleteUserByNit,
    createUser,
    updateUser,
  }

