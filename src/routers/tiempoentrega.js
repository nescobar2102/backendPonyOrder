const express = require("express");
const router = express.Router();
const Tiempoentrega = require('../controllers/tiempoentrega');

// LISTAR TODOS LOS TIEMPO DE ENTREGA
router.get('/tiempoentrega_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Tiempo de Entrega';
    let status = 200;
    let tiempoentrega = await new Tiempoentrega().getTiempoentrega();
   
    if (tiempoentrega.length > 0) {
        response.data = tiempoentrega;
    } else {
    
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// LISTAR TIEMPO DE ENTREGA POR NIT
router.get('/tiempoentrega/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Tiempo de entrega';
    let status = 200;
    let bandera = false;
    let {nit} = req?.params;
   
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    } 
    if (! bandera) {
        let tiempoentrega = await new Tiempoentrega().getTiempoentregaByNit(nit);
        if (tiempoentrega.length > 0) {
            response.data = tiempoentrega;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
// LA SINCRONIZACION 
router.post('/synchronization_tiempoentrega', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tiempo de entrega';
    let status = 201;
    const {tiempo_entregas} = req.body
    let bandera = false;
 
    for (var i = 0; i < tiempo_entregas.length; i++) {
        const {
            nit, 
            id_tiempo_entrega, 
            hora_inicial, 
            hora_final
        } = tiempo_entregas[i]        

        if (nit.trim() == '' || nit == null || id_tiempo_entrega.trim() == '' || id_tiempo_entrega == null || hora_inicial.trim() == '' || hora_inicial == null || hora_final.trim() == '' || hora_final == null) {
            bandera = true;
            response.success = false;
            response.msg = 'El nit,id_tiempo_entrega,hora_inicial ó hora_final esta vacio';
            status = 400;
            break;
        }
       
        if (isNaN(id_tiempo_entrega)) {
            bandera = true;
            response.success = false;
            response.msg = `El campo id_tiempo_entrega (${id_tiempo_entrega}) debe ser un entero. `;
            status = 200;
            break;   
        }

        exist = await new Tiempoentrega().getTiempoentregaNitId(nit,id_tiempo_entrega);
        if (exist?.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Tiempo de entrega con el nit: (${nit}) y el id_tiempo_entrega (${id_tiempo_entrega})  ya existe .`;
            status = 200;
            break;        
        }
        if (!bandera) {
            result = await new Tiempoentrega().createTiempoentregan(nit,id_tiempo_entrega,hora_inicial,hora_final);
           if (!result ?. rowCount || result ?. rowCount == 0) {   
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear un Tiempo de entrega:  BD ${result}`;
                status = 500;
                break;
            }
    }
}
    response.data = await new Tiempoentrega().getTiempoentrega();        
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
