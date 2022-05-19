const express = require("express");
const router = express.Router();
const Auxiliares = require('../controllers/auxiliar');

// listar Auxiliar
router.get('/auxiliar_all', async (req,res) => {
    let auxiliar = await new Auxiliares().getAuxiliares();
    res.status(200).json(auxiliar)
});
// listar Auxiliar por Nit
router.get('/auxiliar/:nit', async (req,res) => {
    let {nit} = req.params;    
    let auxiliar = await new Auxiliares().getAuxiliaresByNit(nit);
    res.status(200).json(auxiliar)
});
//Create a todo.
router.post('/synchronization_auxiliar', async (req,res) => {
    const {auxiliares} = req.body
    for (var i=0;i<auxiliares.length;i++){ 
        const {nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta } =  auxiliares[i]
        await new Auxiliares().createAuxiliares( nit, id_auxiliar, descripcion, flag_flujo_caja, id_tipo_cuenta ); 
     };
     
     let auxiliar_all= await new Auxiliares().getAuxiliares();
     res.status(200).json(auxiliar_all)
  
});

module.exports = router;