const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const Impuesto = require('../controllers/impuesto');

// Listar todos los impuestos 
router.get('/impuesto_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los impuestos';
    let status = 200;
    let impuesto = await new Impuesto().getImpuesto(); 
    if (impuesto.length > 0){
        response.data = impuesto;
    } else {
        
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

// Listar un impuestos por nit
router.get('/impuesto/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un impuesto por Nit';
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
    let impuesto = await new Impuesto().getImpuestoByNit(nit);
    if (impuesto.length > 0) {
        response.data = impuesto;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
}
    res.status(status).json(response)
});

// Crear a todo.
router.post('/synchronization_impuesto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de impuestos';
    let status = 201;
    const {impuestos} = req.body
    let bandera = false;

    for (var i = 0; i < impuestos.length; i++) { 
        const {
            nit,
            id_impuesto,
            descripcion,
            tasa,
            tipo_impuesto,
            por
        } =  impuestos[i]
        
    if (nit.trim() == '' || nit == null || id_impuesto.trim() == '' || id_impuesto == null || descripcion.trim() == '' || descripcion == null
     || tasa.trim() == '' || tasa == null || tipo_impuesto.trim() == '' || tipo_impuesto == null || por.trim() == '' || por == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit, id_impuesto, descripcion,tasa,tipo_impuesto ó por esta vacio';
        status = 400;
        break;        
    }
    exist = await new Impuesto().getImpuestoNitId(nit, id_impuesto);
    if (exist.length > 0) {
        bandera = true;
        response.success = false;
        response.msg = `El Impuesto con el nit: (${nit}) y el id_impuesto: (${id_impuesto}) ya existe`;
        status = 200;
        break;
    }
    if (!bandera){
        result = await new Impuesto().createImpuesto(nit,id_impuesto,descripcion,tasa,tipo_impuesto,por);
        if (!result ?. rowCount || result ?. rowCount == 0) {
            bandera = true;
            response.success = false;
            response.msg = `Ha ocurrido un error al intentar crear un Impuesto: BD ${result}`;
            status = 500;
            break;
        }
    }
}
    response.data = await new Impuesto().getImpuesto();
    res.status(status).json(response)  
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;