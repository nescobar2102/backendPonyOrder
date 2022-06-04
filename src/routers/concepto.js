const express = require("express");
const router = express.Router();
const Concepto = require('../controllers/concepto');
// listar todos los concepto
router.get('/concepto_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los concepto'; 
    let concepto = await new Concepto().getConcepto(); 
    if (empresa.length>0){
        concepto.data = concepto;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// listar un concepto por descripcion y nit
router.get('/concepto/:descripcion/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un concepto por descripcion y nit'; 
    let {descripcion,nit} = req.params;    
    let concepto = await new Concepto().getConceptoByDesc(descripcion,nit);
    if (concepto.length>0){
        response.data = concepto;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// sincronizacion de concepto
router.post('/synchronization_concepto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de concepto'; 
    const {conceptos } = req.body
    for (var i=0;i<conceptos.length;i++){ 
        const {nit, id_concepto, id_auxiliar, descripcion, naturalezacta } =  conceptos[i]
        await new Concepto().createConcepto( nit, id_concepto, id_auxiliar, descripcion, naturalezacta ); 
     };     
     if (conceptos.length>0){
        response.data = conceptos;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    let concepto_all= await new Concepto().getConcepto();
    res.status(200).json(concepto_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;