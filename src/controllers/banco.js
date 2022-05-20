const db = require('../config/db')

class Banco
{
    async getBanco() {
        let results = await db.query(`SELECT * FROM banco ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getBancoByNit(nit) {
        let results = await db.query('SELECT * FROM banco WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async createBanco ( nit, id_banco, descripcion, id_tercero, id_sucursal_tercero ) {
        let results = await db.query('SELECT * FROM banco WHERE nit = $1 and id_banco = $2', [nit, id_banco]).catch(console.log);
        if (results.rowCount == 0) { 
            await db
            .query('INSERT INTO banco (nit, id_banco, descripcion, id_tercero, id_sucursal_tercero) VALUES ($1, $2, $3, $4,$5)', [
                nit, 
                id_banco,
                descripcion,
                id_tercero, 
                id_sucursal_tercero
            ])
            .catch(console.log);
          return;
         }
        }

}
module.exports = Banco;