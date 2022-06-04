const express = require("express");
const router = express.Router();
const Depto = require('../controllers/depto');
//listar todos los departamentos
router.get('/depto_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los departamentos';
    let depto = await new Depto().getDepto(); 
    if (depto.length>0){
        response.data = depto;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//listar un departamentos por nit
router.get('/depto/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un departamento pot Nit';
    let {nit} = req.params;    
    let depto = await new Depto().getDeptoByNit(nit);
    if (depto.length>0){
        response.data = depto;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//sincronizacion de departamentos
router.post('/synchronization_depto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'SincronizaciÓn de departamentos';
    const {deptos } = req.body
    for (var i=0;i<deptos.length;i++){ 
        const {nit,id_pais,id_depto,nombre} =  deptos[i]
        await new Depto().createDepto(nit,id_pais,id_depto,nombre); 
     };
    if (deptos.length>0){
        response.data = deptos;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    let depto_all= await new Depto().getDepto();
     res.status(200).json(depto_all)
  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;