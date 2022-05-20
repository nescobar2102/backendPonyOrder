const express = require("express");
const router = express.Router();
const Empresa = require('../controllers/empresa');


// listar los empresa
router.get('/empresa_all', async (req,res) => {
    let empresa = await new Empresa().getEmpresa();
    res.status(200).json(empresa)
});
// listar una nueva empresa por Nit
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
    let empresa = await new Empresa().updateEmpresaStatus( nit,estado ); 
    if(empresa){
 
        res.status(200).send(`Empresa status modified with nit: ${nit} rowCount :  ${empresa.rowCount}`)
    }
    
});
 

module.exports = router;
 