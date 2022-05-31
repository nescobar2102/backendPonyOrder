const express = require("express");
const router = express.Router();
const Item = require('../controllers/item');

router.get('/item_all', async (req,res) => { 
    let item = await new Item().getItem(); 
    res.status(200).json(item)
});
router.get('/item/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let item = await new Item().getItemBy(descripcion,nit);
    res.status(200).json(item)
});
router.post('/synchronization_item', async (req,res) => {
    const {items} = req.body
    for (var i=0;i<items.length;i++){        
        const {nit,id_item,descripcion,referencia,id_impuesto,tipo_impuesto,dcto_producto,dcto_maximo,flag_serial,flag_kit,id_clasificacion,id_padre_clasificacion,id_unidad_compra,exento_impuesto,flag_existencia,flag_dcto_volumen,saldo_inventario,item_dctos} =  items[i];
        console.log ('hola',flag_existencia);    
        await new Item().createItem(nit,id_item,descripcion,referencia,id_impuesto,tipo_impuesto,dcto_producto,dcto_maximo,flag_serial,flag_kit,id_clasificacion,id_padre_clasificacion,id_unidad_compra,exento_impuesto,flag_existencia,flag_dcto_volumen,saldo_inventario,item_dctos);   
        if (item_dctos?.length>0){       
            for (var j=0;j<item_dctos.length;j++){ 	            
                const {consecutivo,cantidad_inicial,cantidad_final,tasa_dcto} =  item_dctos[j];
                await new Item().createItemdcto(nit,id_item,consecutivo,cantidad_inicial,cantidad_final,tasa_dcto); 
           };
        }
     };     
    let item_all= await new Item().getItem();
     res.status(200).json(item_all)
  
});
module.exports = router;