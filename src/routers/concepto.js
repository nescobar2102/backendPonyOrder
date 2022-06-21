const express = require("express");
const router = express.Router();
const Concepto = require('../controllers/concepto');
// listar todos los concepto
router.get('/concepto_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los conceptos'; 
    let status = 200;
    let concepto = await new Concepto().getConcepto(); 
    if (concepto.length>0){
        response.data = concepto;
    } else {
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar un concepto por descripcion y nit
router.get('/concepto/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Concepto por Nit y descripcion'; 
    let status = 200;
    let bandera = false;

    let {nit,descripcion} = req?.params;   
    if (nit.trim() == '' || nit == null || descripcion.trim() == '' || descripcion == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit, id_concepto, id_auxiliar,descripcion ó naturalezacta estan vacíos';
        status = 400;
    }
    if (!bandera) {
        let concepto = await new Concepto().getConceptoByNitDes(nit,descripcion);
        if (concepto.length > 0) {
            response.data = concepto;
        } else {
            response.success = false;
            response.msg = 'No existen registros.';
        }
    }
    res.status(status).json(response)
});
// sincronizacion de concepto
router.post('/synchronization_concepto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de conceptos'; 
    let status = 201;
    const {conceptos } = req.body
    let bandera = false;

    for (var i = 0; i < conceptos.length; i++){ 
        const {
            nit, 
            id_concepto, 
            id_auxiliar, 
            descripcion, 
            naturalezacta
        } =  conceptos[i]
       
    if (nit.trim() == '' || id_concepto.trim() == '' || descripcion.trim() == '' || naturalezacta.trim() == '') {
        bandera = true;
        response.success = false;
        response.msg = `El nit, id_concepto, id_auxiliar,descripcion ó naturalezacta no puede estar vacío`;
        status = 400;
        break;
    }
  
    let exist = await new Concepto().getConceptoNitId(nit, id_concepto);
    if (exist.length > 0 ){
        bandera = true;
        response.success = false;
        response.msg = `El Concepto ya existe con ese Nit ${nit}, id_concepto: ${id_concepto}`;
        status = 400;
        break;
    }    
    if (! bandera) {
        let conceptos = await new Concepto().createConcepto(nit, id_concepto, id_auxiliar,descripcion, naturalezacta);
        if (! conceptos ?. rowCount || conceptos ?. rowCount == 0) {
            bandera = true;
            response.success = false;
            response.msg = `Ha ocurrido un erro al insertar un Concepto: BD ${conceptos}`;
            status = 500;
            break;
        }  
    }
}
    response.data =  await new Concepto().getConcepto();

    res.status(status).json(response)  
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;