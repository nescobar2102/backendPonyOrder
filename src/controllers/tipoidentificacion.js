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
    async createTipoidentificacion(id_tipo_identificacion, descripcion) { 
        let results = await db.query('SELECT * FROM tipo_identificacion WHERE descripcion = $1 and id_tipo_identificacion = $2', [descripcion,id_tipo_identificacion]).catch(console.log);
        if (results.rowCount == 0) {     
            return await db
            .query('INSERT INTO tipo_identificacion (id_tipo_identificacion, descripcion) VALUES ($1, $2)', [
                id_tipo_identificacion,
                descripcion
            ])
            .catch(console.log);       
        }
}
}
module.exports = Tipoidentificacion;