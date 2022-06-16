const db = require('../config/db')

class ClasificacionItems {
    async getclasificacionItems() {
        let results = await db.query(`SELECT * FROM clasificacion_item ORDER BY descripcion ASC`).catch(console.log);
        return results.rows;
    }
    async getclasificacionItemsByDesc(descripcion) {
        let results = await db.query('SELECT * FROM clasificacion_item WHERE descripcion = $1', [descripcion]).catch(console.log);
        return results.rows;
    }
    async createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, imagen, nit) {
        let results = await db.query('SELECT * FROM clasificacion_item WHERE nit = $1 and id_clasificacion = $2', [nit, id_clasificacion]).catch(console.log);
        if (results.rowCount == 0) {
            return await db.query('INSERT INTO clasificacion_item (id_clasificacion, descripcion, id_padre, nivel,  imagen, nit) VALUES ($1, $2, $3, $4,$5, $6 )', [
                id_clasificacion,
                descripcion,
                id_padre,
                nivel,
                imagen,
                nit
            ]).catch(console.log);
        } else {
            return await db.query('UPDATE clasificacion_item SET descripcion = $1, id_padre =$2 , nivel= $3, imagen =$4 WHERE nit = $5 and id_clasificacion = $6', [descripcion, id_padre, nivel, imagen, nit, id_clasificacion]).catch(console.log);
        }
    }
}
module.exports = ClasificacionItems;
