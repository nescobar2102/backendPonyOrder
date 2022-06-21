const db = require('../config/db')

class Concepto 
    {
        async getConcepto() {
            let results = await db.query(`SELECT * FROM conceptos ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getConceptoByNitDes(nit,descripcion) {
            let results = await db.query('SELECT * FROM conceptos WHERE nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log); 
            return results.rows;
        }
        async getConceptoNitId(nit,id_concepto) {
            let results = await db.query('SELECT * FROM conceptos WHERE nit = $1 and id_concepto = $2', [nit,id_concepto]).catch(console.log); 
            return results.rows;
        }
        async createConcepto(nit, id_concepto, id_auxiliar, descripcion, naturalezacta) { 
            let  response
            try {
                const insert =await db.query('INSERT INTO conceptos (nit, id_concepto, id_auxiliar, descripcion, naturalezacta) VALUES ($1, $2, $3, $4, $5)', [
                    nit, 
                    id_concepto,
                    id_auxiliar,
                    descripcion, 
                    naturalezacta
                ]);
                response = insert;
            } catch (err) {
                response = err;
            }
            return response
     }    
    }
module.exports = Concepto;

