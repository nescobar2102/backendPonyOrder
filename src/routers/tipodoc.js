const express = require("express");
const router = express.Router();
const Tipodoc = require('../controllers/tipodoc');

router.get('/tipodoc_all', async (req,res) => { 
    let tipodoc = await new Tipodoc().getTipodoc(); 
    res.status(200).json(tipodoc)
});
router.get('/tipodoc/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let tipodoc = await new Tipodoc().getTipodocByDesc(descripcion,nit);
    res.status(200).json(tipodoc)
});
router.post('/synchronization_tipodoc', async (req,res) => {
    const {tipodocs } = req.body
    for (var i=0;i<tipodocs.length;i++){ 
        const {nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion } =  tipodocs[i]
        await new Tipodoc().createTipodoc(nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion); 
     };
     
     let tipodoc_all= await new Tipodoc().getTipodoc();
     res.status(200).json(tipodoc_all)  
});
module.exports = router;