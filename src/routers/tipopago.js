const express = require("express");
const router = express.Router();
const Tipopago = require('../controllers/tipopago');

router.get('/tipopago_all', async (req,res) => { 
    let tipopago = await new Tipopago().getTipopago(); 
    res.status(200).json(tipopago)
});
router.get('/tipopago/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let tipopago = await new Tipopago().getTipopagoByDesc(descripcion,nit);
    res.status(200).json(tipopago)
});
router.post('/synchronization_tipopago', async (req,res) => {
    const {tipopagos} = req.body
    for (var i=0;i<tipopagos.length;i++){        
        const {id_tipo_pago, descripcion, nit} =  tipopagos[i]
            await new Tipopago().createTipopago(id_tipo_pago, descripcion, nit); 
           
            for (var j=0;j<tipopagosdet.length;j++){ 	            
                const {nit,id_tipo_pago,id_auxiliar,cuota,clase} =  tipopagosdet[j]
                await new Tipopago().createTipopagodet(nit,id_tipo_pago,id_auxiliar,cuota,clase); 
           };
     };     
    let tipopago_all= await new Tipopago().getTipopago();
     res.status(200).json(tipopago_all)
  
});
module.exports = router;