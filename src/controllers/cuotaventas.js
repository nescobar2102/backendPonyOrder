const db = require('../config/db')

class Cuotaventas 
    {
        async getCuotaventas() {
            let results = await db.query(`SELECT * FROM cuota_venta ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getCuotaventasByNit(nit,nombre) {
            let results = await db.query('SELECT * FROM cuota_venta WHERE  nit = $1 and nombre = $2', [nit,nombre]).catch(console.log); 
            return results.rows;
        }
        async createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre) { 
            let results = await db.query('SELECT * FROM Cuota_venta WHERE nit = $1 and nombre =$2 and id_linea =$3', [nit,nombre,id_linea]).catch(console.log);
            if (results.rowCount == 0) {     
                return await db
                .query('INSERT INTO cuota_venta (nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre) VALUES ($1, $2, $3, $4, $5,$6, $7)', [
                    nit,
                    id_vendedor,
                    id_suc_vendedor,
                    venta,
                    cuota,
                    id_linea,
                    nombre
                ])
                .catch(console.log);  
            }else{
                return await db.query('UPDATE cuota_venta SET venta = $1 ,cuota = $2 ,nombre = $3 ,id_vendedor = $4 , id_suc_vendedor = $5 WHERE nit = $6 and id_linea= $7', [venta,cuota,nombre,id_vendedor,id_suc_vendedor,nit,id_linea]).catch(console.log);   
            }
    }    
    }
module.exports = Cuotaventas;