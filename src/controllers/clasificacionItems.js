const db = require('../config/db')

class ClasificacionItems 
    {
        async getclasificacionItems() {
            let results = await db.query(`SELECT * FROM clasificacion_item ORDER BY descripcion ASC`).catch(console.log); 
            return results.rows;
        }
        async getclasificacionItemsByDesc(descripcion) {
            let results = await db.query('SELECT * FROM clasificacion_item WHERE descripcion = $1', [descripcion]).catch(console.log); 
            return results.rows;
        }
        async createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, es_padre, imagen, foto, nit) { 
            let results = await db.query('SELECT * FROM clasificacion_item WHERE nit = $1 and id_clasificacion = $2', [nit, id_clasificacion]).catch(console.log);
            if (results.rowCount == 0) {     
                await db
                .query('INSERT INTO clasificacion_item (id_clasificacion, descripcion, id_padre, nivel, es_padre, imagen, foto, nit) VALUES ($1, $2, $3, $4,$5, $6 ,$7, $8)', [
                    id_clasificacion,
                    descripcion,
                    id_padre,
                    nivel,
                    es_padre,
                    imagen, 
                    foto,
                    nit
                ])
                .catch(console.log);
              return;
            }
    }
    
    }
module.exports = ClasificacionItems;