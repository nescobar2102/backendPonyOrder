const db = require('../config/db')

class Concepto 
    {
        async getConcepto() {
            let results = await db.query(`SELECT * FROM conceptos ORDER BY descripcion ASC`).catch(console.log); 
            return results.rows;
        }
        async getConceptoByDesc(descripcion , nit) {
            let results = await db.query('SELECT * FROM conceptos WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
            return results.rows;
        }
        async createConcepto(nit, id_concepto, id_auxiliar, descripcion, naturalezacta) { 
            let results = await db.query('SELECT * FROM conceptos WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log);
            if (results.rowCount == 0) {     
                await db
                .query('INSERT INTO conceptos (nit, id_concepto, id_auxiliar, descripcion, naturalezacta) VALUES ($1, $2, $3, $4, $5)', [
                    nit, 
                    id_concepto,
                    id_auxiliar,
                    descripcion, 
                    naturalezacta
                ])
                .catch(console.log);
              return;
            }
    }
    
    }
module.exports = Concepto 
;

