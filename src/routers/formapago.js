const express = require("express");
const router = express.Router();
const Formapago = require('../controllers/formapago');
// Listar todas las forma de pago 
router.get('/formapago_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las forma de pago';
    let status = 200;
    let formapago = await new Formapago().getFormapago(); 
    if (formapago.length>0){
        response.data = formapago;
    }
    else {
        status= 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// Listar una forma de pago por Nit
router.get('/formapago/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una forma de pago por Nit';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let formapago = await new Formapago().getFormapagoByNit(nit,descripcion);
    if (formapago.length > 0){
        response.data = formapago;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// sincronizacion de forma pago
router.post('/synchronization_formapago', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de forma pago';
    let status = 201;
    const {forma_pago} = req.body
    let bandera = false;
    let bandera_hijo = false;
   // await new Formapago().deleteformapago();
    for (var i=0;i<forma_pago.length;i++){       
        if (!bandera_hijo){        
        const {nit,descripcion,id_precio_item,id_forma_pago,forma_pagodet} =  forma_pago[i]
            result1 = await new Formapago().createFormapago(nit,descripcion,id_precio_item,id_forma_pago);            
    console.log('primer insert', result1?.rowCount);
    if (!result1?.rowCount || result1?.rowCount == 0) {
        console.log('no se hizo el inser');
        bandera = true;
        break;        
        } else {  
        if (forma_pagodet?.length > 0 && result1.rowCount > 0) {
           console.log('pasa por el oto insert',result1?.rowCount); 
            for (var j=0;j<forma_pagodet.length;j++){ 	            
        const {cuota,dias,tasa,clase,descripcion_detalle,flag_activo} =  forma_pagodet[j]
            result2 = await new Formapago().createFormapagodet(nit,id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo); 
            if (!result2?.rowCount || result2.rowCount == 0){
            bandera_hijo = true;
            break; 
            }
           } 
     }
  }
} 
}
if (!bandera && !bandera_hijo) { 
    let formapago_all = await new Formapago().getFormapago();
    response.data = formapago_all;
} else { 
   // await new Formapago().deleteformapago();
    response.success = false;
    status = 400;
    response.msg = 'Error en la sincronización de forama de pago';
    }
    res.status(status).json(response);
});

function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
} 
module.exports = router;