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
           
            for (var j=0;j<pedido_det.length;j++){ 	            
                const {nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado,pedido_det} =  pedido_det[j];
                await new Pedido().createpedidodet(nit,id_empresa,id_sucursal,id_tipo_doc,numero,id_tercero,id_sucursal_tercero,id_vendedor,id_suc_vendedor,fecha,vencimiento,fecha_entrega,fecha_trm,id_forma_pago,id_precio_item,id_direccion,id_moneda,trm,subtotal,total_costo,total_iva,total_dcto,total,total_item,orden_compra,estado,flag_autorizado,comentario,observacion,letras,id_direccion_factura,usuario,id_tiempo_entrega,flag_enviado,pedido_det); 
           };
     };     
    let pedido_all= await new Pedido().getPedido();
     res.status(200).json(pedido_all)
  
});
module.exports = router;