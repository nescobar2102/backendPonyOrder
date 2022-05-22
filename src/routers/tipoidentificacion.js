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
    const {tipo_identificacion } = req.body
    for (var i=0;i<tipo_identificacion.length;i++){ 
        const {id_tipo_identificacion, descripcion, id_clase_ident } =  tipo_identificacion[i]
        await new Tipoidentificacion().createTipoidentificacion(id_tipo_identificacion, descripcion, id_clase_ident); 
     };
     
     let tipoidentificacion_all= await new Tipoidentificacion().getTipoidentificacion();
     res.status(200).json(tipoidentificacion_all)  
});
module.exports = router;