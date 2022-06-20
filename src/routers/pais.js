const express = require("express");
const router = express.Router();
const Pais = require('../controllers/pais');
// // listar todos los paises
router.get('/pais_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos los paises';
    let status = 200;
    let pais = await new Pais().getPais();
    if (pais.length > 0) {
        response.data = pais;
    } else {
      //  status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// // listar  los paises por nit y nombre
router.get('/pais/:nit/:nombre', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar los paises por País y nombre';
    let status = 200;
    let {nit, nombre} = req.params;
    let pais = await new Pais().getPaisByNit(nit, nombre);
    if (pais.length > 0) {
        response.data = pais;
    } else {
     // status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
// Sincronizacion de pais
router.post('/synchronization_pais', async (req, res) => {
    const response = newResponseJson();   
    let status = 201;
    const {paises} = req.body
    let bandera = false;

    for (var i = 0; i < paises.length; i++) {
        const {
            nit,
            id_pais,
            ie_pais,
            nacionalidad,
            nombre
        } = paises[i]

        if (nit.trim() == '' || id_pais.trim() == '' || ie_pais.trim() == '' || nacionalidad.trim() == '' || nombre.trim() == ''){
            bandera = true;
            response.success = false;
            response.msg = `El nit,id_pais, ie_pais, nacionalidad y nombre no pueden estar vacio`;
            status = 500;
            break;
        } 
        let exist = await new Pais().getPaisNitId(nit,id_pais);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El Pais ya existe con este Nit ${nit}, id_pais: ${id_pais}`;
            status = 500;
            break;
        }
        if (! bandera) { 

            let paises = await new Pais().createPais(nit,id_pais,ie_pais, nacionalidad,nombre);
            if (! paises ?. rowCount || paises ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un erro al insertar un Pais: BD ${paises}`;
                status = 500;
                break;
            } else {  
                response.msg = `Sincronización exitosa.`;
                let insert = await new Pais().getPais(); 
                response.data = insert;
            }
        }
    }
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
