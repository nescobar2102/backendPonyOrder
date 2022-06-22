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
    }  else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipoempresa/:nit/', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una tipo empresa por Nit';
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
        let tipoempresa = await new Tipoempresa().getTipoempresaByNit(nit);
        if (tipoempresa.length > 0) {
            response.data = tipoempresa;
        } else {
            response.success = false;
            response.msg = 'No existe registros';
        }
    }
    res.status(status).json(response)
});

router.post('/synchronization_tipoempresa', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tipo de empresa - ';
    let status = 201;
    const {tipoempresas } = req.body
    let bandera = false;

    for (var i = 0; i < tipoempresas.length; i++) { 
        const {
            nit,
            id_tipo_empresa, 
            descripcion
        } =  tipoempresas[i]
        if (nit.trim() == '' || nit == null || id_tipo_empresa.trim() == '' || id_tipo_empresa == null || descripcion.trim() == '' || descripcion == null) {
            bandera = true;
            response.msg = 'El nit,id_tipo_empresa ó descripcion esta vacio';
            status = 400;
            break;
        }   
     
        exist = await  new Tipoempresa().getTipoempresaNitId(nit,id_tipo_empresa);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Tipo de empresa con el nit: (${nit}) y el id_tipo_empresa (${id_tipo_empresa})  ya existe.`;
            status = 200;
            break;
        }
        if(!bandera){
            result = await new Tipoempresa().createTipoempresa(nit, id_tipo_empresa, descripcion);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear el tipo de empresa:  BD ${result}`;
                status = 500;
                break;
            }
        }
   }
        response.data = await new Tipoempresa().getTipoempresa();
        res.status(status).json(response)
    });    
    function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;