const express = require("express");
const router = express.Router();
const ClasificacionItems = require('../controllers/clasificacionItems');

// Listar todos las clasificación items
router.get('/clasificacionItems_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos las clasificación Items';
    let status = 200;    
    let clasificacionItems = await new ClasificacionItems().getclasificacionItems();
    if (clasificacionItems.length > 0) {
        response.data = clasificacionItems;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
// Listar una clasificación items por descripcion
router.get('/clasificacionItems/:nit/:descripcion', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar una clasificación Items por descripción';
    let status = 200;
    let bandera = false;
    let {descripcion,nit} = req?.params;
    if (descripcion.trim() == '' || descripcion == null || nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit o descripcion esta vacio';
        status = 400;
    }
    if (!bandera) {
        let clasificacionItems = await new ClasificacionItems().getclasificacionItemsByDesc(descripcion,nit);
        if (clasificacionItems.length > 0) {
            response.data = clasificacionItems;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
    }
    res.status(status).json(response)
});
// Listar una clasificación items por id_clasificacion
router.get('/clasificacionItems/:nit/:id_clasificacion', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar una clasificación Items por id_clasificacion';
    let status = 200;
    let {id_clasificacion,nit} = req?.params;
    if (id_clasificacion.trim() == '' || id_clasificacion == null || nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El id_clasificacion o nit esta vacio';
        status = 400;
    }
    if (!bandera) {
        let clasificacionItems = await new ClasificacionItems().getclasificacionItemsById(id_clasificacion,nit);
        if (clasificacionItems.length > 0) {
            response.data = clasificacionItems;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
        }
        res.status(status).json(response)
    }
});
// sincronizacion de clasificacion Items
router.post('/synchronization_clasificacionItems', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de  clasificación Items';
    let status = 201;
    let bandera = false;
    let bandera_hijo = false;
    const {clasificacionItems} = req.body
    for (var i = 0; i < clasificacionItems.length; i++) {
        if (! bandera_hijo) {
            const {
                id_clasificacion,
                descripcion,
                id_padre,
                nivel,
                imagen,
                nit,
                subclasificacionItem
            } = clasificacionItems[i];
           
            if (nit.trim() == '' || nit == null || id_clasificacion.trim() == '' || id_clasificacion == null ) {
               bandera = true;
               response.success = false;
               response.msg = 'El nit, id_clasificacion esta vacio';
               status = 400;
               break;        
           }
           exist =await new ClasificacionItems().getclasificacionItemsById(id_clasificacion,nit);
           if (exist.length > 0) {
               bandera = true;
               response.success = false;
               response.msg = `Con el nit: (${nit}) y el id_clasificacion: ${id_clasificacion}) ya existe en la tabla clasificacion_item`;
               status = 200;
               break;
           } 
           
            result1 = await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, imagen, nit);
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) {
                bandera  = true;  
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar clasificacion_item : BD ${result1}`;
                status = 500;  
                break;
            } else {
                if (subclasificacionItem ?. length > 0 && result1 ?. rowCount > 0) {

                    for (var j = 0; j < subclasificacionItem.length; j++) {

                        const {
                            id_clasificacion,
                            descripcion,
                            id_padre,
                            nivel,
                            imagen,
                            nit
                        } = subclasificacionItem[j]
                        result2 = await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, imagen, nit);
                        if (!result2 ?. rowCount || result2 ?. rowCount == 0) { //
                            bandera_hijo  = true;  
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar subclasificacionItem Hijo: BD ${result2}`;
                            status = 500;  
                            break; 
                        }
                    }
                }
            }
        }
    }
    if (! bandera && ! bandera_hijo) {
        response.data = await new ClasificacionItems().getclasificacionItems();
    }
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
