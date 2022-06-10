const db = require('../config/db')

class Formapago {
    async getFormapago() {
        let results = await db.query(`SELECT * FROM forma_pago ORDER BY nit ASC`).catch(console.log);
        return results.rows;
    }
    async getFormapagoByNit(nit,descripcion) {
        let results = await db.query('SELECT * FROM forma_pago WHERE nit = $1 and descripcion =$2', [nit,descripcion]).catch(console.log);
        return results.rows;
    }
    async deleteformapago() {
        await db.query(`DELETE FROM forma_pago`).catch(console.log); 
        await db.query(`DELETE FROM forma_pagodet`).catch(console.log);        
  }
    async createFormapago(nit,descripcion,id_precio_item,id_forma_pago) {
        let results = await db.query('SELECT * FROM forma_pago WHERE nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log);
        if (results.rowCount == 0) {
            return await db.query('INSERT INTO forma_pago (nit,descripcion,id_precio_item,id_forma_pago) VALUES ($1, $2, $3, $4)', [
                nit,
                descripcion,
                id_precio_item,
                id_forma_pago
            ]).catch(console.log);            
        }
    }
    async createFormapagodet(nit, id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo) {
        let results = await db.query('SELECT * FROM forma_pagodet WHERE nit = $1 and id_forma_pago =$2', [nit,id_forma_pago]).catch(console.log);
        if (results.rowCount == 0) {
            return await db.query('INSERT INTO forma_pagodet (nit,id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)', [
                nit,
                id_forma_pago,
                cuota,
                dias,
                tasa,
                clase,
                descripcion_detalle,
                flag_activo        
            ]).catch(console.log);            
        }
    }
}
module.exports = Formapago;

