const express = require("express");
const router = express.Router();
const Tiempoentrega = require('../controllers/tiempoentrega');

router.get('/tiempoentrega_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Tiempo de entrega';
    let status = 200;
    let tiempoentrega = await new Tiempoentrega().getTiempoentrega();
    if (tiempoentrega.length > 0) {
        response.data = tiempoentrega;
    } else {
        status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.get('/tiempoentrega/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Tiempo de entrega';
    let status = 200;
    let {nit} = req.params;
    let tiempoentrega = await new Tiempoentrega().getTiempoentregaByNit(nit);
    if (tiempoentrega.length > 0) {
        response.data = tiempoentrega;
    } else {
        status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.post('/synchronization_tiempoentrega', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tiempo de entrega';
    let status = 201;
    let bandera = false;
    const {tiempo_entregas} = req.body
    for (var i = 0; i < tiempo_entregas.length; i++) {
        const {nit, id_tiempo_entrega, hora_inicial, hora_final} = tiempo_entregas[i];
        result = await new Tiempoentrega().createTiempoentregan(nit, id_tiempo_entrega, hora_inicial, hora_final);

        if (!result ?. rowCount || result ?. rowCount == 0) {
            bandera = true;
            break;
        }
    }
    if (tiempo_entregas.length > 0 && ! bandera) {
        response.data = await new Tiempoentrega().getTiempoentrega();
    } else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la Sincronización de Tiempo de entrega';
    }
    res.status(status).json(response)

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
