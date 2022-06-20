const express = require("express");
const router = express.Router();
const Tipoidentificacion = require('../controllers/tipoidentificacion');

router.get('/tipoidentificacion_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los tipos de identificacion';
    let status = 200;
    let tipoidentificacion = await new Tipoidentificacion().getTipoidentificacion();
    if (tipoidentificacion.length > 0) {
        response.data = tipoidentificacion;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipoidentificacion/:id_tipo_identificacion', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Tipo Identificacion por  Tipo identificacion ';
    let status = 200;
    let bandera = false;
    let {id_tipo_identificacion} = req.params;

    if (id_tipo_identificacion.trim() == '' || id_tipo_identificacion.trim() == null) {
        bandera = true;
        response.success = false;
        response.msg = `El id_tipo_identificación esta vacío`;
        status = 500;
    }
    if (! bandera) {
        let tipoidentificacion = await new Tipoidentificacion().getTipoidentificacionId(id_tipo_identificacion);
        if (tipoidentificacion.length > 0) {
            response.data = tipoidentificacion;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});

router.post('/synchronization_tipoidentificacion', async (req, res) => {
    const response = newResponseJson();
    let status = 201;
    const {identificaciones} = req.body
    let bandera = false;

    for (var i = 0; i < identificaciones.length; i++) {
        const {id_tipo_identificacion, descripcion} = identificaciones[i]

        if (id_tipo_identificacion.trim() == '' || descripcion.trim() == '') {
            bandera = true;
            response.success = false;
            response.msg = `El id_tipo_identificación y descripción no puede estar vacío`;
            status = 500;
            break;
        }
        let exist = await new Tipoidentificacion().getTipoidentificacionId(id_tipo_identificacion);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Tipo identificación ya existe con este id_tipo_identificacion ${id_tipo_identificacion}  `;
            status = 500;
            break;
        }
        if (! bandera) {
            let identificaciones = await new Tipoidentificacion().createTipoidentificacion(id_tipo_identificacion, descripcion);
            if (! identificaciones ?. rowCount || identificaciones ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un erro al insertar un Tipo Identificacion: BD ${identificaciones}`;
                status = 500;
                break;
            } else {
                response.msg = `Sincronización exitosa.`; 
           
            }
        }
    }
     
    response.data =await new Tipoidentificacion().getTipoidentificacion();
    res.status(status).json(response)
});

function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
