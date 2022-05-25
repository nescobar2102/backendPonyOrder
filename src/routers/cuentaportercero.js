const express = require("express");
const router = express.Router();
const Cuentaportercero = require('../controllers/cuentaportercero');

router.get('/cuentaportercero_all', async (req,res) => { 
    let cuentaportercero = await new Cuentaportercero().getCuentaportercero(); 
    res.status(200).json(cuentaportercero)
});
router.get('/cuentaportercero/:nit', async (req,res) => {
    let {nit} = req.params;    
    let cuentaportercero = await new Cuentaportercero().getCuentaporterceroByNit(nit);
    res.status(200).json(cuentaportercero)
});
router.post('/synchronization_cuentaportercero', async (req,res) => {
    const {cuentas_por_terceros} = req.body
    for (var i=0;i<cuentas_por_terceros.length;i++){ 
        const {nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto } =  cuentas_por_terceros[i]
        await new Cuentaportercero().createCuentaportercero(nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto); 
     };
     
     let cuentaportercero_all= await new Cuentaportercero().getCuentaportercero();
     res.status(200).json(cuentaportercero_all)
  
});
module.exports = router;