const db = require('../config/db')

class Pais 
    {
        async getPais() {
            let results = await db.query(`SELECT * FROM pais  ORDER BY nit ASC`).catch(console.log); 
            return results.rows;
        }
        async getPaisByNit(nit,nombre) {
            let results = await db.query('SELECT * FROM pais WHERE  nit = $1 and nombre = $2', [nit,nombre]).catch(console.log); 
            return results.rows;
        }
        async createPais(nit,id_pais,ie_pais,nacionalidad,nombre) { 
            let results = await db.query('SELECT * FROM pais WHERE nit = $1 and nombre = $2 ', [nit,nombre]).catch(console.log);
            if (results.rowCount == 0) {     
                return await db
                .query('INSERT INTO pais (nit,id_pais,ie_pais,nacionalidad,nombre) VALUES ($1, $2, $3, $4, $5)', [
                    nit,
                    id_pais,
                    ie_pais,
                    nacionalidad,
                    nombre
                ])
                .catch(console.log);              
            }
    }    
    }
module.exports = Pais;