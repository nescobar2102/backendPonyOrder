const db = require('../config/db')

class Pais 
    {
        async getPais() {
            let results = await db.query(`SELECT * FROM pais  ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getPaisByNit(nit) {
            let results = await db.query('SELECT * FROM pais WHERE  nit = $1', [nit]).catch(console.log); 
            return results.rows;
        }
        async createPais(nit,id_pais,ie_pais,nacionalidad,nombre) { 
            let results = await db.query('SELECT * FROM pais WHERE nit = $1', [nit]).catch(console.log);
            if (results.rowCount == 0) {     
                await db
                .query('INSERT INTO pais (nit,id_pais,ie_pais,nacionalidad,nombre) VALUES ($1, $2, $3, $4, $5)', [
                    nit,
                    id_pais,
                    ie_pais,
                    nacionalidad,
                    nombre
                ])
                .catch(console.log);
              return;
            }
    }    
    }
module.exports = Pais;