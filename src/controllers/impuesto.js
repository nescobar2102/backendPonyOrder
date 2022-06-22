const db = require('../config/db')

class Impuesto {
        async getImpuesto() {
            let results = await db.query(`SELECT * FROM impuesto ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getImpuestoByNit(nit) {
            let results = await db.query('SELECT * FROM impuesto where nit = $1', [nit]).catch(console.log); 
            return results.rows;
        }
        async getImpuestoNitId(nit,id_impuesto) {
            let results = await db.query('SELECT * FROM impuesto where nit = $1 and id_impuesto = $2', [nit,id_impuesto]).catch(console.log); 
            return results.rows;
        }
        async createImpuesto(nit,id_impuesto,descripcion,tasa,tipo_impuesto,por) { 
            let response
            try {
                const insert =  await db.query('INSERT INTO impuesto (nit,id_impuesto,descripcion,tasa,tipo_impuesto,por) VALUES ($1, $2, $3, $4, $5, $6)', [
                    nit,
                    id_impuesto,
                    descripcion,
                    tasa,
                    tipo_impuesto,
                    por
                ]);
                response = insert;
            } catch (err) {
                response = err;
            }
                return response
            }    
    }
module.exports = Impuesto;