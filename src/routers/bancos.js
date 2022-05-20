const express = require("express");
const router = express.Router();
const Banco = require('../controllers/bancos');

// listar banco
router.get('/banco_all', async (req,res) => {
    let banco = await new Banco().getBanco();
    res.status(200).json(banco)
});

// listar bancos por Nit
router.get('/banco/:nit', async (req,res) => {
    let {nit} = req.params;    
    let banco = await new Banco().getBancoByNit(nit);
    res.status(200).json(banco)
});
//Create a todo.
router.post('/synchronization_banco', async (req,res) => {
    const {bancos} = req.body
    for (var i=0;i<bancos.length;i++){ 
        const { nit, id_banco, descripcion, id_tercero, id_sucursal_tercero } =  bancos[i]
        await new Banco().createBanco( nit, id_banco, descripcion, id_tercero, id_sucursal_tercero ); 
     };
     
     let banco_all= await new Banco().getBanco();
     res.status(200).json(banco_all)
  
});
module.exports = router;