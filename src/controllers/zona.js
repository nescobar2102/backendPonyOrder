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
    async getZonaNitId(nit,id_zona) {
        let results = await db.query('SELECT * FROM zona WHERE nit = $1 and id_zona = $2', [nit,id_zona]).catch(console.log); 
        return results.rows;
    }
    async createZona(id_zona,descripcion,id_padre,nivel,es_padre,nit) { 
        let response 
        try     {     
         const insert = await db.query('INSERT INTO zona (id_zona , descripcion, id_padre, nivel, es_padre, nit) VALUES ($1, $2, $3, $4, $5, $6)', [
            id_zona ,
            descripcion, 
            id_padre,
            nivel,
            es_padre, 
            nit
        ]);
        response = insert;
    } catch (err) { 
        response = err;
       }  
       return response  
    }
}
module.exports = Zona;