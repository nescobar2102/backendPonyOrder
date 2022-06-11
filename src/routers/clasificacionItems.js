const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const ClasificacionItems = require('../controllers/clasificacionItems');

//Listar todos las clasificación items
router.get('/clasificacionItems_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos las clasificación Items';
    let status = 200;
    let clasificacionItems = await new ClasificacionItems().getclasificacionItems();
    if (clasificacionItems.length > 0) {
        response.data = clasificacionItems;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//Listar una clasificación items por descripcion
router.get('/clasificacionItems/:descripcion', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar una clasificación Items por descripción';
    let status = 200;
    let { descripcion } = req.params;
    let clasificacionItems = await new ClasificacionItems().getclasificacionItemsByDesc(descripcion);
    if (clasificacionItems.length > 0) {
        response.data = clasificacionItems;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//sincronizacion de clasificacion Items
router.post('/synchronization_clasificacionItems', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de  clasificación Items';
    let status = 201;
    let bandera = false;
    let bandera_hijo = false;
    const { clasificacionItems } = req.body
    for (var i = 0; i < clasificacionItems.length; i++) {
        if (!bandera_hijo) {
            const { id_clasificacion,
                descripcion,
                id_padre,
                nivel,
                imagen,
                nit,
                subclasificacionItem
            } = clasificacionItems[i];
            result1 = await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, imagen, nit);
            if (!result1?.rowCount || result1?.rowCount == 0) {
                bandera = true;
                break;
            } else {
                if (subclasificacionItem?.length > 0 && result1?.rowCount > 0) {

                    for (var j = 0; j < subclasificacionItem.length; j++) {
                      
                        const { id_clasificacion, descripcion, id_padre, nivel, imagen, nit } = subclasificacionItem[j]
                        result2 = await new ClasificacionItems().createclasificacionItems(id_clasificacion, descripcion, id_padre, nivel, imagen, nit);
                        if (!result2?.rowCount || result2?.rowCount == 0) { //
                            bandera_hijo = true; 
                            break;
                        }
                    }
                }
            }
        }
    }
    if (!bandera && !bandera_hijo) {
        response.data = await new ClasificacionItems().getclasificacionItems();
    } else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la Sincronización de Clasificacion de item';
    }
    res.status(status).json(response)
});
function newResponseJson() {
    return { success: true, msg: "", data: [] };
}
module.exports = router;