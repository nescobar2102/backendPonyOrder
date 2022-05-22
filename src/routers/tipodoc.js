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
    const {tipo_doc } = req.body
    for (var i=0;i<tipo_doc.length;i++){ 
        const {id_empresa, id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion, prefijo, id_ciudad, id_pais, id_depto, flag_notificacion, flag_maneja_separado, resolucion_dian, nit } =  tipo_doc[i]
        await new Tipodoc().createTipodoc(id_empresa, id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion, prefijo, id_ciudad, id_pais, id_depto, flag_notificacion, flag_maneja_separado, resolucion_dian, nit); 
     };
     
     let tipodoc_all= await new Tipodoc().getTipodoc();
     res.status(200).json(tipodoc_all)  
});
module.exports = router;