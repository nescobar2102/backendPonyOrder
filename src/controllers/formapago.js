const { response } = require('express');
const db = require('../config/db')

class Formapago {
    async getFormapago() {
        let results = await db.query(`SELECT * FROM forma_pago ORDER BY nit ASC`).catch(console.log);
        return results.rows;
    }
    async getFormapagoByNit(nit,descripcion) {
        let results = await db.query('SELECT * FROM forma_pago WHERE nit = $1 and descripcion =$2', [nit,descripcion]).catch(console.log);
        return results.rows;
    }
    async getFormapagoByid(nit,id_forma_pago) {
        let results = await db.query('SELECT * FROM forma_pago WHERE nit = $1 and id_forma_pago =$2', [nit,id_forma_pago]).catch(console.log);
        return results.rows;
    }
    async getFormapagoBydet(nit,id_forma_pago) {
        let results = await db.query('SELECT * FROM forma_pagodet WHERE nit = $1 and id_forma_pago =$2', [nit,id_forma_pago]).catch(console.log);
        return results.rows;
    }
    async deleteformapago() {
        let response
        try {         
            await db.query(`DELETE FROM forma_pago`);       
            await db.query(`DELETE FROM forma_pagodet`);          
        } catch(err){
            response = err
        }
        return response  
  }
    async createFormapago(nit,descripcion,id_precio_item,id_forma_pago) {
    let response
    try {
        const insert = await db.query('INSERT INTO forma_pago (nit,descripcion,id_precio_item,id_forma_pago) VALUES ($1, $2, $3, $4)', [
            nit,
            descripcion,
            id_precio_item,
            id_forma_pago
        ]);
        response = insert
    } catch (err) {
        response = err
    }
       return response
      
    }
    async createFormapagodet(nit, id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo) {
        let response
        try {
            const insert =  await db.query('INSERT INTO forma_pagodet (nit,id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)', [
                nit,
                id_forma_pago,
                cuota,
                dias,
                tasa,
                clase,
                descripcion_detalle,
                flag_activo        
            ]);
            response = insert
        } catch (err) {
            response = err
        }
           return response      
        }
     
}
module.exports = Formapago;

