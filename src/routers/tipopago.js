const express = require("express");
const router = express.Router();
const Tipopago = require('../controllers/tipopago');

router.get('/tipopago_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Tipo de pago';
    let status = 200;
    let tipopago = await new Tipopago().getTipopago();
    if (tipopago.length > 0) {
        response.data = tipopago;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipopago/:nit/:descripcion', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false;
    response.msg = 'Listar un Tipo de Pago por Nit y descripcion ';
    let {nit, descripcion} = req ?. params;
    if (nit.trim() == '' || nit == null || descripcion.trim() == '' || descripcion == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó descripcion esta vacio';q
        status = 400;
    }
    if (!bandera) {
        let tipopago = await new Tipopago().getTipopagoByDesc(nit, descripcion);
        if (tipopago.length > 0) {
            response.data = tipopago;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});

router.get('/tipopagoid/:nit/:id_tipo_pago', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false;
    response.msg = 'Listar un Tipo de Pago por Nit y id_tipo_pago ';
    let {nit, id_tipo_pago} = req ?. params;
    if (nit.trim() == '' || nit == null || id_tipo_pago.trim() == '' || id_tipo_pago == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó id_tipo_pago esta vacio';
        status = 400;
    }
    if (!bandera) {
        console.log("id_tipo_pago",id_tipo_pago)
        let tipopago = await new Tipopago().getTipopagoByid(nit, id_tipo_pago);
        if (tipopago.length > 0) {
            response.data = tipopago;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});

router.delete('/tipopago_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar  Tipo Pago';
    let status = 200; 
    response.data =  await new Tipopago().deleteTipopago();
    res.status(status).json(response)
});
router.post('/synchronization_tipopago', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Tipo Pago';
    let status = 201;
    const {tipopagos} = req.body
    let bandera = false;
    let bandera_hijo = false;
    
    for (var i = 0; i < tipopagos.length; i++) {
        if (! bandera_hijo) {
            const {id_tipo_pago, descripcion, nit, tipopagosdet} = tipopagos[i]; 
            if (nit.trim() == '' || nit == null || id_tipo_pago.trim() == '' || id_tipo_pago == null) {
                bandera = true;
                response.success = false;
                response.msg = 'El nit ó id_tipo_pago esta vacio';
                status = 400;
                break;
            }
            let tipopago = await new Tipopago().getTipopagoByid(nit,id_tipo_pago);
            if (tipopago.length > 0) {               
                bandera = true; 
                response.success = false; 
                response.msg = `El Tipo de pago con el nit ${nit} y  el id_tipo_pago ${id_tipo_pago} ya existe`;
                status = 200;
                break;
                } 

            result1 = await new Tipopago().createTipopago(id_tipo_pago, descripcion, nit);
          
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
                bandera  = true;  
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar un tipo de pago: BD ${result1}`;
                status = 500;  
                break;
            } else {

                if (tipopagosdet ?. length > 0 && result1 ?. rowCount > 0) {
                    for (var j = 0; j < tipopagosdet.length; j++) {
                        const {
                            nit,
                            id_tipo_pago,
                            id_auxiliar,
                            cuota
                        } = tipopagosdet[j];
                        let tipopagodet = await new Tipopago().getTipopagoByidDet(nit,id_tipo_pago);
                        if (tipopagodet.length > 0) {               
                            bandera = true; 
                            response.success = false; 
                            response.msg = `El Tipo de pago detalle con el nit ${nit} y  el id_tipo_pago ${id_tipo_pago} ya existe en la tabla tipo_pagodet`;
                            status = 200;
                            break;
                            } 
            
                        result2 = await new Tipopago().createTipopagodet(nit, id_tipo_pago, id_auxiliar, cuota);
             
                        if (!result2 ?. rowCount || result2 ?. rowCount == 0) {
                          
                            bandera_hijo  = true;  
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar un tipo de pago det: BD ${result2}`;
                            status = 500;  
                            break; 
                        }
                    }
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) { 
    response.data = await new Tipopago().getTipopago();
    } 
    res.status(status).json(response);
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
