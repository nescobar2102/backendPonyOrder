const db = require('../config/db')

class Tipopago {
    async getTipopago() {
        let results = await db.query(`SELECT * FROM tipo_pago  ORDER BY nit ASC `).catch(console.log);
        return results.rows;
    }
    async getTipopagoByDesc(nit, descripcion) {
        let results = await db.query('SELECT * FROM tipo_pago WHERE nit = $1 and descripcion = $2', [nit, descripcion]).catch(console.log);
        return results.rows;
    }
    async getTipopagoByid(nit, id_tipo_pago) {
        let results = await db.query('SELECT * FROM tipo_pago WHERE nit = $1 and id_tipo_pago = $2', [nit, id_tipo_pago]).catch(console.log);
        return results.rows;
    }
    async getTipopagoByidDet(nit, id_tipo_pago) {
        let results = await db.query('SELECT * FROM tipo_pagodet WHERE nit = $1 and id_tipo_pago = $2', [nit, id_tipo_pago]).catch(console.log);
        return results.rows;
    }
    async deleteTipopago() {
        await db.query(`DELETE FROM tipo_pago`).catch(console.log);
        await db.query(`DELETE FROM tipo_pagodet`).catch(console.log);
    }
    async createTipopago(id_tipo_pago, descripcion, nit) {
        let response
        try {
            const insert = await db.query('INSERT INTO tipo_pago (id_tipo_pago, descripcion, nit) VALUES ($1, $2, $3 )', [id_tipo_pago, descripcion, nit]);
            response = insert
        } catch (err) {
            response = err
        }
        return response

    }
    async createTipopagodet(nit, id_tipo_pago, id_auxiliar, cuota) {
        let response
        try {
            const insert = await db.query('INSERT INTO tipo_pagodet (nit,id_tipo_pago,id_auxiliar,cuota) VALUES ($1, $2, $3, $4 )', [nit, id_tipo_pago, id_auxiliar, cuota]);
            response = insert
        } catch (err) {
            response = err
        }
        return response
    }
}
module.exports = Tipopago;
