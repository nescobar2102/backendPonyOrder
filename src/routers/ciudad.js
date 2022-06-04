const express = require("express");
const router = express.Router();
const Ciudades = require('../controllers/ciudad');

// listar Ciudad
router.get('/ciudades_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas las Ciudades';
    let ciudades = await new Ciudades().getCiudad();
    if (ciudades.length>0){
        response.data = ciudades;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// listar una nueva Ciudad por Nit
router.get('/ciudades/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Ciudades por Nit';
    let {nit} = req.params;    
    let ciudades = await new Ciudades().getCiudadByNit(nit);
    if (ciudades.length>0){
        response.data = ciudades;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//Create a todo.
router.post('/synchronization_ciudad', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Ciudades';
    const {ciudades} = req.body
    for (var i=0;i<ciudades.length;i++){ 
        const { nit, id_pais, id_depto, id_ciudad, nombre } =  ciudades[i]
        await new Ciudades().createCiudad( nit, id_pais, id_depto, id_ciudad, nombre ); 
     };
     if (ciudades.length>0){
        response.data = ciudades;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)

     let ciudad_all= await new Ciudades().getCiudad();
     res.status(200).json(ciudad_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;