const express = require("express");
const router = express.Router();
const Zona = require('../controllers/zona');

router.get('/zona_all', async (req,res) => { 
    let zona = await new Zona().getZona(); 
    res.status(200).json(zona)
});
router.get('/zona/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let zona = await new Zona().getZonaByDesc(descripcion,nit);
    res.status(200).json(zona)
});
router.post('/synchronization_zona', async (req,res) => {
    const {zona } = req.body
    for (var i=0;i<zona.length;i++){ 
        const {id_zona , descripcion, id_padre, nivel, es_padre, id_tercero , id_sucursal_tercero, nit } =  zona[i]
        await new Zona().createZona(id_zona , descripcion, id_padre, nivel, es_padre, id_tercero , id_sucursal_tercero, nit ); 
     };
     
     let zona_all= await new Zona().getZona();
     res.status(200).json(zona_all)
  
});
module.exports = router;