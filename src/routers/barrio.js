const express = require("express");
const router = express.Router();
const Barrio = require('../controllers/barrio');

// listar los Barrio
router.get('/barrio_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Barrios';
    let barrio = await new Barrio().getBarrio();
    if (barrio.length>0){
        response.data = barrio;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// listar un nuevo Barrio por Nit
router.get('/barrio/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Barrio por Nit';
    let {nit} = req.params;    
    let barrio = await new Barrio().getBarrioByNit(nit);
    if (barrio.length>0){
        response.data = barrio;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//Create a todo.
router.post('/synchronization_barrio', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronizacion del Barrio';
    const {barrios } = req.body
    for (var i=0;i<barrios.length;i++){ 
        const {nit, id_pais, id_depto, id_ciudad, id_barrio, nombre } =  barrios[i]
        await new Barrio().createBarrio( nit, id_pais, id_depto, id_ciudad, id_barrio, nombre ); 
     };
     if (barrios.length>0){
        response.data = barrios;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
     let barrio_all= await new Barrio().getBarrio();
     res.status(200).json(barrio_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;