//const conexion = require("../../dbconexion")
const Pool = require('pg').Pool
const conexion = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PonyOrder',
  password: '123456',
  port: 5432,
})
module.exports = {
    async insertar(nombre, precio) {
  
        let resultados = await conexion.query(`insert into productos
        (nombre, precio)
        values
        ($1, $2)`, [nombre, precio]);
        return resultados;
    },
    async findAll() {   
        conexion.query('SELECT * FROM usuario ORDER BY nit ASC', (error, results) => { 
            if (error) { 
              throw error
            }  
            return results.rows;
          })  
    },
    async findByNit(nit) {
        const resultados = await conexion.query(`select nit, nombre, usuario from usuario where nit = $1`, [nit]);
        return resultados.rows[0];
    },
    async actualizar(id, nombre, precio) {
        const resultados = conexion.query(`update usuario
        set nombre = $1,
        precio = $2
        where id = $3`, [nombre, precio, id]);
        return resultados;
    },
    async delete(nit) {
        const resultados = conexion.query(`delete from usuario
        where nit = $1`, [nit]);
        return resultados;
    },
}