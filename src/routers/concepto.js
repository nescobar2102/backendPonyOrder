const express = require("express");
const router = express.Router();
const Concepto = require('../controllers/concepto');

router.get('/concepto_all', async (req,res) => { 
    let concepto = await new Concepto().getConcepto(); 
    res.status(200).json(concepto)
});
router.get('/concepto/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let concepto = await new Concepto().getConceptoByDesc(descripcion,nit);
    res.status(200).json(concepto)
});
router.post('/synchronization_concepto', async (req,res) => {
    const {conceptos } = req.body
    for (var i=0;i<conceptos.length;i++){ 
        const {nit, id_concepto, id_auxiliar, descripcion, naturalezacta } =  conceptos[i]
        await new Concepto().createConcepto( nit, id_concepto, id_auxiliar, descripcion, naturalezacta ); 
     };
     
     let concepto_all= await new Concepto().getConcepto();
     res.status(200).json(concepto_all)
  
});
module.exports = router;