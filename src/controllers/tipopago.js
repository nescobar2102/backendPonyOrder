const db = require('../config/db')

class Tipopago 
{
    async getTipopago() {
        let results = await db.query(`SELECT * FROM tipo_pago  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getTipopagoByDesc(descripcion , nit) {
        let results = await db.query('SELECT * FROM tipo_pago WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createTipopago(id_tipo_pago, descripcion, nit ) { 
        let results = await db.query('SELECT * FROM tipo_pago WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO tipo_pago (id_tipo_pago, descripcion, nit) VALUES ($1, $2, $3 )', [
                id_tipo_pago, 
                descripcion,
                nit
            ])
            .catch(console.log);
          return;
        }
}
}
module.exports = Tipopago;