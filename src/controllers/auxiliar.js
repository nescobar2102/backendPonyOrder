const db = require('../config/db')

class Auxiliares
{
    async getAuxiliares() {
        let results = await db.query(`SELECT * FROM auxiliar ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getAuxiliaresByNit(nit) {
        let results = await db.query('SELECT * FROM auxiliar WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async deleteAuxiliar() {
        await db.query(`DELETE FROM auxiliar`).catch(console.log);        
  }
    async createAuxiliares (nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta ) {
        let results = await db.query('SELECT * FROM auxiliar WHERE nit = $1 and descripcion = $2', [nit, descripcion]).catch(console.log);
        if (results.rowCount == 0) {  
            return await db
            .query('INSERT INTO auxiliar (nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta) VALUES ($1, $2, $3, $4,$5)', [
                nit, 
                id_auxiliar, 
                descripcion,
                flag_flujo_caja,
                id_tipo_cuenta
            ])
            .catch(console.log);
            }
        }
}
module.exports = Auxiliares;