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
        async createTiempoentregan(nit,id_tiempo_entrega,hora_inicial,hora_final){ 
            let results = await db.query('SELECT * FROM tiempo_entrega WHERE nit = $1 and id_tiempo_entrega= $2', [nit,id_tiempo_entrega]).catch(console.log);
            if (results.rowCount == 0) {     
                await db
                .query('INSERT INTO tiempo_entrega (nit,id_tiempo_entrega,hora_inicial,hora_final) VALUES ($1,$2,$3,$4)', [
                    nit,
                    id_tiempo_entrega,
                    hora_inicial,
                    hora_final
                ])
                .catch(console.log);
              return;
            }
    }        
}
module.exports = Tiempoentrega; 