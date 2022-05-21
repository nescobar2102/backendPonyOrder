const db = require('../config/db')

class MedioContacto 
{
    async getMedioContacto() {
        let results = await db.query(`SELECT * FROM medio_contacto  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getMedioContactoByDesc(descripcion , nit) {
        let results = await db.query('SELECT * FROM medio_contacto WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createMedioContacto(id_medio_contacto, descripcion, nit) { 
        let results = await db.query('SELECT * FROM medio_contacto WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO medio_contacto (id_medio_contacto, descripcion, nit) VALUES ($1, $2, $3)', [
                id_medio_contacto,
                descripcion,
                nit
            ])
            .catch(console.log);
          return;
        }
}

}
module.exports = MedioContacto;