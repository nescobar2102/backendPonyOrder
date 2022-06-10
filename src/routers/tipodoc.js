const express = require("express");
const router = express.Router();
const Tipodoc = require('../controllers/tipodoc');
//Listar todos los tipo de doc
router.get('/tipodoc_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los tipo de doc';
    let status = 200;
    let tipodoc = await new Tipodoc().getTipodoc(); 
    if (tipodoc.length>0){
        response.data = tipodoc;
    }  else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipodoc/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un tipo de doc por Nit y descripcion';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let tipodoc = await new Tipodoc().getTipodocByDesc(nit,descripcion);
    if (tipodoc.length>0){
        response.data = tipodoc;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//sincronizacion de tipodoc
router.post('/synchronization_tipodoc', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tipo de doc';
    let status = 201;
    const {tipodocs } = req.body
    let bandera = false;
    for (var i=0;i<tipodocs.length;i++){ 
        const {nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion } =  tipodocs[i]
        result1 = await new Tipodoc().createTipodoc(nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion); 
        
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {            
            bandera = true;
            break;        
        }
    }
        if (tipodocs.length>0 && !bandera){
            response.data = await new Tipodoc().getTipodoc();
        } else {
            response.success = false;
            status = 400;
            response.msg = 'Error en la Sincronización de Tipo doc';    
        }
        res.status(status).json(response)
    });
    function newResponseJson() {
        return {success: true,msg: "", data: []};
    }    
module.exports = router;