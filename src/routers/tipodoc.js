const express = require("express");
const router = express.Router();
const Tipodoc = require('../controllers/tipodoc');
// Listar todos los tipo de doc
router.get('/tipodoc_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Tipos de Documentos.';
    let status = 200;
    let tipodoc = await new Tipodoc().getTipodoc();
    if (tipodoc.length > 0) {
        response.data = tipodoc;
    } else {
        response.success = false;
        response.msg = 'No existen registros.';
    }
    res.status(status).json(response)
});

router.get('/tipodoc/:nit/:id_tipo_doc', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Tipo de Documento por Nit y Tipo de doc';
    let status = 200;
    let bandera = false;
    
    let {nit, id_tipo_doc} = req?.params;   
    if (nit ?. trim() == '' || nit == null || id_tipo_doc ?. trim() == '' || id_tipo_doc == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó id_tipo_doc estan vacíos';
        status = 400;
    }
    if (!bandera) {
        let tipodoc = await new Tipodoc().getTipodocNitId(nit, id_tipo_doc);
        if (tipodoc.length > 0) {
            response.data = tipodoc;
        } else {
            response.success = false;
            response.msg = 'No existen registros.';
        }
    }
    res.status(status).json(response)
});
// sincronizacion de tipodoc
router.post('/synchronization_tipodoc', async (req, res) => {
    const response = newResponseJson();
    let status = 201;
    response.msg = 'Sincronización de Tipo de Doc';
    const {tipodocs} = req.body
    let bandera = false;
     
    for (var i = 0; i < tipodocs.length; i++) {
        const {
            nit,
            id_empresa,
            id_sucursal,
            id_clase_doc,
            id_tipo_doc,
            consecutivo,
            descripcion
        } = tipodocs[i]

        if (nit.trim() == '' || id_empresa.trim() == '' || id_sucursal.trim() == '' || id_clase_doc.trim() == '' || id_tipo_doc.trim() == '' || consecutivo.trim() == '' || descripcion.trim() == '') {
            bandera = true;
            response.success = false;
            response.msg = `El Nit,id_empresa,id_sucursal, id_clase_doc,id_tipo_doc,consecutivo ó descripción no puede estar vacío`;
            status = 400;
            break;
        }
        let exist = await new Tipodoc().getTipodocNitId(nit, id_tipo_doc);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Tipo documento ya existe con este Nit ${nit}, id_tipo_doc: ${id_tipo_doc}`;
            status = 200;
            break;
        }
        if (! bandera) {
            let tipodocs = await new Tipodoc().createTipodoc(nit, id_empresa,id_sucursal, id_clase_doc, id_tipo_doc, consecutivo, descripcion);
            if (! tipodocs ?. rowCount || tipodocs ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un erro al insertar un Tipo de documentos: BD ${tipodocs}`;
                status = 500;
                break;
            }  
        }
    }
  
    response.data =  await new Tipodoc().getTipodoc();
   
    res.status(status).json(response)
});

function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
