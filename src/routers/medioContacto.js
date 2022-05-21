const express = require("express");
const router = express.Router();
const MedioContacto = require('../controllers/medioContacto');

router.get('/medioContacto_all', async (req,res) => { 
    let medioContacto = await new MedioContacto().getMedioContacto(); 
    res.status(200).json(medioContacto)
});
router.get('/medioContacto/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let medioContacto = await new MedioContacto().getMedioContactoByDesc(descripcion,nit);
    res.status(200).json(medioContacto)
});
router.post('/synchronization_medioContacto', async (req,res) => {
    const {medio_contacto } = req.body
    for (var i=0;i<medio_contacto.length;i++){ 
        const {id_medio_contacto, descripcion, nit } =  medio_contacto[i]
        await new MedioContacto().createMedioContacto(id_medio_contacto, descripcion, nit ); 
     };
     
     let medioContacto_all= await new MedioContacto().getMedioContacto();
     res.status(200).json(medioContacto_all)
  
});
module.exports = router;