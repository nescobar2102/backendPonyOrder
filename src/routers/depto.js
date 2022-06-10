const express = require("express");
const router = express.Router();
const Depto = require('../controllers/depto');

// listar todos los departamentos
router.get('/depto_all', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    response.msg = 'Listar todos los departamentos';
    let depto = await new Depto().getDepto();
    if (depto.length > 0) {
        response.data = depto;
    } else {
        status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response);
});

// listar un departamentos por nit
router.get('/depto/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un departamento pot Nit';
    let status = 200;
    let {nit} = req.params;
    let depto = await new Depto().getDeptoByNit(nit);
    if (depto.length > 0) {
        response.data = depto;
    } else {
        status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response);
});

// sincronizacion de departamentos
router.post('/synchronization_depto', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronizacion de departamentos';
    let status = 201;
    let bandera = false;

    await new Depto().deleteDepto(); // revisan con Ricardo
    const {deptos} = req.body;

    for (var i = 0; i < deptos.length; i++) {
        const {nit, id_pais, id_depto, nombre} = deptos[i]
        result = await new Depto().createDepto(nit, id_pais, id_depto, nombre);
        if (!result ?. rowCount || result ?. rowCount == 0) { // se valida si existe el valor rowCount
            bandera = true; // se levanta la bandera
            break;
        }
    };
    if (deptos.length > 0 && ! bandera) {
        response.data = await new Depto().getDepto();
    } else {
        status = 400;
        response.success = false;
        response.msg = 'Error en la sincronizacion de departamentos';
    }
    res.status(status).json(response);

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
