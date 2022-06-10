const express = require("express");
const router = express.Router();
const Pais = require('../controllers/pais');
// // listar todos los paises
router.get('/pais_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los paises';
    let status = 200;
    let pais = await new Pais().getPais();
    if (pais.length > 0) {
        response.data = pais;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// // listar  los paises por nit y nombre
router.get('/pais/:nit/:nombre', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar los paises por País y nombre';
    let status = 200;
    let {nit, nombre} = req.params;
    let pais = await new Pais().getPaisByNit(nit, nombre);
    if (pais.length > 0) {
        response.data = pais;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// / sincronizacion  pais
router.post('/synchronization_pais', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Paises';
    let status = 201;
    const {paises} = req.body
    let bandera = false;
    for (var i = 0; i < paises.length; i++) {
        const {
            nit,
            id_pais,
            ie_pais,
            nacionalidad,
            nombre
        } = paises[i]
        result1 = await new Pais().createPais(nit, id_pais, ie_pais, nacionalidad, nombre); 
        if (!result1 ?. rowCount || result1 ?. rowCount == 0) { 
            bandera = true;
            break;
        }
    }
    if (paises.length > 0 && ! bandera) {
        response.data = await new Pais().getPais();
    } else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la sincronización de Paises';
    }
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
