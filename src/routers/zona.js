const express = require("express");
const router = express.Router();
const Zona = require('../controllers/zona');

router.get('/zona_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las zona';
    let status = 200;
    let zona = await new Zona().getZona(); 
    if (zona.length>0){
        response.data = zona;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/zona/:nit/:descripcion', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar las zona por Nit y descripcion';
    let status = 200;
    let {nit,descripcion} = req.params;    
    let zona = await new Zona().getZonaByDesc(nit,descripcion);
    if (zona.length>0){
        response.data = zona;
    }
    else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';  
    }
    res.status(status).json(response)
});

router.post('/synchronization_zona', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de zona';
    let status = 201;
    const {zonas } = req.body
    let bandera = false;
    for (var i=0;i<zonas.length;i++){ 
        const {id_zona , descripcion, id_padre, nivel, es_padre, nit} =  zonas[i]
        result1 = await new Zona().createZona(id_zona , descripcion, id_padre, nivel, es_padre, nit ); 
        
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
        console.log('no se hizo el insert');
        bandera = true;
        break;        
        }
    }
        if (zonas.length>0 && !bandera){
        response.data = await new Zona().getZona();
    }
    else {
        response.success = false;
        status = 400;
        response.msg = 'Error en la sincronización de zona';
    }
    res.status(200).json(response)         
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;