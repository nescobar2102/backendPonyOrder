const express = require("express");
const router = express.Router();
const Tipoempresa = require('../controllers/tipoempresa');

router.get('/tipoempresa_all', async (req,res) => { 
    let tipoempresa = await new Tipoempresa().getTipoempresa(); 
    res.status(200).json(tipoempresa)
});
router.get('/tipoempresa/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let tipoempresa = await new Tipoempresa().getTipoempresaByDesc(descripcion,nit);
    res.status(200).json(tipoempresa)
});
router.post('/synchronization_tipoempresa', async (req,res) => {
    const {tipo_empresa } = req.body
    for (var i=0;i<tipo_empresa.length;i++){ 
        const { id_tipo_empresa, descripcion, id_destino, id_proyecto, nit} =  tipo_empresa[i]
        await new Tipoempresa().createTipoempresa(id_tipo_empresa, descripcion, id_destino, id_proyecto, nit); 
     };
     
     let tipoempresa_all= await new Tipoempresa().getTipoempresa();
     res.status(200).json(tipoempresa_all)  
});
module.exports = router;