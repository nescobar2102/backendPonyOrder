const express = require("express");
const router = express.Router();
const Banco = require('../controllers/banco');

// listar banco
router.get('/banco_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Banco';
    let banco = await new Banco().getBanco();
    if (banco.length>0){
        response.data = banco;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});

// listar bancos por Nit
router.get('/banco/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar los Banco por Nit';
    let {nit} = req.params;    
    let banco = await new Banco().getBancoByNit(nit);
    if (banco.length>0){
        response.data = banco;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//Create a todo.
router.post('/synchronization_banco', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Banco';
    const {bancos} = req.body
    for (var i=0;i<bancos.length;i++){ 
        const { nit, id_banco, descripcion, id_tercero, id_sucursal_tercero } =  bancos[i]
        await new Banco().createBanco( nit, id_banco, descripcion, id_tercero, id_sucursal_tercero ); 
     };
     if (bancos.length>0){
        response.data = bancos;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)     
    let banco_all= await new Banco().getBanco();
    res.status(200).json(banco_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;