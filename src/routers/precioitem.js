const express = require("express");
const router = express.Router();
const PrecioItem = require('../controllers/precioitem');

router.get('/precioitem_all', async (req,res) => { 
    let precioitem = await new PrecioItem().getPrecioitem(); 
    res.status(200).json(precioitem)
});
router.get('/precioitem/:descripcion/:nit', async (req,res) => {
    let {descripcion,nit} = req.params;    
    let precioitem = await new PrecioItem().getPrecioitemByNit(descripcion,nit);
    res.status(200).json(precioitem)
});
router.post('/synchronization_precio', async (req,res) => {
    const {precios} = req.body
    for (var i=0;i<precios.length;i++){        
        const {nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det} =  precios[i];
            await new PrecioItem().createPrecioitem(nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det); 
           
            for (var j=0;j<precios_det.length;j++){ 	            
                const {nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra} =  precios_det[j];
                await new PrecioItem().createPrecioitemdet(nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra); 
           };
     };     
    let precioitem_all= await new PrecioItem().getPrecioitem();
     res.status(200).json(precioitem_all)
  
});
module.exports = router;