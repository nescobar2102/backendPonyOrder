const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PonyOrder',
    password: '123456',
    port: 5432,
})  
// listar empresa
const getEmpresa = (request, response) => {
    pool.query('SELECT * FROM empresa ORDER BY nit ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getEmpresaNit = (request, response) => {
    const nit = parseInt(request.params.nit)

    pool.query('SELECT * FROM empresa WHERE nit = $1', [nit], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
} 
// crear un nuevo empresa
const createEmpresa = (request, response) => {
    const { nit,dv,razon_social,correo_electronico } = request.body
    pool.query('SELECT * FROM empresa WHERE nit = $1', [nit], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        if (results.rowCount > 0) {
            response.status(200).json(results.rows)
        }
        else {
            pool.query('INSERT INTO empresa ( nit, dv, razon_social, correo_electronico) VALUES ($1, $2, $3, $4)',
                [nit, dv, razon_social, correo_electronico], (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(201).send(`Empresa added with nit: ${results.rowCount}`)
                })
        }
    })
} // actualizar 
const updateEmpresa = (request, response) => {
    const nit = parseInt(request.params.nit)
    const { razon_social, correo_electronico } = request.body

    pool.query(
        'UPDATE empresa SET correo_electronico = $1, razon_social = $2 WHERE nit = $3',
        [ correo_electronico, razon_social, nit],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            response.status(200).send(`Empresa modified with nit: ${nit} rowCount :  ${results.rowCount}`)
        }
    )
}
// actualizar el estatus
const updateEmpresaStatus = (request, response) => {
    const nit = parseInt(request.params.nit)
    const { estado } = request.body

    pool.query(
        'UPDATE empresa SET estado = $1 WHERE nit = $2',
        [ estado, nit],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            response.status(200).send(`Empresa status modified with nit: ${nit} rowCount :  ${results.rowCount}`)
        }
    )
}
module.exports = {
    getEmpresa,
    getEmpresaNit,
    createEmpresa,
    updateEmpresa,
    updateEmpresaStatus
}