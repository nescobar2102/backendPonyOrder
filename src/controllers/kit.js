const db = require('../config/db')

class Kit 
{
    async getKit() {
        let results = await db.query(`SELECT * FROM kit  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getKitByNit(descripcion,nit) {
        let results = await db.query('SELECT * FROM kit WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createKit(nit,id_kit,descripcion,precio_kit,precio_kit_iva,flag_vigencia,fecha_inicial,fecha_final,ultima_actualizacion,kits_det) { 
        let results = await db.query('SELECT * FROM kit WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO kit (nit,id_kit,descripcion,precio_kit,precio_kit_iva,flag_vigencia,fecha_inicial,fecha_final,ultima_actualizacion,kits_det) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)', [
                nit,
                id_kit,
                descripcion,
                precio_kit,
                precio_kit_iva,
                flag_vigencia,
                fecha_inicial,
                fecha_final,
                ultima_actualizacion,
                kits_det
            ])
            .catch(console.log);
          return;
        }
}
    async createKitdet(nit,id_kit,id_item,id_bodega,cantidad,tasa_dcto,precio,valor_total,tasa_iva,valor_iva,total,ultima_actualizacion) {
        //let results = await db.query('SELECT * FROM kit WHERE nit = $1', [nit]).catch(console.log);
        //if (results.rowCount == 0) {
        await db.query('INSERT INTO kit (nit,id_kit,id_item,id_bodega,cantidad,tasa_dcto,precio,valor_total,tasa_iva,valor_iva,total,ultima_actualizacion) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [
            nit,
            id_kit,
            id_item,
            id_bodega,
            cantidad,
            tasa_dcto,
            precio,
            valor_total,
            tasa_iva,
            valor_iva,
            total,
            ultima_actualizacion     
        ]).catch(console.log);
        return;
    //}
}
}
module.exports = Kit;