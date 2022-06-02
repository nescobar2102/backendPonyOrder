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
    async createPrecioitem(nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det) { 
        let results = await db.query('SELECT * FROM precio_item WHERE nit = $1 and descripcion = $2', [descripcion,nit]).catch(console.log);
        if (results.rowCount == 0) {     
            await db
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
          return;
        }
}
    async createPrecioitemdet(nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra) {
        let results = await db.query('SELECT * FROM precio_item WHERE nit = $1 and id_precio_item =$2', [nit,id_precio_item]).catch(console.log);
        if (results.rowCount == 0) {
        await db.query('INSERT INTO precio_item (nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra) VALUES ($1,$2,$3,$4,$5,$6,$7)', [
            nit,
            id_precio_item,
            id_item,precio,
            descuento_maximo,
            id_talla,
            id_moneda,
            id_unidad_compra      
        ]).catch(console.log);
        return;
    }
}
}
module.exports = Precioitem;