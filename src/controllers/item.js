const db = require('../config/db')

class Item 
{
    async getItem() {
        let results = await db.query(`SELECT * FROM item  ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getItemAll() { 
        let results = await db.query(` 
        select  item.id_item,
               item.descripcion,
               item.referencia,
               item.id_impuesto,
               item.tipo_impuesto,
               item.dcto_producto,
               item.dcto_maximo,
               item.flag_facturable,
               item.flag_serial,
               item.flag_kit,
               item.id_clasificacion,
               item.id_padre_clasificacion,
               item.id_unidad_compra,
               item.exento_impuesto,
               item.flag_existencia,
               item.flag_dcto_volumen,
               item.nit,
               item.saldo_inventario,
               item.item_dctos,      
               item_dcto.consecutivo,
               item_dcto.cantidad_inicial,
               item_dcto.cantidad_final,
               item_dcto.tasa_dcto,
               item_dcto.ultima_actualizacion
               from item 
        left join   item_dcto on item.id_item=item_dcto.id_item `).catch(console.log); 
        return results.rows;
    }
    async getItemByNit(descripcion,nit) {
        let results = await db.query('SELECT * FROM item WHERE nit = $1 and descripcion = $2', [nit,descripcion]).catch(console.log); 
        return results.rows;
    }
    async deleteItem() {
          await db.query(`DELETE FROM item`).catch(console.log); 
          await db.query(`DELETE FROM item_dcto`).catch(console.log);        
    }
    async createItem(nit,id_item,descripcion,referencia,id_impuesto,tipo_impuesto,dcto_producto,dcto_maximo,flag_serial,flag_kit,id_clasificacion,id_padre_clasificacion,id_unidad_compra,exento_impuesto,flag_existencia,flag_dcto_volumen,saldo_inventario,item_dctos) { 
        let results = await db.query('SELECT * FROM item WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            return await db
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
          
        }
}
    async createItemdcto(nit,id_item,consecutivo,cantidad_inicial,cantidad_final,tasa_dcto) {
         return await db.query('INSERT INTO item_dcto (nit,id_item,consecutivo,cantidad_inicial,cantidad_final,tasa_dcto) VALUES ($1, $2, $3, $4,$5,$6)', [
            nit,
            id_item,
            consecutivo,
            cantidad_inicial,
            cantidad_final,
            tasa_dcto      
        ]).catch(console.log);              
}
}
module.exports = Item;