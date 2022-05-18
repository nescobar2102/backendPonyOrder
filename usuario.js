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
    const { nit, correo_electronico, usuario, nombre, flag_activo, clave } = request.body
    pool.query('SELECT * FROM usuario WHERE nit = $1', [nit], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        if (results.rowCount > 0) {
            response.status(200).json(results.rows)
        }
        else {
            pool.query('INSERT INTO usuario (nit, correo_electronico, usuario, nombre, flag_activo, clave) VALUES ($1, $2, $3, $4,$5, $6)',
                [nit, correo_electronico, usuario, nombre, flag_activo, clave], (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(201).send(`User added with nit: ${results.rowCount}`)
                })
        }
    })
} // actualizar un usuario
const updateUser = (request, response) => {
    const nit = parseInt(request.params.nit)
    const { correo_electronico, usuario, nombre, flag_activo, clave } = request.body

    pool.query(
        'UPDATE usuario 	SET nombre = $1, correo_electronico = $2, usuario = $3, flag_activo = $4, clave = $5 WHERE nit = $6',
        [nombre, correo_electronico, usuario, flag_activo, clave, nit],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            response.status(200).send(`User modified with nit: ${nit} rowCount :  ${results.rowCount}`)
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
const login = (request, response) => {
    const { usuario, clave } = request.body

    pool.query('SELECT * FROM usuario WHERE usuario = $1 and clave = $2', [usuario , clave], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0) {
            response.status(200).json(results.rows)
        }
        else {
            response.status(404).json('El usuario o la clave es invalida')  
        }
    })
}
module.exports = {
    getUsers,
    getUserByNit,
    deleteUserByNit,
    createUser,
    updateUser,
    login
}

