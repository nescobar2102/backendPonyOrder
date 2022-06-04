const db = require('../config/db')

class Depto 
    {
        async getDepto() {
            let results = await db.query(`SELECT * FROM depto  ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getDeptoByNit(nit) {
            let results = await db.query('SELECT * FROM depto WHERE  nit = $1', [nit]).catch(console.log); 
            return results.rows;
        }
        async deleteDepto() {
            await db.query(`DELETE FROM depto`).catch(console.log);       
      }
        async createDepto(nit,id_pais,id_depto,nombre) {  
               return await db
                .query('INSERT INTO depto (nit,id_pais,id_depto,nombre) VALUES ($1, $2, $3, $4)', [
                    nit,
                    id_pais,
                    id_depto,
                    nombre
                ])
                .catch(console.log);       
     }
    
    }
module.exports = Depto;