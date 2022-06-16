const db = require('../config/db')

class Concepto 
    {
        async getConcepto() {
            let results = await db.query(`SELECT * FROM conceptos ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getConceptoByDesc(nit,id_concepto) {
            let results = await db.query('SELECT * FROM conceptos WHERE nit = $1 and id_concepto = $2', [nit,id_concepto]).catch(console.log); 
            return results.rows;
        }
        async createConcepto(nit, id_concepto, id_auxiliar, descripcion, naturalezacta) { 
            let results = await db.query('SELECT * FROM conceptos WHERE nit = $1 and descripcion = $2 and id_concepto = $3', [nit,descripcion,id_concepto]).catch(console.log);
            if (results.rowCount == 0) {        
                return await db
                .query('INSERT INTO conceptos (nit, id_concepto, id_auxiliar, descripcion, naturalezacta) VALUES ($1, $2, $3, $4, $5)', [
                    nit, 
                    id_concepto,
                    id_auxiliar,
                    descripcion, 
                    naturalezacta
                ])
                .catch(console.log);   
           }else{
            return await db.query('UPDATE conceptos SET descripcion = $1 ,naturalezacta = $2 ,id_auxiliar = $3 WHERE nit = $4 and id_concepto= $5', [descripcion,naturalezacta,id_auxiliar,nit,id_concepto]).catch(console.log);   
              
          }
    }    
    }
module.exports = Concepto;

