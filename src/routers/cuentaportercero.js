const express = require("express"); 
const router = express.Router();
const Cuentaportercero = require('../controllers/cuentaportercero');

// listar todos las Cuenta por tercero
router.get('/cuentaportercero_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Cuentas';
    let status = 200;
    let cuentaportercero = await new Cuentaportercero().getCuentaportercero(); 
    
    if (cuentaportercero.length > 0) {
        response.data = cuentaportercero;
    } else {     
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar una Cuenta por nit
router.get('/cuentaportercero/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Cuenta por nit';
    let status = 200;
    let bandera = false;

    let {nit} = req?.params;  
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit  esta vacio';
        status = 400;
    }
    
    if (! bandera) {
        let cuentaportercero = await new Cuentaportercero().getCuentaporterceroByNit(nit);
        if (cuentaportercero.length > 0) {
            response.data = cuentaportercero;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
//Sincronización de cuenta por tercero
router.post('/synchronization_cuentaportercero', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de cuenta por tercero';
    let status = 201;
    const {cuentas_por_terceros} = req.body
    let bandera = false;
 
    for (var i = 0; i < cuentas_por_terceros.length; i++) { 
        const {
            nit,
            id_empresa,
            id_sucursal,
            tipo_doc,
            numero,
            cuota,
            dias,
            id_tercero,
            id_vendedor,
            id_sucursal_tercero,
            fecha,
            vencimiento,
            credito,
            dctomax,
            cuota_cruce,
            debito,
            id_destino,
            id_proyecto 
        } =  cuentas_por_terceros[i]
      
        if (nit.trim() == '' || nit == null ||
        id_empresa.trim() == '' || id_empresa == null ||
        id_sucursal.trim() == '' || id_sucursal == null ||
        tipo_doc.trim() == '' || tipo_doc == null ||
        numero.trim() == '' || numero == null ||
        cuota.trim() == '' || cuota == null ||
        dias.trim() == '' || dias == null ||
        id_tercero.trim() == '' || id_tercero == null ||
        id_vendedor.trim() == '' || id_vendedor == null ||
        id_sucursal_tercero.trim() == '' || id_sucursal_tercero == null ||
        fecha.trim() == '' || fecha == null ||
        vencimiento.trim() == '' || vencimiento == null ||
        credito.trim() == '' || credito == null ||
        dctomax.trim() == '' || dctomax == null ||
        cuota_cruce.trim() == '' || cuota_cruce == null ||
        debito.trim() == '' || debito == null ||
        id_destino.trim() == '' || id_destino == null ||
        id_proyecto.trim() == '' || id_proyecto == null) {
            bandera = true;
            response.success = false;
            response.msg = 'El nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino ó id_proyecto esta vacio';
            status = 400;
            break;
        }
        exist = await   new Cuentaportercero().getCuentaporterceroNitId(nit,numero);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `La Cuenta por tercero con el nit: (${nit}) y el numero (${numero})  ya existe.`;
            status = 200;
            break;
        }
        if(!bandera){
            result = await new Cuentaportercero().createCuentaportercero(nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear una Cuenta por tercero:  BD ${result}`;
                status = 500;
                break;
            }
          }
    }

    response.data = await new Cuentaportercero().getCuentaportercero();
     res.status(status).json(response)  
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;