const db = require('../config/db')

class Item 
{
    async getItem() {
        let results = await db.query(`SELECT * FROM item  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getItemBy(descripcion,nit) {
        let results = await db.query('SELECT * FROM item WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async createItem(nit,id_item,descripcion,referencia,id_impuesto,tipo_impuesto,dcto_producto,dcto_maximo,flag_serial,flag_kit,id_clasificacion,id_padre_clasificacion,id_unidad_compra,exento_impuesto,flag_existencia,flag_dcto_volumen,saldo_inventario,item_dctos) { 
        let results = await db.query('SELECT * FROM item WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
            .query('INSERT INTO item (nit,id_item,descripcion,referencia,id_impuesto,tipo_impuesto,dcto_producto,dcto_maximo,flag_serial,flag_kit,id_clasificacion,id_padre_clasificacion,id_unidad_compra,exento_impuesto,flag_existencia,flag_dcto_volumen,saldo_inventario,item_dctos) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9,$10, $11, $12,$13, $14, $15,$16, $17, $18)', [
                nit,
                id_item,
                descripcion,
                referencia,
                id_impuesto,
                tipo_impuesto,
                dcto_producto,
                dcto_maximo,
                flag_serial,
                flag_kit,
                id_clasificacion,
                id_padre_clasificacion,
                id_unidad_compra,
                exento_impuesto,
                flag_existencia,
                flag_dcto_volumen,
                saldo_inventario,
                item_dctos
            ])
            .catch(console.log);
          return;
        }
}
    async createItemdcto(consecutivo,cantidad_inicial,cantidad_final,tasa_dcto) {
        let results = await db.query('SELECT * FROM item_dcto WHERE cantidad_final = $1', [cantidad_final]).catch(console.log);
        if (results.rowCount == 0) {
        await db.query('INSERT INTO item_dcto (consecutivo,cantidad_inicial,cantidad_final,tasa_dcto) VALUES ($1, $2, $3, $4)', [
            consecutivo,
            cantidad_inicial,
            cantidad_final,
            tasa_dcto      
        ]).catch(console.log);
        return;
    }
}
}
module.exports = Item;