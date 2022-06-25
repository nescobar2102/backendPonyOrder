const express = require("express");
const router = express.Router();
const Formapago = require('../controllers/formapago');
// Listar todas las forma de pago
router.get('/formapago_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas las forma de pago';
    let status = 200;
    let formapago = await new Formapago().getFormapago();
    if (formapago.length > 0) {
        response.data = formapago;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/formapago/:nit/:descripcion', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar una forma de pago por Nit';
    let status = 200;
    let bandera = false;
    let {nit, descripcion} = req.params;
    if (nit.trim() == '' || nit == null || descripcion.trim() == '' || descripcion == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó descripcion esta vacio';
        status = 400;
    }
    if (!bandera) {
        let formapago = await new Formapago().getFormapagoByNit(nit, descripcion);
        if (formapago.length > 0) {
            response.data = formapago;
        } else { 
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});

router.get('/formapagoid/:nit/:id_forma_pago', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar una forma de pago por id_forma_pago';
    let status = 200;
    let bandera = false;
    let {nit, id_forma_pago} = req?.params;
    if (nit.trim() == '' || nit == null || id_forma_pago.trim() == '' || id_forma_pago == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó id_forma_pago esta vacio';
        status = 400;
    } 
    if (!bandera) {
        let formapago = await new Formapago().getFormapagoByid(nit, id_forma_pago);
        if (formapago.length > 0) {
            response.data = formapago;
        } else { 
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
router.delete('/formapago_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar Forma de Pago';
    let status = 200; 
    const result =  await new Formapago().deleteformapago();
    response.msg = result?.detail || response.msg;
    res.status(status).json(response)
});
// sincronizacion de forma pago
router.post('/synchronization_formapago', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de forma pago';
    let status = 201;
    const {forma_pago} = req.body
    let bandera = false;
    let bandera_hijo = false;
    for (var i = 0; i < forma_pago.length; i++) {
        if (! bandera_hijo) {
            const {
                nit,
                descripcion,
                id_precio_item,
                id_forma_pago,
                forma_pagodet
            } = forma_pago[i]
            if (nit.trim() == '' || nit == null || id_forma_pago.trim() == '' || id_forma_pago == null) {
                bandera = true;
                response.success = false;
                response.msg = 'El nit ó id_forma_pago esta vacio';
                status = 400;
                break;
            }
            let formapago = await new Formapago().getFormapagoByid(nit, id_forma_pago);
            if (formapago.length > 0) {               
                bandera = true; 
                response.success = false; 
                response.msg = `La forma de pago con el nit ${nit} y  el id_forma_pago ${id_forma_pago} ya existe`;
                status = 200;
                break;
                } 

            result1 = await new Formapago().createFormapago(nit, descripcion, id_precio_item, id_forma_pago);
           
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
                bandera  = true;  
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar una forma de pago: BD ${result1}`;
                status = 500;  
                break;
            } else {
                if (forma_pagodet ?. length > 0 && result1.rowCount > 0) {
                  
                    for (var j = 0; j < forma_pagodet.length; j++) {
                        const {
                            cuota,
                            dias,
                            tasa,
                            clase,
                            descripcion_detalle,
                            flag_activo
                        } = forma_pagodet[j]

                        let formapagodet = await new Formapago().getFormapagoBydet(nit,id_forma_pago);
                        if (formapagodet.length > 0) {               
                            bandera = true; 
                            response.success = false; 
                            response.msg = `La forma de pago detalle con el nit ${nit} y  el id_forma_pago ${id_forma_pago} ya existe en la tabla forma_pagodet`;
                            status = 200;
                            break;
                            } 
                        result2 = await new Formapago().createFormapagodet(nit, id_forma_pago, cuota, dias, tasa, clase, descripcion_detalle, flag_activo);
                        if (!result2 ?. rowCount || result2.rowCount == 0) {
                            bandera_hijo  = true;  
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar una forma de pago detalle: BD ${result2}`;
                            status = 500;  
                            break; 
                        }
                    }
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) {      
        response.data =  await new Formapago().getFormapago();
    } 
    res.status(status).json(response);
});

function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
