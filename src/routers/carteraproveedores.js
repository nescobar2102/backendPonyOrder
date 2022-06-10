const express = require("express");
const router = express.Router();
const Carteraproveedores = require('../controllers/carteraproveedores');

router.get('/carteraproveedores_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas carteras proveedores';
    let status = 200;
    let carteraproveedores = await new Carteraproveedores().getCarteraproveedores();
   
    if (carteraproveedores.length > 0) {
        response.data = carteraproveedores;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.get('/carteraproveedores/:id_empresa/:id_tercero/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas carteras por id_empresa  id_tercero nit';
    let status = 200;
    let {id_empresa, id_tercero, nit} = req.params;
    let carteraproveedores = await new Carteraproveedores().getCarteraproveedoresByEmp(id_empresa, id_tercero, nit);
    
    if (carteraproveedores.length > 0) {
        response.data = carteraproveedores;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.post('/synchronization_carteraproveedores', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de cartera de proveedores';
    let status = 200;
    let bandera = false;
    let bandera_hijo = false;
    const {cartera_proveedores} = req.body
    for (var i = 0; i < cartera_proveedores.length; i++) {
        if (!bandera_hijo) {
        const {
            nit,
            id_empresa,
            id_sucursal,
            id_tipo_doc,
            numero,
            fecha,
            total,
            vencimiento,
            letras,
            id_moneda,
            id_tercero,
            id_sucursal_tercero,
            id_recaudador,
            fecha_trm,
            trm,
            observaciones,
            usuario,
            flag_enviado,
            cartera_proveedores_det
        } = cartera_proveedores[i];

            result1 = await new Carteraproveedores().createCarteraproveedores(nit, id_empresa, id_sucursal, id_tipo_doc, numero,
                  fecha, total, vencimiento, letras, id_moneda, id_tercero, id_sucursal_tercero, id_recaudador, fecha_trm,
                  trm, observaciones, usuario, flag_enviado); 
                if (!result1 ?. rowCount || result1 ?. rowCount == 0) { // se valida si existe el valor rowCount 
                     bandera = true; // se levanta la bandera
                     break;
                } else { // realizo el insert maestro
                 if (cartera_proveedores_det?.length > 0 && result1?.rowCount > 0) { 
                    for (var j = 0; j < cartera_proveedores_det.length; j++) { 
                        const {                          
                            consecutivo,
                            cuota,
                            id_tercero,
                            id_sucursal_tercero,
                            id_empresa_cruce,
                            id_sucursal_cruce,
                            id_tipo_doc_cruce,
                            numero_cruce,
                            fecha,
                            vencimiento,
                            debito,
                            credito,
                            descripcion,
                            id_vendedor,
                            id_forma_pago,
                            documento_forma_pago,
                            distribucion,
                            trm,
                            id_recaudador,
                            id_suc_recaudador,
                            fecha_trm,
                            total_factura,
                            id_concepto,
                            id_moneda,
                            id_destino,
                            id_proyecto,
                            cuota_cruce,
                            id_banco
                        } = cartera_proveedores_det[j];                    
                        result2 =  await new Carteraproveedores().createCarteraproveedoresdet(id_empresa,id_sucursal,id_tipo_doc,numero,nit,consecutivo,cuota,id_tercero,id_sucursal_tercero,id_empresa_cruce,
                            id_sucursal_cruce,id_tipo_doc_cruce,numero_cruce,fecha,vencimiento,debito,credito,descripcion,id_vendedor,id_forma_pago,
                            documento_forma_pago,distribucion,trm,id_recaudador,id_suc_recaudador,fecha_trm,total_factura,id_concepto,id_moneda,id_destino,
                            id_proyecto,cuota_cruce,id_banco); 
                        if (!result2?.rowCount || result2?.rowCount == 0) { //
                            bandera_hijo = true; // se levanta la bandera
                            break;
                        }
                    }
                }
            }
        }
    }
  
    if (!bandera && !bandera_hijo) { 
        response.data = await new Carteraproveedores().getCarteraproveedores();
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
