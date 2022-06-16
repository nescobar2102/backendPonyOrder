const express = require("express");
const router = express.Router();
const Ciudades = require('../controllers/ciudad');

// listar Ciudad
router.get('/ciudades_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas las Ciudades';
    let status = 200;
    let ciudades = await new Ciudades().getCiudad();
    if (ciudades.length > 0) {
        response.data = ciudades;
    } else {
      //status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

// listar una nueva Ciudad por Nit
router.get('/ciudades/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Ciudades por Nit';
    let status = 200;
    let {nit} = req.params;
    let ciudades = await new Ciudades().getCiudadByNit(nit);
    if (ciudades.length > 0) {
        response.data = ciudades;
    } else {
      //status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

// Create a todo.
router.post('/synchronization_ciudad', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Ciudades';
    let status = 201;
    const {ciudades} = req.body
    let bandera = false;
    for (var i = 0; i < ciudades.length; i++) {
        const {
            nit,
            id_pais,
            id_depto,
            id_ciudad,
            nombre
        } = ciudades[i]
        result1 = await new Ciudades().createCiudad(nit, id_pais, id_depto, id_ciudad, nombre);
        if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
            bandera = true;
            break;
        }
    }
    if (ciudades.length > 0 && ! bandera) {
        response.data = await new Ciudades().getCiudad();
    } else {
        response.success = false;
     // status = 400;
        response.msg = 'Error en la sincronización de ciudades';
    }
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
