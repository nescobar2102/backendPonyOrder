const express = require("express");
const router = express.Router();
const Impuesto = require('../controllers/impuesto');

router.get('/impuesto_all', async (req,res) => { 
    let impuesto = await new Impuesto().getImpuesto(); 
    res.status(200).json(impuesto)
});
router.get('/impuesto/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let impuesto = await new Impuesto().getImpuestoDesc(descripcion,nit);
    res.status(200).json(impuesto)
});
router.post('/synchronization_impuesto', async (req,res) => {
    const {impuestos} = req.body
    for (var i=0;i<impuestos.length;i++){ 
        const {nit,id_impuesto,descripcion,tasa,tipo_impuesto,por} =  impuestos[i]
        await new Impuesto().createImpuesto(nit,id_impuesto,descripcion,tasa,tipo_impuesto,por); 
     };
     
     let impuesto_all= await new Impuesto().getImpuesto();
     res.status(200).json(impuesto_all)
  
});
module.exports = router;