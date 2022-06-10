const express = require("express");
const router = express.Router();
const Tipoidentificacion = require('../controllers/tipoidentificacion');

router.get('/tipoidentificacion_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los tipo identificacion';
    let status = 200;
    let tipoidentificacion = await new Tipoidentificacion().getTipoidentificacion(); 
    if (tipoidentificacion.length>0){
        response.data = tipoidentificacion;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipoidentificacion/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Tipo Identificacion por Descripcion';
    let status = 200;
    let {descripcion} = req.params;        
    let tipoidentificacion = await new Tipoidentificacion().getTipoidentificacionByDesc(descripcion);
    if (tipoidentificacion.length>0){
        response.data = tipoidentificacion;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_tipoidentificacion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Tipo Identificacion';
    let status = 201;
    const {identificaciones } = req.body
    let bandera = false;
    for (var i=0;i<identificaciones.length;i++){ 
        const {id_tipo_identificacion, descripcion } =  identificaciones[i]
        result1 = await new Tipoidentificacion().createTipoidentificacion(id_tipo_identificacion, descripcion); 
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
           //console.log('no se hizo el insert');
            bandera = true;
            break;        
        }
    }
        if (identificaciones.length>0 && !bandera){
            response.data = await new Tipoidentificacion().getTipoidentificacion();
        }
        else {
            response.success = false;
            status = 400;
            response.msg = 'Error en la Sincronización de tipo Identificacion';    
        }
        res.status(status).json(response)
    });
    function newResponseJson() {
        return {success: true, msg: "", data: []};
    }    
module.exports = router;