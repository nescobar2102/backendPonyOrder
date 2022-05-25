const db = require('../config/db')

class Tipodoc 
{
    async getTipodoc() {
        let results = await db.query(`SELECT * FROM tipo_doc  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getTipodocByDesc(descripcion , nit) {
        let results = await db.query('SELECT * FROM tipo_doc WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createTipodoc(nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion ) { 
        let results = await db.query('SELECT * FROM tipo_doc WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO tipo_doc (nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7 )', [
                nit,
                id_empresa,
                id_sucursal,
                id_clase_doc,
                id_tipo_doc,
                consecutivo,
                descripcion,
            ])
            .catch(console.log);
          return;
        }
}
}
module.exports = Tipodoc;