const express = require("express");
const router = express.Router();
const MedioContacto = require('../controllers/medioContacto');

// LISTAR TODOS LOS MEDIO DE CONTACTO
router.get('/medioContacto_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todos los Medio Contacto';
    let status = 200;
    let medioContacto = await new MedioContacto().getMedioContacto(); 
    if (medioContacto.length > 0) {
        response.data = medioContacto;
    } else {
     
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.get('/medioContacto/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Medio Contacto  por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req?.params;    
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    } 
    if (! bandera) {
        let medioContacto = await new MedioContacto().getMedioContactoByNit(nit);
        if (medioContacto.length > 0) {
            response.data = medioContacto;
        } else {
            response.success = false;
            response.msg = 'No existen registros.';
        }
    }
    res.status(status).json(response)
});

// CREAR  TODOS
router.post('/synchronization_medioContacto', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de Medio Contacto';
    let status = 201;
    const {medio_contactos } = req.body
    let bandera = false;

    for (var i = 0 ; i < medio_contactos.length; i++) { 
        const {
            nit,
            id_medio_contacto, 
            descripcion
        } =  medio_contactos[i]

        if (nit.trim() == '' || nit == null ||id_medio_contacto.trim() == '' || id_medio_contacto == null || descripcion.trim() == '' || descripcion == null) {
            bandera = true;
            response.success = false;
            response.msg = 'El nit,id_medio_contacto ó descripcion esta vacio';
            status = 400;
            break;        
        }
        exist = await new MedioContacto().getMedioContactoNitId(nit,id_medio_contacto);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Medio de Contacto con el nit: (${nit} y el id_medio_contacto (${id_medio_contacto}) ya existe.)`;
            status = 200;
            break;
        }
        if (!bandera) {
            result = await new MedioContacto().createMedioContacto(nit,id_medio_contacto,descripcion);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear un Medio de contacto: BD  ${result}`;
                status = 500;
                break;
        }    
    }
}
        response.data = await new MedioContacto().getMedioContacto();
        res.status(status).json(response)
    });
    function newResponseJson() {
        return {success: true,msg: "", data: []};
    }   
module.exports = router;