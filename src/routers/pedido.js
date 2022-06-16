const express = require("express");
const router = express.Router();
const Pedido = require('../controllers/pedido');

router.get('/pedido_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los Pedido';
    let status = 200;
    let pedido = await new Pedido().getPedido(); 
    if (pedido.length > 0) {
        response.data = pedido;
    } else {
     // status= 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/pedido/:nit/:observacion', async (req,res) => {
    const response = newResponseJson();
    let status = 200;
    response.msg = 'Listar un Pedido por Nit';
    let {nit,observacion} = req.params;        
    let pedido = await new Pedido().getPedidoByNit(nit,observacion);
    if (pedido.length > 0) {
        response.data = pedido;
    }  else {
     // status= 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_pedido', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Pedido';
    let status = 201;
    const {pedidos} = req.body
    let bandera = false;
    let bandera_hijo = false;
    await new Pedido().deletePedido(); 
    for (var i=0;i<pedidos.length;i++){        
        if (!bandera_hijo) {   
        const {nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado,pedido_det} =  pedidos[i];
        result1 =  await new Pedido().createPedido(nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado,pedido_det); 
        console.log('primer insert', result1?.rowCount);
           if (!result1?.rowCount || result1?.rowCount == 0) { 
            console.log('entra al falase'); 
            bandera = true;     
            break;
        } else {        
        if (pedido_det?.length>0 && result1?.rowCount > 0){ 
            console.log('pasa por el dto insert', result1?.rowCount);
            for (var j=0;j<pedido_det.length;j++){ 	            
                const {nit,id_empresa,id_sucursal,id_tipo_doc,numero,consecutivo,id_item,descripcion_item,id_bodega,cantidad,precio,precio_lista,tasa_iva,total_iva,tasa_dcto_fijo,total_dcto_fijo,total_dcto,costo,subtotal,total,total_item,id_unidad,cantidad_kit,cantidad_de_kit,recno,id_precio_item,factor,id_impuesto_iva,total_dcto_adicional,tasa_dcto_adicional,id_kit,precio_kit,tasa_dcto_cliente,total_dcto_cliente} =  pedido_det[j];
                result2 = await new Pedido().createpedidodet(nit,id_empresa,id_sucursal,id_tipo_doc,numero,consecutivo,id_item,descripcion_item,id_bodega,cantidad,precio,precio_lista,tasa_iva,total_iva,tasa_dcto_fijo,total_dcto_fijo,total_dcto,costo,subtotal,total,total_item,id_unidad,cantidad_kit,cantidad_de_kit,recno,id_precio_item,factor,id_impuesto_iva,total_dcto_adicional,tasa_dcto_adicional,id_kit,precio_kit,tasa_dcto_cliente,total_dcto_cliente); 
                if (!result2?.rowCount || result2?.rowCount == 0) {                                         bandera_hijo = true;    
                    break;
                }
            }
        }
    }
 }
}  
if (!bandera && !bandera_hijo) { //no se levanto la bandera (false)
    let pedido_all = await new Pedido().getPedido();
    response.data = pedido_all;
} else { 
    await new Pedido().deletePedido();
    response.success = false;
 // status = 400;
    response.msg = 'Error en la Sincronización de Pedido';
}
res.status(status).json(response);

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
    }    
module.exports = router;