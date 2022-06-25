const express = require("express");
const router = express.Router();
const Item = require('../controllers/item');
// Listar todos items
router.get('/item_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Items y su descuento';
    let status = 200;
    let item = await new Item().getItemAll();
    if (item.length > 0) {
        response.data = item;
    } else {  
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// Listar un item por descripcion y nit
router.get('/item/:descripcion/:nit', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false;
    response.msg = 'Listar un item por Descripcion y Nit';
    let {descripcion, nit} = req.params;
    if (nit.trim() == '' || nit == null || descripcion.trim() == '' || descripcion == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó descripcion esta vacio'; 
        status = 400;
    }
    if (!bandera) {
        let item = await new Item().getItemByNit(descripcion, nit);
        if (item.length > 0) {
            response.data = item;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
// Listar un item por descripcion y nit
router.get('/item/:id_item/:nit', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false;
    response.msg = 'Listar un item por id_item y Nit';
    let {id_item, nit} = req.params;
    if (nit.trim() == '' || nit == null || id_item.trim() == '' || id_item == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó id_item esta vacio'; 
        status = 400;
    }
    if (!bandera) {
        let item = await new Item().getItemByNitID(id_item, nit);
        if (item.length > 0) {
            response.data = item;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
router.delete('/item_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar Items';
    let status = 200; 
    response.data =await new Item().deleteItem();
    res.status(status).json(response)
});
// sincronizacion de item
router.post('/synchronization_item', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de item';
    let status = 201;
    const {items} = req.body
    let bandera = false;
    let bandera_hijo = false; 

    for (var i = 0; i < items.length; i++) { // empieza a recorrer el body que se recibe de post
        if (! bandera_hijo) {
            const {
                nit,
                id_item,
                descripcion,
                referencia,
                id_impuesto,
                tipo_impuesto,
                dcto_producto,
                dcto_maximo,
                flag_serial,
                flag_kit,
                id_clasificacion,
                id_padre_clasificacion,
                id_unidad_compra,
                exento_impuesto,
                flag_existencia,
                flag_dcto_volumen,
                saldo_inventario,
                item_dctos
            } = items[i];
            if (nit.trim() == '' || nit == null || id_item.trim() == '' || id_item == null) {
                bandera = true;
                response.success = false;
                response.msg = 'El nit ó id_item esta vacio';
                status = 400;
                break;
            }
            let tipopago =  await new Item().getItemByNitID(id_item, nit);
            if (tipopago.length > 0) {               
                bandera = true; 
                response.success = false; 
                response.msg = `El Items con el nit ${nit} y  el id_item ${id_item} ya existe`;
                status = 200;
                break;
                } 
            result1 = await new Item().createItem(nit, id_item, descripcion, referencia, id_impuesto, tipo_impuesto, dcto_producto, dcto_maximo, flag_serial, flag_kit, id_clasificacion, id_padre_clasificacion, id_unidad_compra, exento_impuesto, flag_existencia, flag_dcto_volumen, saldo_inventario);
            
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) { // se valida si existe el valor rowCount
                bandera  = true;  
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar un item : BD ${result1}`;
                status = 500;  
                break;
            } else {  
                if (item_dctos ?. length > 0 && result1 ?. rowCount > 0) {  
                  
                    for (var j = 0; j < item_dctos.length; j++) { 
                        const {consecutivo, cantidad_inicial, cantidad_final, tasa_dcto} = item_dctos[j];
                        let itemdtco = await new Item().getItemByNitIDcto(nit,id_item ,consecutivo);
                        if (itemdtco.length > 0) {               
                            bandera = true; 
                            response.success = false; 
                            response.msg = `El Item dcto con el nit ${nit} , el id_item ${id_item} y consecutivo ${consecutivo} ya existe en la tabla item_dcto`;
                            status = 200;
                            break;
                            }  
                        result2 = await new Item().createItemdcto(nit, id_item, consecutivo, cantidad_inicial, cantidad_final, tasa_dcto);
                        if (!result2 ?. rowCount || result2 ?. rowCount == 0) { //
                            bandera_hijo  = true;  
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar un items dcto: BD ${result2}`;
                            status = 500;  
                            break; 
                        }
                    }
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) {      
        response.data =await new Item().getItemAll();   
    }  
    res.status(status).json(response);
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
