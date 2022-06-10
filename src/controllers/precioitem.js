const db = require('../config/db')

class Precioitem 
{
    async getPrecioitem() {
        let results = await db.query(`SELECT * FROM precio_item ORDER BY nit ASC `).catch(console.log); 
        return results.rows;
    }
    async getPrecioitemByNit(descripcion,nit) {
        let results = await db.query('SELECT * FROM precio_item WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log); 
        return results.rows;
    }
    async deletePrecioitem() {
        await db.query(`DELETE FROM precio_item`).catch(console.log); 
        await db.query(`DELETE FROM precio_item_det`).catch(console.log);        
  }
    async createPrecioitem(nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det) { 
        let results = await db.query('SELECT * FROM precio_item WHERE descripcion = $1 and nit = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            return  await db
            .query('INSERT INTO precio_item (nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [
                nit,
                id_precio_item,
                descripcion,
                vigencia_desde,
                vigencia_hasta,
                id_margen_item,
                id_moneda,
                flag_iva_incluido,
                flag_lista_base,
                flag_mobile,
                precios_det
            ])
            .catch(console.log);          
        }
}
    async createPrecioitemdet(nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra) {
        let results = await db.query('SELECT * FROM precio_item_det WHERE nit = $1 and id_precio_item =$2', [nit,id_precio_item]).catch(console.log);
        if (results.rowCount == 0) {
            return  await db.query('INSERT INTO precio_item_det (nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [
                nit,
                id_precio_item,
                id_item,
                precio,
                descuento_maximo,
                id_talla,
                id_moneda,
                id_unidad_compra  
        ]).catch(console.log);      
    }
}
}
module.exports = Precioitem;