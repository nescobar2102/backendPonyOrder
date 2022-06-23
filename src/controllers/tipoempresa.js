const db = require('../config/db')

class Tipoempresa 
{
    async getTipoempresa() {
        let results = await db.query(`SELECT * FROM tipo_empresa  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getTipoempresaByNit(nit) {
        let results = await db.query('SELECT * FROM tipo_empresa WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }
    async getTipoempresaNitId(nit,id_tipo_empresa) {
        let results = await db.query('SELECT * FROM tipo_empresa WHERE nit = $1 and id_tipo_empresa = $2', [nit,id_tipo_empresa]).catch(console.log); 
        return results.rows;
    }
    async createTipoempresa(nit,id_tipo_empresa, descripcion) {
      let response        
            try {
                const insert = await db.query('INSERT INTO tipo_empresa (nit,id_tipo_empresa, descripcion) VALUES ($1, $2, $3 )', [
                        nit,
                        id_tipo_empresa,
                        descripcion
                    ]);  
                    response = insert;
            } catch (err) { 
                 response = err;
            }   
            return response
    }
}
module.exports = Tipoempresa;