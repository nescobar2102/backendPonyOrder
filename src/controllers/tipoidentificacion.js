const db = require('../config/db')

class Tipoidentificacion {
    
    async getTipoidentificacion() {
        let results = await db.query(`SELECT * FROM tipo_identificacion  ORDER BY descripcion ASC `).catch(console.log); 
        return results.rows;
    }
    async getTipoidentificacion_app() {
        let results = await db.query(`select id_tipo_identificacion as value, descripcion as label from tipo_identificacion  ORDER BY descripcion ASC `).catch(console.log); 
        return results.rows;
    }
  
    async getTipoidentificacionId(id_tipo_identificacion) {      
        let results = await db.query('SELECT * FROM tipo_identificacion WHERE id_tipo_identificacion::integer = $1', [id_tipo_identificacion]).catch(console.log); 
        return results.rows;
    }
    async createTipoidentificacion(id_tipo_identificacion, descripcion) { 
        let response     
            try { 
            const insert = await db.query('INSERT INTO tipo_identificacion (id_tipo_identificacion, descripcion) VALUES ($1, $2)', [
                id_tipo_identificacion,
                descripcion
            ]);
            response = insert;
        } catch (err) {
            response = err;
            }
            return response           
      }
}
module.exports = Tipoidentificacion;