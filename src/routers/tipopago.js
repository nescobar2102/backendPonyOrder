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
    const {tipo_pago } = req.body
    for (var i=0;i<tipo_pago.length;i++){ 
        const { id_tipo_pago, descripcion, aplica_en, flag_valor, nit} =  tipo_pago[i]
        await new Tipopago().createTipopago(id_tipo_pago, descripcion, aplica_en, flag_valor, nit); 
     };
     
     let tipopago_all= await new Tipopago().getTipopago();
     res.status(200).json(tipopago_all)  
});
module.exports = router;