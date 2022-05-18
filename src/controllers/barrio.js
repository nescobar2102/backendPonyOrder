const db = require('../config/db')

class Barrio 
{
    async getBarrio() {
        let results = await db.query(`SELECT * FROM barrio ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getBarrioNit(nit) {
        let results = await db.query('SELECT * FROM barrio WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async createBarrio(nit, id_pais, id_depto, id_ciudad, id_barrio, nombre) {
        //let results = await db.query('SELECT * FROM barrio WHERE nit = $1', [nit]).catch(console.log);
            await db
            .query('INSERT INTO barrio (nit,id_pais,id_depto,id_ciudad,id_barrio,nombre) VALUES ($1, $2, $3, $4,$5, $6)', [
                nit,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                nombre
            ])
            .catch(console.log);
          return;
       
        }

}
module.exports = Barrio;