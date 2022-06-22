const res = require('express/lib/response');
const db = require('../config/db')

class Tiempoentrega 
{
        async getTiempoentrega() {
            let results = await db.query(`SELECT * FROM tiempo_entrega ORDER BY nit ASC `).catch(console.log); 
            return results.rows;
        }
        async getTiempoentregaByNit(nit) {
            let results = await db.query('SELECT * FROM tiempo_entrega WHERE nit = $1', [nit]).catch(console.log); 
            return results.rows;
        }
        async getTiempoentregaNitId(nit,id_tiempo_entrega) {
            let response 
            try{
              const  results = await db.query('SELECT * FROM tiempo_entrega WHERE nit = $1 and id_tiempo_entrega = $2', [nit,id_tiempo_entrega]);
              response = results.rows
            }catch (err){
                response = err
            }
            return response
        }
        async createTiempoentregan(nit,id_tiempo_entrega,hora_inicial,hora_final){ 
            let response
            try {
                const insert = await db
                .query('INSERT INTO tiempo_entrega (nit,id_tiempo_entrega,hora_inicial,hora_final) VALUES ($1,$2,$3,$4)', [
                    nit,
                    id_tiempo_entrega,
                    hora_inicial,
                    hora_final
                ]);
                response = insert;
            }  catch (err) {
                response = err
            }
            return response
    }        
}
module.exports = Tiempoentrega; 