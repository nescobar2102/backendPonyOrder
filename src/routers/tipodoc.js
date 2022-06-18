const express = require("express");
const router = express.Router();
const Tipodoc = require('../controllers/tipodoc');
//Listar todos los tipo de doc
router.get('/tipodoc_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los Tipo de Doc';
    let status = 200;
    let tipodoc = await new Tipodoc().getTipodoc(); 
    if (tipodoc.length>0){
        response.data = tipodoc;
    }  else {
    //  status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipodoc/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Tipo de Doc por Nit y descripcion';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let tipodoc = await new Tipodoc().getTipodocByDesc(nit,descripcion);
    if (tipodoc.length>0){
        response.data = tipodoc;
    } else {
     // status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//sincronizacion de tipodoc
router.post('/synchronization_tipodoc', async (req,res) => {
    const response = newResponseJson();
    let status = 201;
    const {tipodocs } = req.body
    let bandera = false;

    for (var i = 0; i < tipodocs.length; i++) {  
        const {nit,
            id_empresa,
            id_sucursal,
            id_clase_doc,
            id_tipo_doc, 
            consecutivo,
            descripcion 
        } =  tipodocs[i]

        if (nit == '' || id_empresa == '' || id_sucursal == '' ||id_clase_doc == '' || id_tipo_doc == '' || consecutivo == '' || descripcion == ''){
            bandera = true;
            response.success = false;
            response.msg = `El Nit,id_empresa,id_sucursal, id_clase_doc,id_tipo_doc,consecutivo y descripcion no puede estar vacio`;
            status= 500;
            break;
            }
            let exist = await new Tipodoc().getTipodocNitId(nit,id_tipo_doc);
            if (exist.length > 0){
                bandera = true;
                response.success = false;
                response.msg =  `El Tipo documento ya existe con este Nit ${nit}, id_tipo_doc: ${id_tipo_doc}`;
                status = 500;
                break;
            }
            if (!bandera) {
                let tipodocs = await new Tipodoc().createTipodoc(nit,id_tipo_doc);
                if (!tipodocs ?. rowCount ||tipodocs?. rowCount == 0) {
                    bandera = true;
                    response.success= false;
                    response.msg = `Ha ocurrido un erro al insertar un Tipo de documentos: BD ${tipodocs}`;
                    status = 500;
                    break;   
                }else {
                    response.msg = `Se ha creado un Tipo de documentos, con el Nit ${tipodocs} - ${descripcion}`;
                    let insert = await new Tipodoc().createTipodoc(nit);
                    response.data = insert;            
                }     
        }
}
    res.status(status).json(response)
    });
    function newResponseJson() {
        return {success: true,msg: "", data: []};
    }    
module.exports = router;