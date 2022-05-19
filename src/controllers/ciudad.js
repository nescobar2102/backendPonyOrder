const db = require('../config/db')

class Ciudades {
    async getCiudad() {
        let results = await db.query(`SELECT * FROM ciudad ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getCiudadByNit(nit) {
    let results = await db.query('SELECT * FROM ciudad WHERE nit = $1', [nit]).catch(console.log); 
    return results.rows;
    }
    async createCiudad(nit,id_pais,id_depto,id_ciudad,nombre) {
            await db
            .query('INSERT INTO ciudad (nit,id_pais,id_depto,id_ciudad,nombre) VALUES ($1, $2, $3, $4,$5)', [
                nit,
                id_pais,
                id_depto,
                id_ciudad,
                nombre
            ])
            .catch(console.log);
          return;
       
        }
}
module.exports = Ciudades;