const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const Cuentaportercero = require('../controllers/cuentaportercero');
// listar todos las Cuenta por tercero
router.get('/cuentaportercero_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Cuenta';
    let status = 200;
    let cuentaportercero = await new Cuentaportercero().getCuentaportercero(); 
    if (cuentaportercero.length>0){
        response.data = cuentaportercero;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// listar una Cuenta por nit
router.get('/cuentaportercero/:nit/:tipo_doc', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Cuenta por nit';
    let status = 200;
    let {nit,tipo_doc} = req.params;    
    let cuentaportercero = await new Cuentaportercero().getCuentaporterceroByNit(nit,tipo_doc);
    if (cuentaportercero.length>0){
        response.data = cuentaportercero;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
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
    for (var i=0;i<cuentas_por_terceros.length;i++){ 
        const {nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto } =  cuentas_por_terceros[i]
       result1 = await new Cuentaportercero().createCuentaportercero(nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto); 
          
     console.log('primer insert', result1?.rowCount);
    if (!result1?.rowCount || result1?.rowCount == 0) {
        console.log('no se hizo el insert');
        bandera = true;
        break;        
    }
}
    if (cuentas_por_terceros.length>0 && !bandera){
        response.data = await new Cuentaportercero().getCuentaportercero();
    }
    else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la sincronización de forama de pago';
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