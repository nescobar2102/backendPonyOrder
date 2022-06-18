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
      //status = 404;
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
     // status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_tipoidentificacion', async (req,res) => {
    const response = newResponseJson();
    //response.msg = 'Sincronización de Tipo Identificacion';
    let status = 201;
    const {identificaciones } = req.body
    let bandera = false;

    for (var i = 0; i < identificaciones.length; i++) { 
        const {
            id_tipo_identificacion,
             descripcion 
            } =  identificaciones[i]

            if (id_tipo_identificacion=='' || descripcion =='') {
                bandera = true;
                response.success = false;
                response.msg = `El id_tipo_identificacion y descripcion no puede estar vacio`;
                status= 500;
                break;
            }
            let exist = await new Tipoidentificacion().getTipoidentificacion(id_tipo_identificacion,descripcion);
            if (exist.length > 0 ) {
                bandera = true;
                response.success = false;
                response.msg =  `El Tipo identificacion ya existe con este id_tipo_identificacion ${id_tipo_identificacion}, descripcion: ${descripcion}`;
                status = 500;
                break;
            }
            if (!bandera) {
                let identificaciones = await new Tipoidentificacion().createTipoidentificacion(id_tipo_identificacion,descripcion);
                if (!identificaciones?.rowCount || identificaciones?. rowCount == 0){
                bandera = true;
                response.success= false;
                response.msg = `Ha ocurrido un erro al insertar un Tipo Identificacion: BD ${identificaciones}`;
                status = 500;
                break;
        } else {
            response.msg = `Se ha creado un Tipo Identificacion, con el id_tipo_identificacion ${identificaciones} - ${descripcion}`;
            let insert = await new Tipoidentificacion().createTipoidentificacion(id_tipo_identificacion);
            response.data = insert; 
        }
  }        
}
    res.status(status).json(response)
});
    function newResponseJson() {
        return {success: true, msg: "", data: []};
    }    
module.exports = router;