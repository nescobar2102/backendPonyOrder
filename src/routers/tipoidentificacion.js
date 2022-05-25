const express = require("express");
const router = express.Router();
const Tipoidentificacion = require('../controllers/tipoidentificacion');

router.get('/tipoidentificacion_all', async (req,res) => { 
    let tipoidentificacion = await new Tipoidentificacion().getTipoidentificacion(); 
    res.status(200).json(tipoidentificacion)
});
router.get('/tipoidentificacion/:descripcion', async (req,res) => {
    let {descripcion} = req.params;    
    let tipoidentificacion = await new Tipoidentificacion().getTipoidentificacionByDesc(descripcion);
    res.status(200).json(tipoidentificacion)
});
router.post('/synchronization_tipoidentificacion', async (req,res) => {
    const {identificaciones } = req.body
    for (var i=0;i<identificaciones.length;i++){ 
        const {id_tipo_identificacion, descripcion } =  identificaciones[i]
        await new Tipoidentificacion().createTipoidentificacion(id_tipo_identificacion, descripcion); 
     };
     
     let tipoidentificacion_all= await new Tipoidentificacion().getTipoidentificacion();
     res.status(200).json(tipoidentificacion_all)  
});
module.exports = router;