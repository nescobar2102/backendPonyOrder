const express = require("express");
const router = express.Router();
const Tipopago = require('../controllers/tipopago');

router.get('/tipopago_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los Tipo de pago';
    let status = 200;
    let tipopago = await new Tipopago().getTipopago(); 
    if (tipopago.length > 0) {
        response.data = tipopago;
    }
    else {
        status= 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/tipopago/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    let status = 200;
    response.msg = 'Listar un tipo de pago por Descripcion y Nit';
    let {nit,descripcion} = req.params;    
    let tipopago = await new Tipopago().getTipopagoByDesc(nit,descripcion);
    if (tipopago.length > 0) {
        response.data = tipopago;
    }
    else {
        status= 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_tipopago', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tipo pago';
    let status = 201;
    const {tipopagos} = req.body
    let bandera = false;
    let bandera_hijo = false;
    await new Tipopago().deleteTipopago(); 
    for (var i=0;i<tipopagos.length;i++){     
        if (!bandera_hijo) {   
        const {id_tipo_pago, descripcion, nit,tipopagosdet} =  tipopagos[i];
           result1 = await new Tipopago().createTipopago(id_tipo_pago, descripcion, nit); 
           
           console.log('primer insert', result1?.rowCount);
           if (!result1?.rowCount || result1?.rowCount == 0) { 
            console.log('entra al falase'); 
            bandera = true;     
            break;
        } else {
            if (tipopagosdet?.length > 0 && result1?.rowCount > 0) { 
                console.log('pasa por el dto insert', result1?.rowCount);
            
                for (var j=0;j<tipopagosdet.length;j++){ 	            
                const {nit,id_tipo_pago,id_auxiliar,cuota,clase} =  tipopagosdet[j];
                result2 = await new Tipopago().createTipopagodet(nit,id_tipo_pago,id_auxiliar,cuota,clase); 
                
                if (!result2?.rowCount || result2?.rowCount == 0) {                                         bandera_hijo = true;    
                    break;
                }
            }
        }
    }
 }
}  
if (!bandera && !bandera_hijo) { //no se levanto la bandera (false)
    let tipopago_all = await new Tipopago().getTipopago();
    response.data = tipopago_all;
} 
else 
{ 
    await new Tipopago().deleteTipopago();
    response.success = false;
    status = 400;
    response.msg = 'Error en la  sincronización de tipo de pago';
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