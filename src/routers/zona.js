const express = require("express");
const router = express.Router();
const Zona = require('../controllers/zona');

// listar Zona
router.get('/zona_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Zonas';
    let status = 200;
    let zona = await new Zona().getZona(); 
    if (zona.length > 0) {
        response.data = zona;
    } else {
       
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/zona/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar la Zona por Nit';
    let status = 200;
    bandera = false;
    let {nit} = req?.params;      
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    }
    if (! bandera) {
        let zona = await new Zona().getZonaByNit(nit);
        if (zona.length > 0) {
            response.data = zona;
        } else {
            response.success = false;
            response.msg = 'No existe registros';
        }
    }    
    res.status(status).json(response)
});

// Create a todo.
router.post('/synchronization_zona', async (req,res) => {
    const response = newResponseJson(); 
    response.msg = 'Sincronización de Zonas';  
    let status = 201;
    const {zonas} = req.body
    let bandera = false;

    for (var i = 0 ; i < zonas.length; i++) { 
        const {
            nit,
            id_zona,
            descripcion, 
            id_padre, 
            nivel, 
            es_padre
        } =  zonas[i]

        if (nit.trim() == '' || nit == null || id_zona.trim() == '' || id_zona == null || descripcion.trim() == '' || descripcion == null || id_padre.trim() == '' || id_padre == null || nivel.trim() == '' || nivel == null || es_padre.trim() == '' || es_padre == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit, id_zona, descripcion, id_padre, nivel ó es_padre esta vacio';
        status = 400;
        break; 
    
    }        
        exist = await new Zona().getZonaNitId(nit,id_zona);  
            if (exist.length > 0) {
                bandera = true;
                response.success = false;
                response.msg = `La Zona ya existe con ese Nit: (${nit}) y id_zona: (${id_zona}) ya existe.`;
                status = 200;
                break;
            }
            if (!bandera) {
                result = await new Zona().createZona(nit,id_zona,descripcion,id_padre,nivel,es_padre);
                if (!result ?. rowCount || result ?. rowCount == 0) {
                    bandera = true;
                    response.success = false;
                    response.msg = `Ha ocurrido un error al intentar crear una Zona: BD ${result}`;
                    status = 500;
                    break;  
        }
    }
}
    response.data = await new Zona().getZona();
    res.status(status).json(response)         
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;