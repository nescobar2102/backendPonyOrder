const express = require("express");
const router = express.Router();
const Depto = require('../controllers/depto');

// listar todos los departamentos
router.get('/depto_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Departamentos';
    let status = 200;
    let depto = await new Depto().getDepto();
    if (depto.length > 0) {
        response.data = depto;
    } else {
   
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response);
});

// listar un departamentos por nit
router.get('/depto/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Departamento pot Nit';
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
        let depto = await new Depto().getDeptoByNit(nit);
        if(depto.length > 0){
            response.data = depto;
        } else {
            response.success = false;
            response.msg = 'No existe registros.';
        }
    }
    res.status(status).json(response);
});


// listar un departamentos por nit
router.get('/app_depto/:nit', async (req, res) => { //appmovil
    const response = newResponseJson();
    response.msg = 'Listar un Departamento pot Nit';
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
        let depto = await new Depto().getDeptoByNitApp(nit);
        if(depto.length > 0){
            response.data = depto;
        } else {
            response.success = false;
            response.msg = 'No existe registros.';
        }
    }
    res.status(status).json(response);
});

// CREATE A TODO
router.post('/synchronization_depto', async (req, res) => {
    const response = newResponseJson();   
    response.msg = 'Sincronización de Departamento';
    let status = 201;
    const {deptos} = req.body;
    let bandera = false;

    for (var i = 0; i < deptos.length; i++) {
        const {
            nit,
            id_pais,
            id_depto,
            nombre
        } = deptos[i]
      
        if (nit.trim() == '' || nit == null || id_pais.trim() == '' || id_pais == null || id_depto.trim() == '' || id_depto == null || nombre.trim() == '' || nombre == null) { 
            bandera = true;
            response.success = false;
            response.msg = `El nit, id_pais, id_depto ó nombre esta vacio`;
            status = 400;
            break;
        }
        
        exist = await new Depto().getDeptoNitId(nit,id_depto);
        if (exist.length > 0) {
            bandera= true;
            response.success = false;
            response.msg = `El depto con el Nit (${nit}) y el id_depto (${id_depto}) ya existe.`;
            status = 200;
            break;
        }
        if (!bandera) {
            result = await new Depto().createDepto(nit,id_pais,id_depto,nombre);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un erro al intentar crear un Departamento: BD ${result}`;
                status = 500;
                break;
        } 
    }
}
    response.data = await new Depto().getDepto();
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
