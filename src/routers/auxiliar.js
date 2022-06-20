const express = require("express");
const router = express.Router();
const Auxiliares = require('../controllers/auxiliar');

// listar Auxiliar
router.get('/auxiliar_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Auxiliar';
    let status = 200;
    let auxiliar = await new Auxiliares().getAuxiliares();

    if (auxiliar.length > 0) {
        response.data = auxiliar;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

// listar Auxiliar por Nit
router.get('/auxiliar/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar los Auxiliar por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req.params;
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    }
 
    if (! bandera) {
        let auxiliar = await new Auxiliares().getAuxiliaresByNit(nit);
        if (auxiliar.length > 0) {
            response.data = auxiliar;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});

// Create a todo.
router.post('/synchronization_auxiliar', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Auxiliar ';
    let status = 201;
    const {auxiliares} = req.body
    let bandera = false;

   // await new Auxiliares().deleteAuxiliar();
    for (var i = 0; i < auxiliares.length; i++) {
        const {
            nit,
            id_auxiliar,
            descripcion,
            flag_flujo_caja,
            id_tipo_cuenta
        } = auxiliares[i]
        if (nit.trim() == '' || nit == null || id_auxiliar.trim() == '' || id_auxiliar == null || descripcion.trim() == '' || descripcion == null) {
            bandera = true;
            response.success = false;
            response.msg = 'El nit,id_auxiliar ó descripcion esta vacio';
            status = 400;
            break;
        }

        exist = await   new Auxiliares().getAuxiliaresByNitID(nit,id_auxiliar);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El auxiliar con el nit: (${nit}) y el id_auxiliar (${id_auxiliar})  ya existe.`;
            status = 200;
            break;
        }
        if(!bandera){
            result1 = await new Auxiliares().createAuxiliares(nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta);
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear el auxiliar:  BD ${result1}`;
                status = 500;
                break;
            }
          }
    }
    response.data = await new Auxiliares().getAuxiliares();
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
