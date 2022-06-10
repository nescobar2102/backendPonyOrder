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
    async createTipodoc(nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion ) { 
        let results = await db.query('SELECT * FROM tipo_doc WHERE nit = $1 and id_tipo_doc = $2', [nit,id_tipo_doc]).catch(console.log);
        if (results.rowCount == 0) {     
            return  await db
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
        }else{
        return await db.query('UPDATE tipo_doc SET id_empresa = $1 ,id_sucursal = $2 ,id_clase_doc = $3, consecutivo = $4 ,descripcion = $5 WHERE nit = $6 and id_tipo_doc = $7', [id_empresa,id_sucursal,id_clase_doc,consecutivo,descripcion,nit,id_tipo_doc]).catch(console.log);   
        }
}
}
module.exports = Tipodoc;