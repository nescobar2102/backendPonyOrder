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
    let bandera = true;
    let {nit} = req?.params;
    if (nit.trim() == '' || nit == null) {
        bandera= true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    } 
    if (! bandera) {
        let ciudades = await new Ciudades().getCiudadByNit(nit);
        if (ciudades.length > 0) {
            response.data = ciudades;
        } else {
            response.success = false;
            response.mg = 'No existen registros';
        }    
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
        
        if (nit.trim() == '' || nit == null || id_pais.trim() == '' || id_pais == null || id_depto.trim() == '' || id_depto == null || id_ciudad.trim() == '' || id_ciudad == null || nombre.trim() == '' || nombre == null) {
            bandera = true;
            response.success = false;
            response.msg = 'El nit, id_pais, id_depto, id_ciudad ó nombre esta vacio';
            status = 400;
            break;
        }
    
        exist = await   new Ciudades().getCiudadNitId(nit,id_ciudad);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `La Ciudad con el nit: (${nit}) y el id_ciudad (${id_ciudad})  ya existe.`;
            status = 200;
            break;
        }
        if(!bandera){
            result = await new Ciudades().createCiudad(nit, id_pais, id_depto, id_ciudad, nombre);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear una Ciudad:  BD ${result}`;
                status = 500;
                break;
        }
    }
}
    response.data = await new Ciudades().getCiudad();
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
