const db = require('../config/db')

class Cuotaventas 
    {
        async getCuotaventas() {
            let results = await db.query(`SELECT * FROM Cuota_venta ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getCuotaventasByNit(nit) {
            let results = await db.query('SELECT * FROM Cuota_venta WHERE  nit = $1', [nit]).catch(console.log); 
            return results.rows;
        }
        async createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre) { 
            let results = await db.query('SELECT * FROM Cuota_venta WHERE nit = $1', [nit]).catch(console.log);
            if (results.rowCount == 0) {     
                await db
                .query('INSERT INTO Cuota_venta (nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre) VALUES ($1, $2, $3, $4, $5,$6, $7)', [
                    nit,
                    id_vendedor,
                    id_suc_vendedor,
                    venta,
                    cuota,
                    id_linea,
                    nombre
                ])
                .catch(console.log);
              return;
            }
    }
    
    }
module.exports = Cuotaventas;