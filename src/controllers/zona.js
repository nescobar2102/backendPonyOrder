const db = require('../config/db')

class Zona 
{
    async getZona() {
        let results = await db.query(`SELECT * FROM zona  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getZonaByDesc(descripcion , nit) {
        let results = await db.query('SELECT * FROM zona WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createZona(id_zona , descripcion, id_padre, nivel, es_padre, nit) { 
        let results = await db.query('SELECT * FROM zona WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO zona (id_zona , descripcion, id_padre, nivel, es_padre, nit) VALUES ($1, $2, $3, $4, $5, $6)', [
            id_zona ,
            descripcion, 
            id_padre,
            nivel,
            es_padre, 
            nit
            ])
            .catch(console.log);
          return;
        }
}
}
module.exports = Zona;