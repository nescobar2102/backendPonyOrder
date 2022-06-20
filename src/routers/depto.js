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
     // status = 404;
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
    let {nit} = req.params;
    let depto = await new Depto().getDeptoByNit(nit);
    if (depto.length > 0) {
        response.data = depto;
    } else {
     // status = 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response);
});

// sincronizacion de departamentos
router.post('/synchronization_depto', async (req, res) => {
    const response = newResponseJson();   
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
      
        if (nit.trim() == '' || id_pais.trim() == '' || id_depto.trim() == '' || nombre.trim() == '') { 
            bandera = true;
            response.success = false;
            response.msg = `El nit, id_pais, id_depto y nombre no puede estar vacio`;
            status = 500;
            break;
        }
        let exist = await new Depto().getDeptoNitId(nit,id_depto);
        if (exist.length > 0) {
            bandera= true;
            response.success = false;
            response.msg = `El depto ya existe con este Nit ${nit} y el id_depto ${id_depto}`;
            status = 500;
            break;
        }
        if (!bandera) {
            let deptos = await new Depto().createDepto(nit,id_pais,id_depto,nombre);
            if (! deptos ?. rowCount || deptos ?. rowCount == 0){
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un erro al insertar un Departamento: BD ${deptos}`;
                status = 500;
                break;
        } else {
            response.msg = `Sincronización exitosa.`;
            let insert = await new Depto().getDepto(); 
            response.data = insert;
        }
    }
}
    res.status(status).json(response);
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
