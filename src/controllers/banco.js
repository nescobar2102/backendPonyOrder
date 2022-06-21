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
    async getBancoNitId(nit,id_banco)  {
    let results = await db.query('SELECT * FROM banco WHERE nit = $1 and id_banco = $2', [nit,id_banco]).catch(console.log); 
    return results.rows;        
    }

    async createBanco (nit, id_banco, descripcion ) {
        let response

        try {
            const insert = await db.query('INSERT INTO banco (nit, id_banco, descripcion ) VALUES ($1, $2, $3 )', [
                nit, 
                id_banco,
                descripcion 
            ]);
            response = insert;
            }  catch (err) {
                response = err;
            }
            return response
        }
}
module.exports = Banco;