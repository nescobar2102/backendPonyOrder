const express = require("express");
const router = express.Router();
const Concepto = require('../controllers/concepto');
// listar todos los concepto
router.get('/concepto_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los concepto'; 
    let status = 200;
    let concepto = await new Concepto().getConcepto(); 
    if (empresa.length>0){
        concepto.data = concepto;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar un concepto por descripcion y nit
router.get('/concepto/:descripcion/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un concepto por descripcion y nit'; 
    let status = 200;
    let {descripcion,nit} = req.params;    
    let concepto = await new Concepto().getConceptoByDesc(descripcion,nit);
    if (concepto.length>0){
        response.data = concepto;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// sincronizacion de concepto
router.post('/synchronization_concepto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de concepto'; 
    let status = 201;
    const {conceptos } = req.body
    let bandera = false;
    for (var i=0;i<conceptos.length;i++){ 
        const {nit, id_concepto, id_auxiliar, descripcion, naturalezacta } =  conceptos[i]
        result1 = await new Concepto().createConcepto( nit, id_concepto, id_auxiliar, descripcion, naturalezacta ); 
        
        console.log('primer insert', result1?.rowCount);
    if (!result1?.rowCount || result1?.rowCount == 0) {
        console.log('no se hizo el insert');
        bandera = true;
        break;        
    }
}         
     if (conceptos.length>0 && !bandera){
        response.data = await new Concepto().getConcepto();
    }
    else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la sincronización de concepto';
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