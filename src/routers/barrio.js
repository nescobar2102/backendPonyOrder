const express = require("express");
const router = express.Router();
const Barrio = require('../controllers/barrio');

// listar los Barrio
router.get('/barrio', async (req,res) => {
    let barrio = await new Barrio().getBarrio();
    res.status(200).json(barrio)
});
// listar un nuevo Barrio por Nit
router.get('/barrio/:nit', async (req,res) => {
    let {nit} = req.params;    
    let barrio = await new Barrio().getBarrioByNit(nit);
    res.status(200).json(barrio)
});
//Create a todo.
router.post('/synchronization_barrio', async (req,res) => {
    const {barrios } = req.body
    for (var i=0;i<barrios.length;i++){ 
        console.log(barrios[i]);
        const {nit, id_pais, id_depto, id_ciudad, id_barrio, nombre } =  barrios[i]
        await new Barrio().createBarrio( nit, id_pais, id_depto, id_ciudad, id_barrio, nombre ); 
     };
     
     let barrio_all= await new Barrio().getBarrio();
     res.status(200).json(barrio_all)
  
});
module.exports = router;