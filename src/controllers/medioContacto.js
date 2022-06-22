const db = require('../config/db')

class MedioContacto {
    async getMedioContacto() {
        let results = await db.query(`SELECT * FROM medio_contacto  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getMedioContactoByNit(nit) {
        let results = await db.query('SELECT * FROM medio_contacto WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async getMedioContactoNitId(nit,id_medio_contacto) {
        let results = await db.query('SELECT * FROM medio_contacto WHERE nit = $1 and id_medio_contacto = $2', [nit,id_medio_contacto]).catch(console.log); 
        return results.rows;
    }
    async createMedioContacto(nit, id_medio_contacto, descripcion) { 
        let response
        try {   
            const insert = await db.query('INSERT INTO medio_contacto (nit, id_medio_contacto, descripcion) VALUES ($1, $2, $3)', [
                nit,
                id_medio_contacto,
                descripcion
            ]);
            response = insert;
        } catch (err) {
            response = err;
        }
            return response   
    }
}
module.exports = MedioContacto;