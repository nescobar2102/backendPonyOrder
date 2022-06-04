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
    }
    else {
        status= 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// Listar un item por descripcion y nit
router.get('/item/:descripcion/:nit', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    response.msg = 'Listar un item por Descripcion y Nit';
    let { descripcion, nit } = req.params;
    let item = await new Item().getItemByNit(descripcion, nit);
    if (item.length > 0) {
        response.data = item;
    }
    else {
        status= 404;
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// sincronizacion de item
router.post('/synchronization_item', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de item';
    let status = 201;
    const { items } = req.body
    let bandera = false;
    let bandera_hijo = false;
    await new Item().deleteItem(); //se borra toda la data de ambas tablas

        for (var i = 0; i < items.length; i++) { //empieza a recorrer el body que se recibe de post
            if (!bandera_hijo) {
            const { nit, id_item, descripcion, referencia, id_impuesto, tipo_impuesto, dcto_producto, dcto_maximo, flag_serial, flag_kit, id_clasificacion, id_padre_clasificacion, id_unidad_compra, exento_impuesto, flag_existencia, flag_dcto_volumen, saldo_inventario, item_dctos } = items[i];
            //se mandan insertar en la tabla item el maestro padre
            result1 = await new Item().createItem(nit, id_item, descripcion, referencia, id_impuesto, tipo_impuesto, dcto_producto, dcto_maximo, flag_serial, flag_kit, id_clasificacion, id_padre_clasificacion, id_unidad_compra, exento_impuesto, flag_existencia, flag_dcto_volumen, saldo_inventario, item_dctos);
            //result1 recibe el valor del insert  maestro padre
            console.log('primer insert', result1?.rowCount);
            if (!result1?.rowCount || result1?.rowCount == 0) { //se valida si existe el valor rowCount  
                console.log('entra al falase'); //se se realizo el insert
                bandera = true;   //se levanta la bandera    
                break;
            } else {
                //realizo el insert maestro
                if (item_dctos?.length > 0 && result1?.rowCount > 0) { // se valida q se tengan datos para el segn insert y se haya realizado el primer insert
                    console.log('pasa por el dto insert', result1?.rowCount);
                    for (var j = 0; j < item_dctos.length; j++) { //recoger los datos para el segund insert
                        const { consecutivo, cantidad_inicial, cantidad_final, tasa_dcto } = item_dctos[j];
                        //insert 2;  result2 el valor del insert detalle  (item_dctos)
                        result2 = await new Item().createItemdcto(nit, id_item, consecutivo, cantidad_inicial, cantidad_final, tasa_dcto);
                        if (!result2?.rowCount || result2?.rowCount == 0) { //
                            bandera_hijo = true;    //se levanta la bandera  
                            break;
                        }
                    }
                }
            }
        }
    }
    if (!bandera && !bandera_hijo) { //no se levanto la bandera (false)
        let item_all = await new Item().getItemAll();
        response.data = item_all;
    } else { //bandera ( true)
        await new Item().deleteItem();
        response.success = false;
        status = 400;
        response.msg = 'Error en la  sincronización de item';
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