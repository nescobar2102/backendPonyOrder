const express = require("express");
const router = express.Router();
const Pedido = require('../controllers/pedido');

router.get('/pedido_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Pedidos';
    let status = 200;
    let pedido = await new Pedido().getPedido();
    if (pedido.length > 0) {
        response.data = pedido;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/pedido/:id_empresa/:id_sucursal/:id_tipo_doc/:numero/:nit', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false;
    response.msg = 'Listar un Pedidos por id_empresa, id_sucursal, id_tipo_doc, numero,nit';
    let {
        id_empresa,
        id_sucursal,
        id_tipo_doc,
        nit,
        numero
    } = req ?. params;
    if (id_empresa.trim() == '' || id_empresa == null || id_tipo_doc.trim() == '' || id_tipo_doc == null || nit.trim() == '' || nit == null || id_sucursal.trim() == '' || id_sucursal == null || numero.trim() == '' || numero == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El id_empresa, id_sucursal, id_tipo_doc, numero,nit esta vacio';
        status = 400;
    }
    if (! bandera) {
        let pedido = await new Pedido().getPedidoById(id_empresa, id_sucursal, id_tipo_doc, numero, nit);
        if (pedido.length > 0) {
            response.data = pedido;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});

router.post('/synchronization_pedido', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Pedidos';
    let status = 201;
    const {pedidos} = req.body
    let bandera = false;
    let bandera_hijo = false;
    for (var i = 0; i < pedidos.length; i++) {
        if (! bandera_hijo) {
            const {
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
                flag_enviado,
                pedido_det
            } = pedidos[i];
            if (numero.trim() == '' || id_empresa.trim() == '' || id_sucursal.trim() == '' || id_tipo_doc.trim() == ''  || nit.trim() == '') {
                bandera = true;
                response.success = false;
                response.msg = 'El numero,id_empresa,id_sucursal ó id_tipo_doc,nit esta vacio';
                status = 400;
                break;
            }
            let pedido = await new Pedido().getPedidoById(id_empresa, id_sucursal, id_tipo_doc, numero, nit);
            if (pedido.length > 0) {
                bandera = true;
                response.success = false;
                response.msg = `Pedido con el id_empresa ${id_empresa} , id_sucursal  ${id_sucursal}, el id_tipo_doc ${id_tipo_doc}, numero  ${numero} y nit ${nit} ya existe`;
                status = 200;
                break;
            }
            result1 = await new Pedido().createPedido(nit, id_empresa, id_sucursal, id_tipo_doc, numero, id_tercero, id_sucursal_tercero, id_vendedor, id_suc_vendedor, fecha, vencimiento, fecha_entrega, fecha_trm, id_forma_pago, id_precio_item, id_direccion, id_moneda, trm, subtotal, total_costo, total_iva, total_dcto, total, total_item, orden_compra, estado, flag_autorizado, comentario, observacion, letras, id_direccion_factura, usuario, id_tiempo_entrega, flag_enviado);
         
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar pedido: BD ${result1}`;
                status = 500;
                break;
            } else {
                if (pedido_det ?. length > 0 && result1 ?. rowCount > 0) {
                    for (var j = 0; j < pedido_det.length; j++) {
                        const {
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
                        } = pedido_det[j];
                        result2 = await new Pedido().createpedidodet(nit, id_empresa, id_sucursal, id_tipo_doc, numero, consecutivo, id_item, descripcion_item, id_bodega, cantidad, precio, precio_lista, tasa_iva, total_iva, tasa_dcto_fijo, total_dcto_fijo, total_dcto, costo, subtotal, total, total_item, id_unidad, cantidad_kit, cantidad_de_kit, recno, id_precio_item, factor, id_impuesto_iva, total_dcto_adicional, tasa_dcto_adicional, id_kit, precio_kit, tasa_dcto_cliente, total_dcto_cliente);
                        if (!result2 ?. rowCount || result2 ?. rowCount == 0) {
                            bandera_hijo = true;
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar pedido det: BD ${result2}`;
                            status = 500;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) { // no se levanto la bandera (false)
        let pedido_all = await new Pedido().getPedido();
        response.data = pedido_all;
    } 
    res.status(status).json(response);

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
