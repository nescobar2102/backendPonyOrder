const express = require("express");
const router = express.Router();
const Banco = require('../controllers/banco');

// listar banco
router.get('/banco_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Banco';
    let status = 200;
    let banco = await new Banco().getBanco();
    if (banco.length>0){
        response.data = banco;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

// listar bancos por Nit
router.get('/banco/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar los Banco por Nit';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let banco = await new Banco().getBancoByNit(nit,descripcion);
    if (banco.length>0){
        response.data = banco;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';  
    }
    res.status(status).json(response)
});
//Create a todo.
router.post('/synchronization_banco', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Banco';
    let status = 201;
    const {bancos} = req.body
    let bandera = false;
    for (var i=0;i<bancos.length;i++){ 
        const { nit, id_banco, descripcion, id_tercero, id_sucursal_tercero } =  bancos[i]
        result1 = await new Banco().createBanco( nit, id_banco, descripcion, id_tercero, id_sucursal_tercero ); 
     
        console.log('primer insert', result1?.rowCount);
    if (!result1?.rowCount || result1?.rowCount == 0) {
        console.log('no se hizo el insert');
        bandera = true;
        break;        
    }
}
     if (bancos.length>0 && !bandera){
        response.data = await new Banco().getBanco();
    }
    else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la sincronización de banco';
    }
    res.status(200).json(response)         
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;