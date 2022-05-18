const express = require("express");
const router = express.Router();
const Empresa = require('../controllers/empresa');


/*
  // Empresa
  app.get('/empresa', empresa.getEmpresa) // listar las empresa
  app.get('/empresa/:nit', empresa.getEmpresaNit) // listar una empresa por Nit
  app.post('/empresa', empresa.createEmpresa) // creando una nueva empresa
  app.put('/empresa/:nit', empresa.updateEmpresa)
  app.put('/empresa/status/:nit', empresa.updateEmpresaStatus) //actualizar el estado
*/

// listar los usuarios
router.get('/empresa', async (req,res) => {
    let empresa = await new Empresa().getEmpresa();
    res.status(200).json(empresa)
});
// listar un nuevo usuario por Nit
router.get('/empresa/:nit', async (req,res) => {
    let {nit} = req.params;    
    let empresa = await new Empresa().getEmpresaNit(nit);
    res.status(200).json(empresa)
});

//Create a todo.
router.post('/empresa', async (req,res) => {
    const {nit,dv,razon_social,correo_electronico } = req.body
    let empresa = await new Empresa().createEmpresa( nit,dv,razon_social,correo_electronico ); 
    res.status(200).json(empresa)
});

//Update a todo.
router.put('/empresa/:nit', async (req,res) => {
    const nit = parseInt(req.params.nit)
    const {razon_social, correo_electronico } = req.body 
    let empresa = await new Empresa().updateEmpresa( nit,razon_social, correo_electronico ); 
    if(empresa){
 
        res.status(200).json(`Empresa modified with nit: ${nit} rowCount :  ${empresa.rowCount}`)
    }
    
});
//Update a todo.
router.put('/empresa/status/:nit', async (req,res) => {
    const nit = parseInt(req.params.nit)
    const { estado } = req.body 
    let empresa = await new Empresa().updateUser( nit,estado ); 
    if(empresa){
 
        response.status(200).send(`Empresa status modified with nit: ${nit} rowCount :  ${empresa.rowCount}`)
    }
    
});
 

module.exports = router;
 