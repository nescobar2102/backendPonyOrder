 const db = require('../config/db')

class Usuario {

    async getUsers() {
        let results = await db.query(`SELECT * FROM usuario ORDER BY nit ASC`).catch(console.log);
        //console.log("-------", results.rows)
        return results.rows;
    }

    async getUserByNit(nit) {
        let results = await db.query('SELECT * FROM usuario WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }

    async createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc) {
        let response
        try {
            const result_insert = await db.query('INSERT INTO usuario (nit, correo_electronico,usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)', [
                nit, 
                correo_electronico,
                usuario,
                nombre,
                flag_activo, 
                clave,
                flag_cambia_fp,
                flag_cambia_lp,
                flag_edita_cliente,
                flag_edita_dcto,
                id_tipo_doc_pe,
                id_tipo_doc_rc,
                id_bodega,
                edita_consecutivo_rc,
                edita_fecha_rc
            ]);
            response = result_insert
       
     } catch (err) { 
        response = err;
       }  
       return response
    }
        async updateUser(nit, correo_electronico, usuario, nombre, flag_activo, clave) {
          let results =  await db.query('UPDATE usuario SET nombre = $1, correo_electronico = $2, usuario = $3, flag_activo = $4, clave = $5 WHERE nit = $6',
             [nombre, correo_electronico, usuario, flag_activo, clave, nit]).catch(console.log);               
                return results;
            }  

        async deleteUserByNit(nit ) {
        let results =  await db.query('DELETE FROM usuario WHERE nit = $1',
            [nit]).catch(console.log);               
                return results;
            }  
        async login( usuario, clave) {
        let results =  await db.query('SELECT * FROM usuario WHERE usuario = $1 and clave = $2',
        [usuario , clave]).catch(console.log);               
                return results;
            }                
}
module.exports = Usuario;
 
