const express = require("express");
const router = express.Router();
const Auxiliares = require('../controllers/auxiliar');

// listar Auxiliar
router.get('/auxiliar_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Auxiliar';
    let status = 200;
    let auxiliar = await new Auxiliares().getAuxiliares();
    
    if (auxiliar.length>0){
        response.data = auxiliar;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

// listar Auxiliar por Nit
router.get('/auxiliar/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar los Auxiliar por Nit y descripcion';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let auxiliar = await new Auxiliares().getAuxiliaresByNit(nit,descripcion);
    if (auxiliar.length>0){
        response.data = auxiliar;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';  
    }
    res.status(status).json(response)
});
//Create a todo.
router.post('/synchronization_auxiliar', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Auxiliar';
    let status = 201;
    const {auxiliares} = req.body
    let bandera = false;
    for (var i=0;i<auxiliares.length;i++){ 
        const {nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta } =  auxiliares[i]
        result1  = await new Auxiliares().createAuxiliares( nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta ); 
        
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
        console.log('no se hizo el insert');
        bandera = true;
        break;        
    }
}
        if (auxiliares.length>0 && !bandera){
        response.data = await new Auxiliares().getAuxiliares();
}
    else {
    response.success = false;
    status = 400;
    response.msg = 'Error en la sincronización de auxiliar';
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