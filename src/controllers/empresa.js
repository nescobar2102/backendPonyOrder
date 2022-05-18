const db = require('../config/db')

class Empresa {

    async getEmpresa() {
        let results = await db.query(`SELECT * FROM empresa ORDER BY nit ASC`).catch(console.log); 
        return results.rows;
    }

    async getEmpresaNit(nit) {
        let results = await db.query('SELECT * FROM empresa WHERE nit = $1', [nit]).catch(console.log); 
        return results.rows;
    }

    async createEmpresa( nit,dv,razon_social,correo_electronico ) {
        let results = await db.query('SELECT * FROM empresa WHERE nit = $1', [nit]).catch(console.log);
        if (results.rowCount > 0) {
            console.log("entra al select ")
            return results.rows;
        } else {
          await db
            .query('INSERT INTO empresa ( nit, dv, razon_social, correo_electronico) VALUES ($1, $2, $3, $4)', [
                nit, dv, razon_social, correo_electronico
            ])
            .catch(console.log);
          return;
       
            }
        }    

        async updateEmpresa(nit,razon_social, correo_electronico ) {
          let results =  await db.query('UPDATE empresa SET correo_electronico = $1, razon_social = $2 WHERE nit = $3',
             [ correo_electronico, razon_social, nit]).catch(console.log);               
                return results;
            }  
            
        async updateEmpresaStatus(nit,estado ) {
            let results =  await db.query('UPDATE empresa SET estado = $1 WHERE nit = $2',
               [ estado, nit]).catch(console.log);               
                  return results;
              }  
   
 
                 
}

module.exports = Empresa;
 