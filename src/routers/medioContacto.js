const express = require("express");
const router = express.Router();
const MedioContacto = require('../controllers/medioContacto');

router.get('/medioContacto_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los medio Contacto';
    let status = 200;
    let medioContacto = await new MedioContacto().getMedioContacto(); 
    if (medioContacto.length>0){
        response.data = medioContacto;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/medioContacto/:descripcion/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un medio Contacto Nit y descripcion';
    let status = 200;
    let {descripcion,nit} = req.params;    
    let medioContacto = await new MedioContacto().getMedioContactoByDesc(descripcion,nit);
    if (medioContacto.length>0){
        response.data = medioContacto;
    } else {
        status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/synchronization_medioContacto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Medio Contacto';
    let status = 201;
    const {medio_contacto } = req.body
    let bandera = false;
    for (var i=0;i<medio_contacto.length;i++){ 
        const {id_medio_contacto, descripcion, nit } =  medio_contacto[i]
        result1  = await new MedioContacto().createMedioContacto(id_medio_contacto, descripcion, nit ); 
          
        console.log('primer insert', result1?.rowCount);
        if (!result1?.rowCount || result1?.rowCount == 0) {
            console.log('no se hizo el insert');
            bandera = true;
            break;        
        }
    }
        if (medio_contacto.length>0 && !bandera){
            response.data = await new MedioContacto().getMedioContacto();
        }
        else {
            response.success = false;
            status = 400;
            response.msg = 'Error en la sincronización de Medio Contacto';
    
        }
        res.status(status).json(response)
    });
    function newResponseJson() {
        return {success: true,msg: "", data: []};
    }   
module.exports = router;