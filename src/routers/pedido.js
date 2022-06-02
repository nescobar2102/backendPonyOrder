const express = require("express");
const router = express.Router();
const Pedido = require('../controllers/pedido');

router.get('/pedido_all', async (req,res) => { 
    let pedido = await new Pedido().getPedido(); 
    res.status(200).json(pedido)
});
router.get('/pedido/:nit', async (req,res) => {
    let {nit} = req.params;    
    let pedido = await new Pedido().getPedidoByNit(nit);
    res.status(200).json(pedido)
});
router.post('/synchronization_pedido', async (req,res) => {
    const {pedidos} = req.body
    for (var i=0;i<pedidos.length;i++){        
        const {nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado,pedido_det} =  pedidos[i];
        await new Pedido().createPedido(nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado,pedido_det); 
        if (pedido_det?.length>0){ 
            for (var j=0;j<pedido_det.length;j++){ 	            
                const {nit,id_empresa,id_sucursal,id_tipo_doc,numero,consecutivo,id_item,descripcion_item,id_bodega,cantidad,precio,precio_lista,tasa_iva,total_iva,tasa_dcto_fijo,total_dcto_fijo,total_dcto,costo,subtotal,total,total_item,id_unidad,cantidad_kit,cantidad_de_kit,recno,id_precio_item,factor,id_impuesto_iva,total_dcto_adicional,tasa_dcto_adicional,id_kit,precio_kit,tasa_dcto_cliente,total_dcto_cliente} =  pedido_det[j];
                await new Pedido().createpedidodet(nit,id_empresa,id_sucursal,id_tipo_doc,numero,consecutivo,id_item,descripcion_item,id_bodega,cantidad,precio,precio_lista,tasa_iva,total_iva,tasa_dcto_fijo,total_dcto_fijo,total_dcto,costo,subtotal,total,total_item,id_unidad,cantidad_kit,cantidad_de_kit,recno,id_precio_item,factor,id_impuesto_iva,total_dcto_adicional,tasa_dcto_adicional,id_kit,precio_kit,tasa_dcto_cliente,total_dcto_cliente); 
           };
        }
     };     
    let pedido_all= await new Pedido().getPedido();
     res.status(200).json(pedido_all)
  
});
module.exports = router;