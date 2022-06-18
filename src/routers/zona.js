const express = require("express");
const router = express.Router();
const Zona = require('../controllers/zona');

router.get('/zona_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las zonas';
    let status = 200;
    let zona = await new Zona().getZona(); 
    if (zona.length > 0) {
        response.data = zona;
    } else {
       // status = 404;
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
    if (zona.length > 0) {
        response.data = zona;
    } else {
      //  status = 404;
        response.success = false;
        response.mg = 'No existen registros';  
    }
    res.status(status).json(response)
});

router.post('/synchronization_zona', async (req,res) => {
    const response = newResponseJson();   
    let status = 201;
    const {zonas } = req.body
    let bandera = false;
    for (var i =0 ; i < zonas.length; i++) { 
        const {
            id_zona,
            descripcion, 
            id_padre, 
            nivel, 
            es_padre, 
            nit
        } =  zonas[i]

        if (nit =='' || id_zona =='' || descripcion =='' || id_padre =='' || nivel =='' || es_padre == '') {
        bandera = true;
        response.success = false;
        response.msg = 'El Nit, id_zona, descripcion, id_padre, nivel y es_padre no pueden estar vacio';
        status = 500;
        break; 
        }        
        let exist = await new Zona().getZonaNitId(nit,id_zona);  
            if (exist.length > 0){
                bandera = true;
                response.success = false;
                response.msg = `La Zona ya existe con ese Nit: ${nit} y id_zona: ${id_zona}`;
                status = 500;
                break;
            }
            if (!bandera){
                let zonas = await new Zona().createZona(id_zona,descripcion,id_padre,nivel,es_padre,nit);
                if (zonas ?.rowCount || zonas ?. rowCount == 0) {
                    bandera = true;
                    response.success = false;
                    response.msg = `Ha ocurrido un error en el insert de una Zona: BD ${zonas}`;
                    status=500;
                    break;                                    
            } else{
                response.msg =  `Se ha creado una Zona, con el Nit ${zonas} - ${descripcion}`;
                let insert = await new Zona().createZona(nit);
                response.data = insert;
            }
        }
 }    
    res.status(status).json(response)         
});
function newResponseJson() {
    return {success: true, msg: "", data: [],};
}
module.exports = router;