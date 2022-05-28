const express = require("express");
const router = express.Router();
const Carteraproveedores = require('../controllers/carteraproveedores');

router.get('/carteraproveedores_all', async (req,res) => { 
    let carteraproveedores = await new Carteraproveedores().getCarteraproveedores(); 
    res.status(200).json(carteraproveedores)
});
router.get('/getCarteraproveedores/:id_empresa/:id_tercero', async (req,res) => {
    let {id_empresa,id_tercero} = req.params;    
    let carteraproveedores = await new Carteraproveedores().getCarteraproveedoresByTer(id_empresa,id_tercero);
    res.status(200).json(carteraproveedores)
});
router.post('/synchronization_carteraproveedores', async (req,res) => {
    const {cartera_proveedores} = req.body
    for (var i=0;i<cartera_proveedores.length;i++){        
        const {id_empresa,id_sucursal,id_tipo_doc,numero,fecha,total,vencimiento,letras,id_moneda,id_tercero,id_sucursal_tercero,id_recaudador,fecha_trm,trm,observaciones,usuario,flag_enviado,cartera_proveedores_det} =  cartera_proveedores[i];
            await new Carteraproveedores().createCarteraproveedores(id_empresa,id_sucursal,id_tipo_doc,numero,fecha,total,vencimiento,letras,id_moneda,id_tercero,id_sucursal_tercero,id_recaudador,fecha_trm,trm,observaciones,usuario,flag_enviado,cartera_proveedores_det); 
           
            for (var j=0;j<cartera_proveedores_det.length;j++){ 	            
                const {consecutivo,cuota,id_tercero,id_sucursal_tercero,id_empresa_cruce,id_sucursal_cruce,id_tipo_doc_cruce,numero_cruce,fecha,vencimiento,debito,credito,descripcion,id_vendedor,id_forma_pago,documento_forma_pago,distribucion,trm,id_recaudador,id_suc_recaudador,fecha_trm,total_factura,id_concepto,id_moneda,id_destino,id_proyecto,cuota_cruce,id_banco} =  cartera_proveedores_det[j];
                await new Carteraproveedores().createCarteraproveedoresdet(consecutivo,cuota,id_tercero,id_sucursal_tercero,id_empresa_cruce,id_sucursal_cruce,id_tipo_doc_cruce,numero_cruce,fecha,vencimiento,debito,credito,descripcion,id_vendedor,id_forma_pago,documento_forma_pago,distribucion,trm,id_recaudador,id_suc_recaudador,fecha_trm,total_factura,id_concepto,id_moneda,id_destino,id_proyecto,cuota_cruce,id_banco); 
           };
     };     
    let carteraproveedores_all= await new Carteraproveedores().getCarteraproveedores();
     res.status(200).json(carteraproveedores_all)
  
});
module.exports = router;