const express = require("express");
const router = express.Router();
const Banco = require('../controllers/banco');

// listar banco
router.get('/banco_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Bancos';
    let status = 200;
    let banco = await new Banco().getBanco();
    if (banco.length > 0) {
        response.data = banco;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

// listar bancos por Nit
router.get('/banco/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar los Bancos por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req?.params;
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    }
    
    if (! bandera) {
        let bancos = await new Banco().getBancoByNit(nit);
        if (bancos.length > 0){
            response.data = bancos;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
// Create a todo.
router.post('/synchronization_banco', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Bancos';
    let status = 201;
    const {bancos} = req.body
    let bandera = false;

    //await new Banco().deleteBanco(); 
    for (var i = 0; i < bancos.length; i++) {
        const { 
            nit,
            id_banco,
            descripcion 
        } = bancos[i]
       
        if (nit.trim() == '' || nit == null || id_banco.trim() == '' || id_banco == null || descripcion.trim() == '' || descripcion == null) {       
            bandera = true;
            response.success = false;
            response.msg = 'El nit, id_banco ò descripcion no puede estar vacios';
            status = 400;
            break;
        }
        exist = await new Banco().getBancoNitId(nit,id_banco);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Banco con el nit: (${nit}) y el id_banco (${id_banco}) ya existe.`;
            status = 200;
            break;
        }
        if(!bandera){
                result = await new Banco().createBanco(nit, id_banco, descripcion);
                if (!result ?. rowCount || result ?. rowCount == 0) {
                    bandera = true;
                    response.success = false;
                    response.msg = `Ha ocurrido un error al intentar crear un Banco:  BD ${result}`;
                    status = 500;
                    break;
                }
        }
    }
    response.data = await new Banco().getBanco();
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
