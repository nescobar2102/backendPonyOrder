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
      let response
        /*let results = await db.query('SELECT * FROM tipo_empresa WHERE  id_tipo_empresa = $1',
                                     [id_tipo_empresa]);
        if (results.rowCount == 0) {     */
            try {
                const result_insert = await db
                    .query('INSERT INTO tipo_empresa (id_tipo_empresa, descripcion, nit ) VALUES ($1, $2, $3 )', [
                        id_tipo_empresa,
                        descripcion, 
                        nit
                    ]);  
                    response = result_insert
            } catch (err) { 
                 response = err;
                }
         
   /* }else{
        response  = `Ya existe el registro para id_tipo_empresa  ${id_tipo_empresa}` 
    }*/
    return response
}
}
module.exports = Tipoempresa;