const express = require("express");
const router = express.Router();
const ClasificacionItems = require('../controllers/clasificacionItems');

router.get('/clasificacionItems_all', async (req,res) => { 
    let clasificacionItems = await new ClasificacionItems().getclasificacionItems(); 
    res.status(200).json(clasificacionItems)
});
router.get('/clasificacionItems/:descripcion', async (req,res) => {
    let {descripcion} = req.params;    
    let clasificacionItems = await new ClasificacionItems().getclasificacionItemsByDesc(descripcion);
    res.status(200).json(clasificacionItems)
});
router.post('/synchronization_clasificacionItems', async (req,res) => {
    const {clasificacionItems } = req.body
    for (var i=0;i<clasificacionItems.length;i++){ 
        const {id_clasificacion, descripcion, id_padre, nivel, es_padre, imagen, foto, nit } =  clasificacionItems[i]
        await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, es_padre, imagen, foto, nit ); 
     };
     
     let clasificacionItems_all= await new ClasificacionItems().getclasificacionItems();
     res.status(200).json(clasificacionItems_all)
  
});
module.exports = router;