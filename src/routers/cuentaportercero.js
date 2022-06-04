const express = require("express");
const router = express.Router();
const Cuentaportercero = require('../controllers/cuentaportercero');
// listar todos las Cuenta por tercero
router.get('/cuentaportercero_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Cuenta';
    let cuentaportercero = await new Cuentaportercero().getCuentaportercero(); 
    if (cuentaportercero.length>0){
        response.data = cuentaportercero;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// listar una Cuenta por nit
router.get('/cuentaportercero/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Cuenta por nit';
    let {nit} = req.params;    
    let cuentaportercero = await new Cuentaportercero().getCuentaporterceroByNit(nit);
    if (cuentaportercero.length>0){
        response.data = cuentaportercero;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//Sincronización de cuenta por tercero
router.post('/synchronization_cuentaportercero', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de cuenta por tercero';
    const {cuentas_por_terceros} = req.body
    for (var i=0;i<cuentas_por_terceros.length;i++){ 
        const {nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto } =  cuentas_por_terceros[i]
        await new Cuentaportercero().createCuentaportercero(nit,id_empresa,id_sucursal,tipo_doc,numero,cuota,dias,id_tercero,id_vendedor,id_sucursal_tercero,fecha,vencimiento,credito,dctomax,cuota_cruce,debito,id_destino,id_proyecto); 
     };     
    if (cuentas_por_terceros.length>0){
        response.data = cuentas_por_terceros;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    let cuentaportercero_all= await new Cuentaportercero().getCuentaportercero();
    res.status(200).json(cuentaportercero_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;