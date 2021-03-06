const db = require('../config/db')

class Pedido 
{
        async getPedido() {
            let results = await db.query(`SELECT * FROM pedido  ORDER BY nit ASC `).catch(console.log); 
            return results.rows;
        }
        async getPedidoByNit(nit,observacion) {
            let results = await db.query('SELECT * FROM pedido WHERE nit = $1 and observacion =$2', [nit,observacion]).catch(console.log); 
            return results.rows;
        }
     
        async getPedidoById(id_empresa, id_sucursal, id_tipo_doc, numero,nit) {
            let results = await db.query('SELECT * FROM pedido WHERE id_empresa = $1 and id_sucursal = $2 and id_tipo_doc  =$3 and numero   =$4 and nit= $5', [id_empresa, id_sucursal, id_tipo_doc, numero,nit]).catch(console.log); 
            return results.rows;
        }
      async deletePedido() {
        let response
        try {
            await db.query(`DELETE FROM pedido_det`);
            await db.query(`DELETE FROM pedido`);
        } catch (err) {
            response = err
        }
        return response
    }
        async createPedido(nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado) { 
            let response
            try {
                const insert = await db
                .query('INSERT INTO pedido (nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34 )', [
                    nit,
                    id_empresa,
                    id_sucursal,
                    id_tipo_doc,
                    numero,
                    id_tercero,
                    id_sucursal_tercero,
                    id_vendedor,
                    id_suc_vendedor,
                    fecha,
                    vencimiento,
                    fecha_entrega,
                    fecha_trm,
                    id_forma_pago,
                    id_precio_item,
                    id_direccion,
                    id_moneda,
                    trm,
                    subtotal,
                    total_costo,
                    total_iva,
                    total_dcto,
                    total,
                    total_item,
                    orden_compra,
                    estado,
                    flag_autorizado,
                    comentario,
                    observacion,
                    letras,
                    id_direccion_factura,
                    usuario,
                    id_tiempo_entrega,
                    flag_enviado 
                ]);
                response = insert
            } catch (err) {
                response = err
            }
            return response
    }
        async createpedidodet(nit,id_empresa,id_sucursal,id_tipo_doc,numero,consecutivo,id_item,descripcion_item,id_bodega,cantidad,precio,precio_lista,tasa_iva,total_iva,tasa_dcto_fijo,total_dcto_fijo,total_dcto,costo,subtotal,total,total_item,id_unidad,cantidad_kit,cantidad_de_kit,recno,id_precio_item,factor,id_impuesto_iva,total_dcto_adicional,tasa_dcto_adicional,id_kit,precio_kit,tasa_dcto_cliente,total_dcto_cliente) {
            let response
            try {
                const insert = await db.query('INSERT INTO pedido_det (nit,id_empresa,id_sucursal,id_tipo_doc,numero,consecutivo,id_item,descripcion_item,id_bodega,cantidad,precio,precio_lista,tasa_iva,total_iva,tasa_dcto_fijo,total_dcto_fijo,total_dcto,costo,subtotal,total,total_item,id_unidad,cantidad_kit,cantidad_de_kit,recno,id_precio_item,factor,id_impuesto_iva,total_dcto_adicional,tasa_dcto_adicional,id_kit,precio_kit,tasa_dcto_cliente,total_dcto_cliente) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34)', [
                nit,
                id_empresa,
                id_sucursal,
                id_tipo_doc,
                numero,
                consecutivo,
                id_item,
                descripcion_item,
                id_bodega,
                cantidad,
                precio,
                precio_lista,
                tasa_iva,
                total_iva,
                tasa_dcto_fijo,
                total_dcto_fijo,
                total_dcto,
                costo,
                subtotal,
                total,
                total_item,
                id_unidad,
                cantidad_kit,
                cantidad_de_kit,
                recno,
                id_precio_item,
                factor,
                id_impuesto_iva,
                total_dcto_adicional,
                tasa_dcto_adicional,
                id_kit,
                precio_kit,
                tasa_dcto_cliente,
                total_dcto_cliente    
            ]);
            response = insert
        } catch (err) {
            response = err
        }
        return response        
        }
   
}
module.exports = Pedido;