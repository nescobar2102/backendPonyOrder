const express = require("express");
const router = express.Router();
const Impuesto = require('../controllers/impuesto');
// Listar todos los impuestos 
router.get('/impuesto_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los impuestos';
    let impuesto = await new Impuesto().getImpuesto(); 
    if (impuesto.length>0){
        response.data = impuesto;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// Listar un impuestos por descripcion y nit
router.get('/impuesto/:descripcion/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un impuesto por Descripcion y Nit';
    let {descripcion,nit} = req.params;    
    let impuesto = await new Impuesto().getImpuestoDesc(descripcion,nit);
    if (impuesto.length>0){
        response.data = impuesto;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// sincronizacion de impuesto
router.post('/synchronization_impuesto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de impuesto';
    const {impuestos} = req.body
    for (var i=0;i<impuestos.length;i++){ 
        const {nit,id_impuesto,descripcion,tasa,tipo_impuesto,por} =  impuestos[i]
        await new Impuesto().createImpuesto(nit,id_impuesto,descripcion,tasa,tipo_impuesto,por); 
     };
    if (impuestos.length>0){
        response.data = impuestos;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    let impuesto_all= await new Impuesto().getImpuesto();
    res.status(200).json(impuesto_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;