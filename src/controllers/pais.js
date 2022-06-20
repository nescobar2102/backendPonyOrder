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
        async getPaisNitId(nit,id_pais) {
            let results = await db.query('SELECT * FROM pais WHERE  nit = $1 and id_pais = $2', [nit,id_pais]).catch(console.log); 
            return results.rows;
        }
        async createPais(nit,id_pais,ie_pais,nacionalidad,nombre) { 
            let response
            try {
                const insert = await db.query('INSERT INTO pais (nit,id_pais,ie_pais,nacionalidad,nombre) VALUES ($1, $2, $3, $4, $5)', [
                    nit,
                    id_pais,
                    ie_pais,
                    nacionalidad,
                    nombre
                ]);
                response = insert;
                } catch (err) {
                    response = err;
                }
                return response;      
        }           
}
module.exports = Pais;