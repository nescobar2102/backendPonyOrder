const db = require('../config/db')

class Tipodoc 
{
    async getTipodoc() {
        let results = await db.query(`SELECT * FROM tipo_doc  ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }
    async getTipodocByDesc(nit,descripcion) {
        let results = await db.query('SELECT * FROM tipo_doc WHERE  nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log); 
        return results.rows;
    }
    async getTipodocNitId(nit,id_tipo_doc) {
        let results = await db.query('SELECT * FROM tipo_doc WHERE  nit = $1 and id_tipo_doc = $2', [nit,id_tipo_doc]).catch(console.log); 
        return results.rows;
    }
    async createTipodoc(nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion ) { 
        let response
        try {
                const insert = await db.query('INSERT INTO tipo_doc (nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7 )', [
                nit,
                id_empresa,
                id_sucursal,
                id_clase_doc,
                id_tipo_doc,
                consecutivo,
                descripcion,
            ]);
            response = insert;
        } catch (err) { 
            response = err;
           }  
           return response
    }
}
module.exports = Tipodoc;