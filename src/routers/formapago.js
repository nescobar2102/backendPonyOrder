const express = require("express");
const router = express.Router();
const Formapago = require('../controllers/formapago');
// Listar todas las forma de pago 
router.get('/formapago_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las forma de pago';
    let formapago = await new Formapago().getFormapago(); 
    if (formapago.length>0){
        response.data = formapago;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// Listar una forma de pago por Nit
router.get('/formapago/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una forma de pago por Nit';
    let {nit} = req.params;    
    let formapago = await new Formapago().getFormapagoByNit(nit);
    if (formapago.length>0){
        response.data = formapago;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// sincronizacion de forma pago
router.post('/synchronization_formapago', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de forma pago';
    const {forma_pago} = req.body
    for (var i=0;i<forma_pago.length;i++){        
        const {nit,descripcion,id_precio_item,id_forma_pago,forma_pagodet} =  forma_pago[i]
            await new Formapago().createFormapago(nit,descripcion,id_precio_item,id_forma_pago);            
    for (var j=0;j<forma_pagodet.length;j++){ 	            
        const {cuota,dias,tasa,clase,descripcion_detalle,flag_activo} =  forma_pagodet[j]
            await new Formapago().createFormapagodet(nit,id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo); 
         };
     };  
     if (forma_pagodet.length>0){
        response.data = forma_pagodet;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)  
    let formapago_all= await new Formapago().getFormapago();
     res.status(200).json(formapago_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
} 
module.exports = router;