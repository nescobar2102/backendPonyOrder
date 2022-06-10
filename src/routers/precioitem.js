const express = require("express");
const router = express.Router();
const PrecioItem = require('../controllers/precioitem');
/////
router.get('/precioitem_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los Precio Item';
    let status = 200;
    let precioitem = await new PrecioItem().getPrecioitem(); 
    if (precioitem.length>0){
        response.data = precioitem;
    } else {
        status= 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/precioitem/:descripcion/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un precio por Nit';
    let status = 200;
    let {descripcion,nit} = req.params;    
    let precioitem = await new PrecioItem().getPrecioitemByNit(descripcion,nit);
    if (precioitem.length > 0){
        response.data = precioitem;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_precio', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Precio Item';
    let status = 201;
    const {precios} = req.body
    let bandera = false;
    let bandera_hijo = false;
    await new PrecioItem().deletePrecioitem(); 
    for (var i=0;i<precios.length;i++){   
        if (!bandera_hijo){             
        const {nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det} =  precios[i];
        result1 = await new PrecioItem().createPrecioitem(nit,id_precio_item,descripcion,vigencia_desde,vigencia_hasta,id_margen_item,id_moneda,flag_iva_incluido,flag_lista_base,flag_mobile,precios_det); 
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
            console.log('no se hizo el inser');
            bandera = true;
            break;        
            } else {  
            if (precios_det?.length > 0 && result1.rowCount > 0) {
                console.log('pasa por el oto insert',result1?.rowCount);
           for (var j=0;j<precios_det.length;j++){ 	            
                const {nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra} =  precios_det[j];
                result2 = await new PrecioItem().createPrecioitemdet(nit,id_precio_item,id_item,precio,descuento_maximo,id_talla,id_moneda,id_unidad_compra); 
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
            let precioitem_all = await new PrecioItem().getPrecioitem();
            response.data = precioitem_all;
        } else { 
            await new PrecioItem().deletePrecioitem();
            response.success = false;
            status = 400;
            response.msg = 'Error en la sincronización de Precio';
            }
            res.status(status).json(response);
 });        
        function newResponseJson() {
            return {success: true, msg: "", data: []};
}         
module.exports = router;