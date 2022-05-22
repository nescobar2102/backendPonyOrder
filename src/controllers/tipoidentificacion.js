const db = require('../config/db')

class Tipoidentificacion 
{
    async getTipoidentificacion() {
        let results = await db.query(`SELECT * FROM tipo_identificacion  ORDER BY descripcion ASC `).catch(console.log); 
        return results.rows;
    }
    async getTipoidentificacionByDesc(descripcion) {
        let results = await db.query('SELECT * FROM tipo_identificacion WHERE descripcion = $1', [descripcion]).catch(console.log); 
        return results.rows;
    }
    async createTipoidentificacion(id_tipo_identificacion, descripcion, id_clase_ident) { 
        let results = await db.query('SELECT * FROM tipo_identificacion WHERE descripcion = $1', [descripcion]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO tipo_identificacion (id_tipo_identificacion, descripcion, id_clase_ident ) VALUES ($1, $2, $3)', [
                id_tipo_identificacion,
                descripcion, 
                id_clase_ident
            ])
            .catch(console.log);
          return;
        }
}
}
module.exports = Tipoidentificacion;