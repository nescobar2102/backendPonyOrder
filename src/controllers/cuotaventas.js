const db = require('../config/db')

class Cuotaventas  {
        async getCuotaventas() {
            let results = await db.query(`SELECT * FROM cuota_venta ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getCuotaventasByNit(nit) {
            let results = await db.query('SELECT * FROM cuota_venta WHERE  nit = $1', [nit]).catch(console.log); 
            return results.rows;
        }
        async getCuotaventasNitId(nit,id_linea) {
            let results = await db.query('SELECT * FROM cuota_venta WHERE  nit = $1 and id_linea =$2', [nit,id_linea]).catch(console.log); 
            return results.rows;
        }
        async createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre) { 
            let response
            try { 
                const insert = await db.query('INSERT INTO cuota_venta (nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre) VALUES ($1, $2, $3, $4, $5,$6, $7)', [
                    nit,
                    id_vendedor,
                    id_suc_vendedor,
                    venta,
                    cuota,
                    id_linea,
                    nombre
                ]);
                response = insert;
        }  catch (err) {
            response = err;
        }
            return response
        }
    }
module.exports = Cuotaventas;