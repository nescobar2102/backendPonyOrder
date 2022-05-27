const express = require("express");
const router = express.Router();
const Formapago = require('../controllers/formapago');

router.get('/formapago_all', async (req,res) => { 
    let formapago = await new Formapago().getFormapago(); 
    res.status(200).json(formapago)
});

router.get('/formapago/:nit', async (req,res) => {
    let {nit} = req.params;    
    let formapago = await new Formapago().getFormapagoByNit(nit);
    res.status(200).json(formapago)
});

router.post('/synchronization_formapago', async (req,res) => {
    const {forma_pago} = req.body
    for (var i=0;i<forma_pago.length;i++){ 
        console.log("------categ" ,  forma_pago[i])
        const {nit,descripcion,id_precio_item,id_forma_pago,forma_pagodet} =  forma_pago[i]
            await new Formapago().createFormapago(nit,descripcion,id_precio_item,id_forma_pago); 
           
            for (var j=0;j<forma_pagodet.length;j++){ 	 
            console.log("------subFormapago-------------" ,  forma_pagodet[j])
                const {cuota,dias,tasa,clase,descripcion_detalle,flag_activo} =  forma_pagodet[j]
                        await new Formapago().createFormapagodet(nit,id_forma_pago,cuota,dias,tasa,clase,descripcion_detalle,flag_activo); 
                };
     };     
    let formapago_all= await new Formapago().getFormapago();
     res.status(200).json(formapago_all)
  
});
module.exports = router;