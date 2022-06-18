const db = require('../config/db')

class Barrio {
    async getBarrio() {
        let results = await db.query(`SELECT * FROM barrio ORDER BY nit ASC`).catch(console.log);
        return results.rows;
    }
    async getBarrioByNit(nit) {
        let results = await db.query('SELECT * FROM barrio WHERE nit = $1 ', [nit]).catch(console.log);
        return results.rows;
    }
    async getBarrioNitId(nit,id_barrio) {       
        let results = await db.query('SELECT * FROM barrio WHERE nit = $1 and id_barrio= $2', [nit,id_barrio]).catch(console.log);
        return results.rows;

    }
    async createBarrio(nit, id_pais, id_depto, id_ciudad, id_barrio, nombre) {
        let response
        try {        
            const insert = await db.query('INSERT INTO barrio (nit,id_pais,id_depto,id_ciudad,id_barrio,nombre) VALUES ($1, $2, $3, $4,$5, $6)', [
                nit,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                nombre
            ]);
            response = insert;
        } catch (err) { 
            response = err;
           }  
           return response
    }
}
module.exports = Barrio;
