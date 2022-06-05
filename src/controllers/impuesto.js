const db = require('../config/db')

class Impuesto 
    {
        async getImpuesto() {
            let results = await db.query(`SELECT * FROM impuesto ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getImpuestoDesc(nit,descripcion) {
            let results = await db.query('SELECT * FROM impuesto where nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log); 
            return results.rows;
        }
        async createImpuesto(nit,id_impuesto,descripcion,tasa,tipo_impuesto,por) { 
            let results = await db.query('SELECT * FROM impuesto WHERE nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log);
            if (results.rowCount == 0) {      
                return await db
                .query('INSERT INTO impuesto (nit,id_impuesto,descripcion,tasa,tipo_impuesto,por) VALUES ($1, $2, $3, $4, $5, $6)', [
                    nit,
                    id_impuesto,
                    descripcion,
                    tasa,
                    tipo_impuesto,
                    por
                ]).catch(console.log);
            }
    }    
    }
module.exports = Impuesto;