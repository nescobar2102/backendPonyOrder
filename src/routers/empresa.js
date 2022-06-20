const express = require("express");
const router = express.Router();
const Empresa = require('../controllers/empresa');


// listar los empresa
router.get('/empresa_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas las Empresa';
    let status = 200;
    let empresa = await new Empresa().getEmpresa();
    if (empresa.length > 0) {
        response.data = empresa;
    } else {
        response.success = false;
        response.msg = 'No se encontraron registros.';
    }
    res.status(status).json(response)
});
// listar una nueva empresa por Nit
router.get('/empresa/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar las Empresa por Nit';
    let status = 200;
    let {nit} = req.params;
 
    if (nit ?. trim() == '' || nit == null) {
        response.success = false;
        response.msg = 'El nit  esta vacío';
        status = 400;
    } else {
        let empresa = await new Empresa().getEmpresaNit(nit);
        if (empresa.length > 0) {
            response.data = empresa;
        } else {
            response.success = false;
            response.msg = `No se encontró la empresa con el nit:(${nit})`;
        }
    }
    res.status(status).json(response)
});

// Create una empresa.
router.post('/empresa', async (req, res) => { // require mas campos para la creacion
    const response = newResponseJson();
    response.msg = 'Crear una Empresa';
    let status = 201;
    const {nit, dv, razon_social, correo_electronico,id_tipo_empresa} = req.body
    let bandera = false;
    if (nit ?. trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit  esta vacío';
        status = 400;
    }
    let exist = await new Empresa().getEmpresaNit(nit);
    if (exist.length > 0) {
        bandera = true;
        response.success = false;
        response.msg = `La empresa con el nit ${nit} ya existe.`;
        status = 200;
    }
    if (!bandera) {
        let result = await new Empresa().createEmpresaUnica(nit, dv, razon_social, correo_electronico,id_tipo_empresa);
        if (! result ?. rowCount || result ?. rowCount == 0) {
            response.success = false;
            response.msg = `Ha ocurrido un error al intentar crear la empresa:  BD ${result}`;
            status = 500;
        } else {
           response.data = await new Empresa().getEmpresaNit(nit);
        }
    }
    res.status(status).json(response)
});

// Update a todo.
router.put('/empresa/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar una Empresa por Nit';
    let status = 200;
    const nit = parseInt(req.params.nit)
    const {razon_social, correo_electronico} = req.body 

    if (nit ?. trim() == '' || nit == null) {
        response.success = false;
        response.msg = 'El nit  esta vacío';
        status = 400;
    } else {
        let exist = await new Empresa().getEmpresaNit(nit);
        if (exist.length > 0) {
                let empresa = await new Empresa().updateEmpresa(nit, razon_social, correo_electronico);
                if (empresa ?. rowCount && empresa.rowCount > 0) {
                    response.msg = `Se actualizó  la empresa nit: (${nit})`;
                }
                 else {
                    response.success = false;
                    status = 500;
                    response.msg = `Ha ocurrido un error en la actualización:  BD ${empresa}`;
                }
        }else {
            response.success = false;
            status = 200;
            response.msg = `La empresa no existe con el nit ( ${nit})`;
        }
    }
    res.status(status).json(response)
});
// Update a todo.
router.put('/empresa/status/:nit', async (req, res) => {
    const response = newResponseJson();
    const nit = req.params.nit
    const {estado} = req.body
    let status = 200;

    if (nit ?. trim() == '' || nit == null || estado ?. trim() == '' || estado == null) {
        response.success = false;
        response.msg = 'El nit ó estado están vacíos';
        status = 400;

    } else {
        let exist = await new Empresa().getEmpresaNit(nit);
        if (exist.length > 0) {
            let empresa = await new Empresa().updateEmpresaStatus(nit, estado);
            if (empresa ?. rowCount && empresa.rowCount > 0) {
                response.msg = `Se actualizó el estado de la empresa nit: (${nit}) `
            } else {
                response.success = false;
                status = 500;
                response.msg = `Ha ocurrido un error en la actualizacion:  BD ${empresa}`;
            }
        } else {
            response.success = false;
            status = 200;
            response.msg = `La empresa no existe con el nit ( ${nit})`;
        }

    }

    res.status(status).json(response);
});

// Sincronizacion
router.post('/synchronization_empresa', async (req, res) => {
    const response = newResponseJson();
    let status = 201;
    const {empresas} = req.body
    let bandera = false;
    for (var i = 0; i < empresas.length; i++) {

        const {
            nit,
            razon_social,
            id_tipo_empresa,
            pre_actividad_economica,
            pre_cuenta,
            pre_medio_contacto,
            id_moneda,
            direccion,
            telefono,
            dv,
            fax,
            id_pais,
            id_depto,
            id_ciudad,
            regimen_tributario,
            flag_iva,
            flag_forma_pago_efectivo,
            correo_electronico,
            id_empresa
        } = empresas[i]

        if (nit.trim() == '' || nit == null || razon_social.trim() == '' || razon_social == null || id_tipo_empresa.trim() == '' || correo_electronico.trim() == '' || correo_electronico == null) {
            bandera = true;
            response.success = false;
            response.msg = 'El nit,razon_social,id_tipo_empresa o correo_electronico están vacíos';
            status = 400;
            break;
        }
        exist = await new Empresa().getEmpresaNit(nit);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `La empresa con el nit: (${nit}) ya existe.`;
            status = 200;
            break;
        }

        if (! bandera) {
            result = await new Empresa().createEmpresa(nit, razon_social, id_tipo_empresa, pre_actividad_economica, pre_cuenta, pre_medio_contacto, id_moneda, direccion, telefono, dv, fax, id_pais, id_depto, id_ciudad, regimen_tributario, flag_iva, flag_forma_pago_efectivo, correo_electronico, id_empresa);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear la empresa:  BD ${result}`;
                status = 500;
                break;
            } else {
                response.data = await new Empresa().getEmpresaNit(nit);
                response.msg = `Sincronizacion de empresa existosa.`;
            }
        }
    }

    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
