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

    async createEmpresa(nit,razon_social,id_tipo_empresa,pre_actividad_economica,pre_cuenta,pre_medio_contacto,id_moneda,direccion,telefono,dv,fax,id_pais,id_depto,id_ciudad,regimen_tributario,flag_iva,flag_forma_pago_efectivo,correo_electronico,id_empresa ) {
        let results = await db.query('SELECT * FROM empresa WHERE nit = $1', [nit]).catch(console.log);
        if (results.rowCount > 0) {
            console.log("entra al select ")
            return results.rows;
        } else {
          await db
            .query('INSERT INTO empresa (nit,razon_social,id_tipo_empresa,pre_actividad_economica,pre_cuenta,pre_medio_contacto,id_moneda,direccion,telefono,dv,fax,id_pais,id_depto,id_ciudad,regimen_tributario,flag_iva,flag_forma_pago_efectivo,correo_electronico,id_empresa) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9,$10, $11, $12, $13,$14, $15, $16, $17,$18, $19)', [
                nit,
                razon_social,
                id_tipo_empresa,
                pre_actividad_economica,
                pre_cuenta,
                pre_medio_contacto,
                id_moneda,
                direccion,
                telefono,
                dv,
                fax,
                id_pais,
                id_depto,
                id_ciudad,
                regimen_tributario,
                flag_iva,
                flag_forma_pago_efectivo,
                correo_electronico,
                id_empresa
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
 