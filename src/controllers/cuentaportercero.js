const db = require('../config/db')

class Cuentaportercero 
{
    async getCuentaportercero() {
        let results = await db.query(`SELECT * FROM cuentas_por_tercero  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getCuentaporterceroByNit(nit) {
        let results = await db.query('SELECT * FROM cuentas_por_tercero WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async getCuentaporterceroNitId(nit,numero) {
        let results = await db.query('SELECT * FROM cuentas_por_tercero WHERE nit = $1 and numero = $2', [nit,numero]).catch(console.log); 
        return results.rows;
    }    
    /*async deleteCuentaportercero() {
        await db.query(`DELETE FROM cuentas_por_tercero`).catch(console.log);             
  }*/
    async createCuentaportercero(nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto) { 
        let response 
        try {  
            const insert = await db.query('INSERT INTO cuentas_por_tercero (nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9,$10, $11, $12,$13, $14, $15,$16, $17,$18)', [
                nit,
                id_empresa,
                id_sucursal,
                tipo_doc,
                numero,
                cuota,
                dias,
                id_tercero,
                id_vendedor,
                id_sucursal_tercero,
                fecha,
                vencimiento,
                credito,
                dctomax,
                cuota_cruce,
                debito,
                id_destino,
                id_proyecto
            ]);
            response = insert
        } catch(err) {
            response = err
        }       
        return response
    }
}
module.exports = Cuentaportercero;