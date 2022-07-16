const db = require('../config/db')

class Zona 
{
    async getZona() {
        let results = await db.query(`SELECT * FROM zona  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getZonaByNit(nit) {
        let results = await db.query('SELECT * FROM zona WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async getZonaByNitApp(nit) {
        let results = await db.query('select id_zona as value, descripcion as label  FROM zona WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async getZonaNitId(nit,id_zona) {
        let results = await db.query('SELECT * FROM zona WHERE nit = $1 and id_zona = $2', [nit,id_zona]).catch(console.log); 
        return results.rows;
    }
    async createZona(nit,id_zona,descripcion,id_padre,nivel,es_padre) { 
        let response 
        try  {     
         const insert = await db.query('INSERT INTO zona (nit,id_zona, descripcion, id_padre, nivel, es_padre) VALUES ($1, $2, $3, $4, $5, $6)', [
            nit,
            id_zona ,
            descripcion, 
            id_padre,
            nivel,
            es_padre            
        ]);
        response = insert;
    } catch (err) { 
        response = err;
    }  
       return response  
    }
}
module.exports = Zona;