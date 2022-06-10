const db = require('../config/db')

class Banco
{
    async getBanco() {
        let results = await db.query(`SELECT * FROM banco ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getBancoByNit(nit)
        {
        let results = await db.query('SELECT * FROM banco WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async deleteBanco() {
        await db.query(`DELETE FROM banco`).catch(console.log);  
    }
    async createBanco (nit, id_banco, descripcion ) {
        let results = await db.query('SELECT * FROM banco WHERE nit = $1 and descripcion = $2', [nit, descripcion]).catch(console.log);
        if (results.rowCount == 0) { 
            return await db
            .query('INSERT INTO banco (nit, id_banco, descripcion ) VALUES ($1, $2, $3 )', [
                nit, 
                id_banco,
                descripcion 
            ])
            .catch(console.log);         
         }
        }
}
module.exports = Banco;