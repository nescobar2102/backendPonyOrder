const express = require("express");
const router = express.Router();
const Barrio = require('../controllers/barrio');

// listar los Barrio
router.get('/barrio_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Barrios';
    let status = 200;
    let barrio = await new Barrio().getBarrio();
    if (barrio.length>0){
        response.data = barrio;       
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar un nuevo Barrio por Nit
router.get('/barrio/:nit/:nombre', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Barrio por Nit';
    let status = 200;
    let {nit,nombre} = req.params;    
    let barrio = await new Barrio().getBarrioByNit(nit,nombre);
    if (barrio.length>0){
        response.data = barrio;       
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//Create a todo.
router.post('/synchronization_barrio', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronizacion del Barrio';
    let status = 201;
    const {barrios } = req.body
    let bandera = false;
    for (var i=0;i<barrios.length;i++){ 
        const {nit, id_pais, id_depto, id_ciudad, id_barrio, nombre } =  barrios[i]
        result1 = await new Barrio().createBarrio( nit, id_pais, id_depto, id_ciudad, id_barrio, nombre ); 
        
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
            console.log('no se hizo el insert');
            bandera = true;
            break;        
        }
    }
    if (barrios.length>0 && !bandera){
        response.data = await new Barrio().getBarrio();
    }
    else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la sincronización de barrio';

    }
    res.status(status).json(response)
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;