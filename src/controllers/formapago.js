const db = require('../config/db')

class Formapago {
    async getFormapago() {
        let results = await db.query(`SELECT * FROM forma_pago ORDER BY nit ASC`).catch(console.log);
        return results.rows;
    }
    async getFormapagoByNit(nit) {
        let results = await db.query('SELECT * FROM forma_pago WHERE nit = $1', [nit]).catch(console.log);
        return results.rows;
    }
    async createFormapago(nit,descripcion,id_precio_item,id_forma_pago) {
        let results = await db.query('SELECT * FROM forma_pago WHERE nit = $1', [nit]).catch(console.log);
        if (results.rowCount == 0) {
            await db.query('INSERT INTO forma_pago (nit,descripcion,id_precio_item,id_forma_pago) VALUES ($1, $2, $3, $4)', [
                nit,
                descripcion,
                id_precio_item,
                id_forma_pago
            ]).catch(console.log);
            return;
        }
    }
    async createFormapagodet(nit, id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo) {
        let results = await db.query('SELECT * FROM forma_pagodet WHERE nit = $1', [nit]).catch(console.log);
        if (results.rowCount == 0) {
            await db.query('INSERT INTO forma_pagodet (nit,id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)', [
                nit,
                id_forma_pago,
                cuota,
                dias,
                tasa,
                clase,
                descripcion_detalle,
                flag_activo        
            ]).catch(console.log);
            return;
        }
    }
}
module.exports = Formapago;

