const express = require("express");
const router = express.Router();
const Pais = require('../controllers/pais');

router.get('/pais_all', async (req,res) => { 
    let pais = await new Pais().getPais(); 
    res.status(200).json(pais)
});
router.get('/pais/:nit', async (req,res) => {
    let {nit} = req.params;    
    let pais = await new Pais().getPaisByNit(nit);
    res.status(200).json(pais)
});
router.post('/synchronization_pais', async (req,res) => {
    const {paises } = req.body
    for (var i=0;i<paises.length;i++){ 
        const {nit,id_pais,ie_pais,nacionalidad,nombre} =  paises[i]
        await new Pais().createPais(nit,id_pais,ie_pais,nacionalidad,nombre); 
     };
     
     let pais_all= await new Pais().getPais();
     res.status(200).json(pais_all)
  
});
module.exports = router;