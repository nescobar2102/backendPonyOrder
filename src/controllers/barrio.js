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
    async createBarrio(nit, id_pais, id_depto, id_ciudad, id_barrio, nombre) {
        let results = await db.query('SELECT * FROM barrio WHERE nit = $1 and id_barrio = $2', [nit, id_barrio]).catch(console.log);
        if (results.rowCount == 0) {
            return await db.query('INSERT INTO barrio (nit,id_pais,id_depto,id_ciudad,id_barrio,nombre) VALUES ($1, $2, $3, $4,$5, $6)', [
                nit,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                nombre
            ]).catch(console.log);
        } else {
            return await db.query('UPDATE barrio SET nombre = $1  WHERE nit = $2 and id_barrio = $3', [nombre, nit, id_barrio]).catch(console.log);
        }
    }
}
module.exports = Barrio;
