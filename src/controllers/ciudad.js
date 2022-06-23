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
    async getCiudadNitId(nit,id_ciudad) {
        let results = await db.query('SELECT * FROM ciudad WHERE nit = $1 and id_ciudad = $2', [nit,id_ciudad]).catch(console.log);
        return results.rows;
    }
    async createCiudad(nit, id_pais, id_depto, id_ciudad, nombre) {
        let response
        try {
            const insert = await db.query('INSERT INTO ciudad (nit,id_pais,id_depto,id_ciudad,nombre) VALUES ($1, $2, $3, $4, $5)', [
                nit,
                id_pais,
                id_depto,
                id_ciudad,
                nombre
            ]);
            response = insert;
    }  catch (err) {
        response = err;
    }
        return response
    }
}
module.exports = Ciudades;
