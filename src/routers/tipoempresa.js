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
    const {tipoempresas } = req.body
    for (var i=0;i<tipoempresas.length;i++){ 
        const { id_tipo_empresa, descripcion, nit} =  tipoempresas[i]
        await new Tipoempresa().createTipoempresa(id_tipo_empresa, descripcion, nit); 
     };
     
     let tipoempresa_all= await new Tipoempresa().getTipoempresa();
     res.status(200).json(tipoempresa_all)  
});
module.exports = router;