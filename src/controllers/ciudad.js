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
    async createCiudad(nit, id_pais, id_depto, id_ciudad, nombre) {
        let results = await db.query('SELECT * FROM ciudad WHERE nit = $1 and id_ciudad = $2', [nit, id_ciudad]).catch(console.log);
        if (results.rowCount == 0) {
            return await db.query('INSERT INTO ciudad (nit,id_pais,id_depto,id_ciudad,nombre) VALUES ($1, $2, $3, $4, $5)', [
                nit,
                id_pais,
                id_depto,
                id_ciudad,
                nombre
            ]).catch(console.log);
        } else {
            return await db.query('UPDATE ciudad SET nombre = $1  WHERE nit = $2 and id_ciudad = $3', [nombre, nit, id_ciudad]).catch(console.log);
        }
    }
}
module.exports = Ciudades;
