const express = require("express");
const router = express.Router();
const Tipoempresa = require('../controllers/tipoempresa');

router.get('/tipoempresa_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las tipo de empresa';
    let status = 200;
    let tipoempresa = await new Tipoempresa().getTipoempresa(); 
    if (tipoempresa.length>0){
        response.data = tipoempresa;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipoempresa/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una tipo empresa por Nit y descripcion';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let tipoempresa = await new Tipoempresa().getTipoempresaByDesc(nit,descripcion);
    if (tipoempresa.length>0){
        response.data = tipoempresa;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_tipoempresa', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tipo de empresa';
    let status = 201;
    const {tipoempresas } = req.body
    let bandera = false;
    for (var i=0;i<tipoempresas.length;i++){ 
        const { id_tipo_empresa, descripcion, nit} =  tipoempresas[i]
        result1 = await new Tipoempresa().createTipoempresa(id_tipo_empresa, descripcion, nit); 
        
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
            console.log('no se hizo el insert');
            bandera = true;
            break;        
        }
    }
        if (tipoempresas.length>0 && !bandera){
            response.data = await new Tipoempresa().getTipoempresa();
        }
        else {
            response.success = false;
            status = 400;
            response.msg = 'Error en la sincronización de Tipo empresa';
    
        }
        res.status(status).json(response)
    });    
    function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;