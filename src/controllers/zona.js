const db = require('../config/db')

class Zona 
{
    async getZona() {
        let results = await db.query(`SELECT * FROM zona  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getZonaByDesc(nit,descripcion) {
        let results = await db.query('SELECT * FROM zona WHERE nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log); 
        return results.rows;
    }
    async createZona(id_zona,descripcion,id_padre,nivel,es_padre,nit) { 
        let results = await db.query('SELECT * FROM zona WHERE nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log);
        if (results.rowCount == 0) {     
            return await db
            .query('INSERT INTO zona (id_zona , descripcion, id_padre, nivel, es_padre, nit) VALUES ($1, $2, $3, $4, $5, $6)', [
            id_zona ,
            descripcion, 
            id_padre,
            nivel,
            es_padre, 
            nit
            ])
            .catch(console.log);  
        }else{
            return await db.query('UPDATE zona SET descripcion = $1 ,nivel = $2 ,es_padre = $3 WHERE nit = $4 and id_zona= $5', [descripcion,nivel,es_padre,nit,id_zona]).catch(console.log);   
        }
}
}
module.exports = Zona;