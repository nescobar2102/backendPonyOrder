const db = require('../config/db')

class Banco
{
    async getBanco() {
        let results = await db.query(`SELECT * FROM banco ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getBancoByNit(nit,descripcion)
        {
        let results = await db.query('SELECT * FROM banco WHERE nit = $1 and descripcion =$2', [nit,descripcion]).catch(console.log); 
        return results.rows;
    }
    async createBanco (nit, id_banco, descripcion, id_tercero, id_sucursal_tercero) {
        let results = await db.query('SELECT * FROM banco WHERE nit = $1 and descripcion = $2', [nit, descripcion]).catch(console.log);
        if (results.rowCount == 0) { 
            return await db
            .query('INSERT INTO banco (nit, id_banco, descripcion, id_tercero, id_sucursal_tercero) VALUES ($1, $2, $3, $4,$5)', [
                nit, 
                id_banco,
                descripcion,
                id_tercero, 
                id_sucursal_tercero
            ])
            .catch(console.log);         
         }
        }
}
module.exports = Banco;