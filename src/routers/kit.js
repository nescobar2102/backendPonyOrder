const express = require("express");
const router = express.Router();
const Kit = require('../controllers/kit');

router.get('/kit_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los Kits';
    let status = 200;
    let kit = await new Kit().getKit();
    if (kit.length > 0) {
        response.data = kit;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.get('/kit/:descripcion/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Kits por Nit';
    let status = 200;
    let bandera = false;
    let {descripcion, nit} = req.params;
    if (nit.trim() == '' || nit == null || descripcion.trim() == '' || descripcion == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó descripcion esta vacio';       
        status = 400;
    }
    if (!bandera) {
        let kit = await new Kit().getKitByNit(descripcion, nit);
        if (kit.length > 0) {
            response.data = kit;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
router.get('/kit/:id_kit/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Kits por id_kit';
    let status = 200;
    let bandera = false;
    let {id_kit, nit} = req.params;
    if (nit.trim() == '' || nit == null || id_kit.trim() == '' || id_kit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit ó id_kit esta vacio';       
        status = 400;
    }
    if (!bandera) {
        let kit = await new Kit().getKitById(id_kit, nit);
        if (kit.length > 0) {
            response.data = kit;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
router.delete('/kit_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar Kit y detalle';
    let status = 200; 
    response.data =  await new Kit().deleteKit();
    res.status(status).json(response)
});
router.post('/synchronization_kit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Kit';
    let status = 201;
    let bandera = false;
    let bandera_hijo = false;
    const {kits} = req.body
    for (var i = 0; i < kits.length; i++) {
        if (! bandera_hijo) {
            const {
                nit,
                id_kit,
                descripcion,
                precio_kit,
                precio_kit_iva,
                flag_vigencia,
                fecha_inicial,
                fecha_final,
                ultima_actualizacion,
                kits_det
            } = kits[i];
            if (nit.trim() == '' || nit == null || id_kit.trim() == '' || id_kit == null) {
                bandera = true;
                response.success = false;
                response.msg = 'El nit ó id_kit esta vacio';
                status = 400;
                break;
            }
            let kit =  await new Kit().getKitById(id_kit, nit);
            if (kit.length > 0) {               
                bandera = true; 
                response.success = false; 
                response.msg = `El kit con el nit ${nit} y  el id_kit ${id_kit} ya existe`;
                status = 200;
                break;
                } 

            result1 = await new Kit().createKit(nit, id_kit, descripcion, precio_kit, precio_kit_iva, flag_vigencia, fecha_inicial, fecha_final, ultima_actualizacion);
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) { // se valida si existe el valor rowCount
                bandera  = true;  
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar kit: BD ${result1}`;
                status = 500;  
                break;
            } else { 
                if (kits_det ?. length > 0 && result1 ?. rowCount > 0) {

                    for (var j = 0; j < kits_det.length; j++) {
                        const {
                            nit,
                            id_kit,
                            id_item,
                            id_bodega,
                            cantidad,
                            tasa_dcto,
                            precio,
                            valor_total,
                            tasa_iva,
                            valor_iva,
                            total,
                            ultima_actualizacion
                        } = kits_det[j];
                        result2 = await new Kit().createKitdet(nit, id_kit, id_item, id_bodega, cantidad, tasa_dcto, precio, valor_total, tasa_iva, valor_iva, total, ultima_actualizacion);

                        if (!result2 ?. rowCount || result2 ?. rowCount == 0) { //
                            bandera_hijo  = true;  
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar un kit detalle: BD ${result2}`;
                            status = 500;  
                            break; 
                        }
                    };
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) { // no se levanto la bandera (false)
        response.data = await new Kit().getKit();
    }
    res.status(status).json(response);
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
