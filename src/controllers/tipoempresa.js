const db = require('../config/db')

class Tipoempresa 
{
    async getTipoempresa() {
        let results = await db.query(`SELECT * FROM tipo_empresa  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getTipoempresaByDesc(nit) {
        let results = await db.query('SELECT * FROM tipo_empresa WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async createTipoempresa(id_tipo_empresa, descripcion, nit) { 
        let results = await db.query('SELECT * FROM tipo_empresa WHERE nit = $1 and id_tipo_empresa = $2',
                                     [nit,id_tipo_empresa]).catch(console.log);
        if (results.rowCount == 0) {     
            return await db
            .query('INSERT INTO tipo_empresa (id_tipo_empresa, descripcion, nit ) VALUES ($1, $2, $3 )', [
                id_tipo_empresa,
                descripcion, 
                nit
            ])
            .catch(console.log);          
        }
}
}
module.exports = Tipoempresa;