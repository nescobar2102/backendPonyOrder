const express = require("express");
const router = express.Router();
const PrecioItem = require('../controllers/precioitem');

router.get('/precioitem_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Precio Item';
    let status = 200;
    let precioitem = await new PrecioItem().getPrecioitem();
    if (precioitem.length > 0) {
        response.data = precioitem;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/precioitem/:descripcion/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un precio por Nit';
    let status = 200;
    let bandera = false;
    let {descripcion, nit} = req.params;
    if (nit.trim() == '' || nit == null || descripcion.trim() == '' || descripcion == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó descripcion esta vacio';
        status = 400;
    }
    if (! bandera) {
        let precioitem = await new PrecioItem().getPrecioitemByNit(descripcion, nit);
        if (precioitem.length > 0) {
            response.data = precioitem;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});


router.delete('/precioitem_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar Precio';
    let status = 200; 
    response.data = await new PrecioItem().deletePrecioitem();
    res.status(status).json(response)
});

router.post('/synchronization_precio', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Precio Item';
    let status = 201;
    const {precios} = req.body
    let bandera = false;
    let bandera_hijo = false;
   
    for (var i = 0; i < precios.length; i++) {
        if (! bandera_hijo) {
            const {
                nit,
                id_precio_item,
                descripcion,
                vigencia_desde,
                vigencia_hasta,
                id_margen_item,
                id_moneda,
                flag_iva_incluido,
                flag_lista_base,
                flag_mobile,
                precios_det
            } = precios[i];

            if (nit.trim() == '' || nit == null || id_precio_item.trim() == '' || id_precio_item == null || descripcion.trim() == '' || descripcion == null) {
                bandera = true;
                response.success = false;
                response.msg = 'El nit,descripcion ó id_tipo_pago esta vacio';
                status = 400;
                break;
            }
            let precio = await new PrecioItem().getPrecioitemById(nit, id_precio_item);
            if (precio.length > 0) {
                bandera = true;
                response.success = false;
                response.msg = `El  Precio Item con el nit ${nit} y  el id_precio_item ${id_precio_item} ya existe`;
                status = 200;
                break;
            }

            result1 = await new PrecioItem().createPrecioitem(nit, id_precio_item, descripcion, vigencia_desde, vigencia_hasta, id_margen_item, id_moneda, flag_iva_incluido, flag_lista_base, flag_mobile);

            if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar un precio: BD ${result1}`;
                status = 500;
                break;
            } else {
                if (precios_det ?. length > 0 && result1.rowCount > 0) {

                    for (var j = 0; j < precios_det.length; j++) {
                        const {
                            nit,
                            id_precio_item,
                            id_item,
                            precio,
                            descuento_maximo,
                            id_talla,
                            id_moneda,
                            id_unidad_compra
                        } = precios_det[j];

                        let tipopagodet = await new PrecioItem().getPrecioitemByidDet(nit, id_precio_item, id_item);
                        if (tipopagodet.length > 0) {
                            bandera = true;
                            response.success = false;
                            response.msg = `El precio item deatlle   con el nit ${nit} , el id_precio_item ${id_precio_item} y id_item ${id_item} ya existe en la tabla tipo_pagodet`;
                            status = 200;
                            break;
                        }
                        result2 = await new PrecioItem().createPrecioitemdet(nit, id_precio_item, id_item, precio, descuento_maximo, id_talla, id_moneda, id_unidad_compra);
                        if (!result2 ?. rowCount || result2.rowCount == 0) {
                            bandera_hijo = true;
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar un precio item detalle det: BD ${result2}`;
                            status = 500;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) {
        response.data = await new PrecioItem().getPrecioitem();
    }
    res.status(status).json(response);
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
