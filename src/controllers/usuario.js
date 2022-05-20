 const db = require('../config/db')

class Usuario {

    async getUsers() {
        let results = await db.query(`SELECT * FROM usuario ORDER BY nit ASC`).catch(console.log);
        console.log("-------", results.rows)
        return results.rows;
    }

    async getUserByNit(nit) {
        let results = await db.query('SELECT * FROM usuario WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }

    async createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave) {
        let results = await db.query('SELECT * FROM usuario WHERE nit = $1', [nit]).catch(console.log);
        if (results.rowCount > 0) { 
            return results.rows;
        } else {
          await db
            .query('INSERT INTO usuario (nit, correo_electronico, usuario, nombre, flag_activo, clave) VALUES ($1, $2, $3, $4,$5, $6)', [
                nit,
                correo_electronico,
                usuario,
                nombre,
                flag_activo,
                clave
            ])
            .catch(console.log);
          return;
       
            }
        }    

        async updateUser(nit, correo_electronico, usuario, nombre, flag_activo, clave) {
          let results =  await db.query('UPDATE usuario SET nombre = $1, correo_electronico = $2, usuario = $3, flag_activo = $4, clave = $5 WHERE nit = $6',
             [nombre, correo_electronico, usuario, flag_activo, clave, nit]).catch(console.log);               
                return results;
            }  

        async deleteUserByNit(nit, correo_electronico, usuario, nombre, flag_activo, clave) {
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
 
