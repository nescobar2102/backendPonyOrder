const express = require("express");
const router = express.Router();
const Kit = require('../controllers/kit');

router.get('/kit_all', async (req,res) => { 
    let kit = await new Kit().getKit(); 
    res.status(200).json(kit)
});
router.get('/kit/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let kit = await new Kit().getKitByNit(descripcion,nit);
    res.status(200).json(kit)
});
router.post('/synchronization_kit', async (req,res) => {
    const {kits} = req.body
    for (var i=0;i<kits.length;i++){     
        const {nit,id_kit,descripcion,precio_kit,precio_kit_iva,flag_vigencia,fecha_inicial,fecha_final,ultima_actualizacion,kits_det} =  kits[i];
            await new Kit().createKit(nit,id_kit,descripcion,precio_kit,precio_kit_iva,flag_vigencia,fecha_inicial,fecha_final,ultima_actualizacion,kits_det); 
        if (kits_det?.length>0) {  
        console.log('mensaje1');   
            for (var j=0;j<kits_det.length;j++){
        console.log('mensaje 2',id_bodega); 	            
                const {nit,id_kit,id_item,id_bodega,cantidad,tasa_dcto,precio,valor_total,tasa_iva,valor_iva,total,ultima_actualizacion} =  kits_det[j];
                await new Kit().createKitdet(nit,id_kit,id_item,id_bodega,cantidad,tasa_dcto,precio,valor_total,tasa_iva,valor_iva,total,ultima_actualizacion); 
           };
        }
     };     
    let kit_all= await new Kit().getKit();
     res.status(200).json(kit_all)
  
});
module.exports = router;