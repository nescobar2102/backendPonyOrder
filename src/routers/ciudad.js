const express = require("express");
const router = express.Router();
const Ciudades = require('../controllers/ciudad');

// listar Ciudad
router.get('/ciudades', async (req,res) => {
    let ciudades = await new Ciudades().getCiudad();
    res.status(200).json(ciudades)
});
// listar una nueva Ciudad por Nit
router.get('/ciudades/:nit', async (req,res) => {
    let {nit} = req.params;    
    let ciudades = await new Ciudades().getCiudadByNit(nit);
    res.status(200).json(ciudades)
});
//Create a todo.
router.post('/synchronization_ciudad', async (req,res) => {
    const {ciudades } = req.body
    for (var i=0;i<ciudades.length;i++){ 
        console.log(ciudades[i]);
        const { nit, id_pais, id_depto, id_ciudad, nombre } =  ciudades[i]
        await new Ciudades().createCiudad( nit, id_pais, id_depto, id_ciudad, nombre ); 
     };
     
     let ciudad_all= await new Ciudades().getCiudad();
     res.status(200).json(ciudad_all)
  
});
module.exports = router;