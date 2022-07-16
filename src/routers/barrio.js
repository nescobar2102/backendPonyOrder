const express = require("express");
const router = express.Router();
const Barrio = require('../controllers/barrio');

// listar los Barrio
router.get('/barrio_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Barrios';
    let status = 200;
    let barrio = await new Barrio().getBarrio();
    if (barrio.length > 0) {
        response.data = barrio;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar un nuevo Barrio por Nit
router.get('/barrio/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Barrio por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req?.params;
    
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400; 
    } 
    if (!bandera) { 
        let barrio = await new Barrio().getBarrioByNit(nit);
        if (barrio.length > 0) {
            response.data = barrio;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
// listar un nuevo Barrio por Nit
router.get('/app_barrio/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Barrio por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req?.params;
    
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400; 
    } 
    if (!bandera) { 
        let barrio = await new Barrio().getBarrioByNitApp(nit);
        if (barrio.length > 0) {
            response.data = barrio;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
// Create a todo.
router.post('/synchronization_barrio', async (req, res) => {
    const response = newResponseJson();
    let status = 201;
    const {barrios} = req.body
    let bandera = false;

    for (var i = 0; i < barrios.length; i++) {
        const {
            nit,
            id_pais,
            id_depto,
            id_ciudad,
            id_barrio,
            nombre
        } = barrios[i]

        if (nit.trim() == '' || nit == null || id_pais.trim() == '' || id_pais == null || id_depto.trim() == '' || id_depto == null || id_ciudad.trim() == ''  || id_ciudad == null || id_barrio.trim() == '' || id_barrio == null || nombre.trim() == '' || nombre == null) {
            bandera = true;
            response.success = false;
            response.msg = `El Nit,id_pais,id_depto,id_cuidad,id_barrio ó nombre esta vacio`;
            status = 400; 
            break;
        }
        exist = await new Barrio().getBarrioNitId(nit, id_barrio);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Barrio con el nit: (${nit}) y el id_barrio (${id_barrio})  ya existe.`;
            status = 200;
            break;
        }
        if (! bandera) { 
               result  = await new Barrio().createBarrio(nit, id_pais, id_depto, id_ciudad, id_barrio, nombre);
            if (!result ?. rowCount || result ?. rowCount == 0) {  
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un erro al intentar crear un Barrio: BD ${result}`;
                status = 500;
                break;            
            }
        }
    }
        response.data = await new Barrio().getBarrio();
        res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
