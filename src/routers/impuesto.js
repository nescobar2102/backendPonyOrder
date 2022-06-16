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
        //status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// Listar un impuestos por descripcion y nit
router.get('/impuesto/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un impuesto por Nit y Descripcion';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let impuesto = await new Impuesto().getImpuestoDesc(nit,descripcion);
    if (impuesto.length>0){
        response.data = impuesto;
    } else {
        //status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// sincronizacion de impuesto
router.post('/synchronization_impuesto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de impuestos';
    let status = 201;
    const {impuestos} = req.body
    let bandera = false;
    for (var i=0;i<impuestos.length;i++){ 
        const {
            nit,
            id_impuesto,
            descripcion,
            tasa,
            tipo_impuesto,
            por
        } =  impuestos[i]
        result1 = await new Impuesto().createImpuesto(nit,id_impuesto,descripcion,tasa,tipo_impuesto,por); 
    //console.log('primer insert', result1?.rowCount);
    if (!result1?.rowCount || result1?.rowCount == 0) {
    // console.log('no se hizo el inser');
        bandera = true;
        break;        
    }
}     
    if (impuestos.length > 00 && ! bandera){
        response.data = await new Impuesto().getImpuesto();;
    } else {
        response.success = false;
      //  status = 400;
        response.msg = 'Error en la sincronización de Impuestos';
    }    
    res.status(status).json(response)  
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;