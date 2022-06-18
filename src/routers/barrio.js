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
        //status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar un nuevo Barrio por Nit
router.get('/barrio/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Barrio por Nit';
    let status = 200;
    let {nit} = req.params;
    let barrio = await new Barrio().getBarrioByNit(nit);
    if (barrio.length > 0) {
        response.data = barrio;
    } else {
       // status = 404;
        response.success = false;
        response.mg = 'No existen registros';
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

        if (nit=='' || id_pais =='' || id_depto =='' || id_ciudad == '' || id_barrio == '' || nombre == '') {
            bandera = true;
            response.success = false;
            response.msg = `El Nit,id_pais,id_depto,id_cuidad,id_barrio y nombre no puede estar vacio`;
            status= 500;
            break;
        }
       let exist = await new Barrio().getBarrioNitId(nit,id_barrio);
        if (exist.length>0){
            bandera = true;
            response.success = false;
            response.msg = `El Barrio ya existe con este Nit ${nit}, id_barrio: ${id_barrio}`;
            status = 500;
            break;
        }        
        if (!bandera){
            let barrios = await new Barrio().createBarrio(nit, id_pais, id_depto, id_ciudad, id_barrio, nombre);
            if (!barrios ?. rowCount || barrios ?. rowCount == 0) {
                bandera = true;
                response.success= false;
                response.msg = `Ha ocurrido un erro al insertar un Barrio: BD ${barrios}`;
                status = 500;
                break;
        } else {
            response.msg = `Se ha creado el Barrio, con el Nit ${barrios} - ${nombre}`;
            let insert = await new Barrio().createBarrio(nit);
            response.data = insert;            
        }         
    }    
}
res.status(status).json(response)
});

function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
