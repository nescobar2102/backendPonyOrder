const db = require('../config/db')

class Tipoempresa 
{
    async getTipoempresa() {
        let results = await db.query(`SELECT * FROM tipo_empresa  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getTipoempresaByDesc(descripcion , nit) {
        let results = await db.query('SELECT * FROM tipo_empresa WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createTipoempresa(id_tipo_empresa, descripcion, id_destino, id_proyecto, nit) { 
        let results = await db.query('SELECT * FROM tipo_empresa WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO tipo_empresa (id_tipo_empresa, descripcion, id_destino, id_proyecto, nit ) VALUES ($1, $2, $3, $4, $5 )', [
                id_tipo_empresa,
                descripcion,
                id_destino, 
                id_proyecto, 
                nit
            ])
            .catch(console.log);
          return;
        }
}
}
module.exports = Tipoempresa;