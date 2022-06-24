const express = require("express");
const router = express.Router();
const Usuario = require('../controllers/usuario');

// listar los usuarios
router.get('/users_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listado de Usuarios';
    let status = 200;
    let usuarios = await new Usuario().getUsers();
    if (usuarios.length > 0) {
        response.data = usuarios;
    } else {
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

// listar un nuevo usuario por Nit
router.get('/users/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Usuario por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req?.params;
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    } 
    if (!bandera) {
        let usuarios = await new Usuario().getUserByNit(nit);
        if (usuarios.length > 0) {
            response.data = usuarios;
        } else {
            response.success =false;
            response.msg = 'No existe registros.';
        }
    }
    res.status(status).json(response)
});

// Create un usuario.
router.post('/users', async (req, res) => {
    const response = newResponseJson();
    let status = 201;
    let bandera = false; 
 
    const {
        nit,
        correo_electronico,
        usuario,
        nombre,
        flag_activo,
        clave,
        flag_cambia_fp,
        flag_cambia_lp,
        flag_edita_cliente,
        flag_edita_dcto,
        id_tipo_doc_pe,
        id_tipo_doc_rc,
        id_bodega,
        edita_consecutivo_rc,
        edita_fecha_rc
    } = req.body

    if(nit==""){ 
        bandera = true;
        response.success = false;
        response.msg = 'El nit no puede estar vacio';
        status = 500;
    }
    exist =  await new Usuario().getUserByNit(nit); 
    if(exist.length>0){
        bandera = true;
        response.success = false;
        response.msg = `El usuario  con el nit ${nit} ya existe`;
        status = 500;
    }
    if (!bandera){
        let usuarios = await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave, flag_cambia_fp,
            flag_cambia_lp, flag_edita_cliente, flag_edita_dcto, id_tipo_doc_pe, id_tipo_doc_rc, id_bodega, edita_consecutivo_rc, edita_fecha_rc);
       
            if (! usuarios ?. rowCount || usuarios ?. rowCount == 0) {
                response.success = false;
                response.msg = ` Ha ocurrido un error al intentar crear un usuario:  BD ${usuarios}`;
                status = 500;

        } else {
                response.msg = `Se ha creado el usuario, con el nit  ${usuario} - ${nombre}`;
                let usuario_insert = await new Usuario().getUserByNit(nit);
                response.data = usuario_insert;
        }
    }
 
    res.status(status).json(response)
});

// Update a todo.
router.put('/users/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar un Usuario';
    let status = 200;
    const nit = parseInt(req.params.nit)
    const {
        correo_electronico,
        usuario,
        nombre,
        flag_activo,
        clave
    } = req.body
    let usuarios = await new Usuario().updateUser(nit, correo_electronico, usuario, nombre, flag_activo, clave);
    if (usuario.length > 0) {
        response.date = usuarios;
    } else {
        response.success = false;
    }
    res.status(status).json(response)
    /* if(usuarios){
        res.status(200).json(`Usuario modificado con nit: ${nit} rowCount :  ${usuarios.rowCount}`)
    }*/
});

// Delete a todo.
router.delete('/users/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar un Usuario';
    let status = 200;
    const nit = parseInt(req.params.nit)
    let usuarios = await new Usuario().deleteUserByNit(nit);
    if (usuarios.length > 0) {
        response.date = usuarios;
    } else {
        response.success = false;
    }
    res.status(status).json(response)
    /*if(usuarios){ 
        res.status(200).json(`User deleted with ID: ${nit} rowCount :  ${usuarios.rowCount}`)
    } */
});

// inicio de sesion app
router.post('/login', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Iniciar sesión';
    let status = 200;
    const {usuario, clave} = req.body
    let usuarios = await new Usuario().login(usuario, clave);
    if (usuarios.length > 0) {
        response.date = usuarios;
    } else {
        response.success = false;
    }
    res.status(status).json(response)
    if (usuarios.rowCount > 0) {
        res.status(status).json(usuarios.rows)
    } else {
        res.status(404).json('El usuario o la clave es invalida')
    }
});

// Create a todo.
router.post('/synchronization_users', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización del Usuario';
    let status = 201;
    const {usuarios} = req.body
    for (var i = 0; i < usuarios.length; i++) {
        const {
            nit,
            correo_electronico,
            usuario,
            nombre,
            flag_activo,
            clave,
            flag_cambia_fp,
            flag_cambia_lp,
            flag_edita_cliente,
            flag_edita_dcto,
            id_tipo_doc_pe,
            id_tipo_doc_rc,
            id_bodega,
            edita_consecutivo_rc,
            edita_fecha_rc
        } = usuarios[i]

        if (nit.trim() == '' || nit == null || correo_electronico.trim() == '' || correo_electronico == null || usuario.trim() == '' || usuario == null || nombre.trim() == '' || nombre == null || flag_activo.trim() == '' || flag_activo == null || clave.trim() == '' || clave == null || flag_cambia_fp.trim() == '' || flag_cambia_fp == null || flag_cambia_lp.trim() == '' || flag_cambia_lp == null || flag_edita_cliente.trim() == '' || flag_edita_cliente  == null || flag_edita_dcto.trim() == '' || flag_edita_dcto  == null || id_tipo_doc_pe.trim() == '' || id_tipo_doc_pe == null || id_tipo_doc_rc.trim() == '' || id_tipo_doc_rc == null || id_bodega.trim() == '' || id_bodega == null || edita_consecutivo_rc.trim() == '' || edita_consecutivo_rc == null || edita_fecha_rc.trim() == '' || edita_fecha_rc == null) {  
        bandera = false;
        response.success = false;
        response.msg = `El nit, correo_electronico, usuario, nombre,flag_activo, clave, flag_cambia_fp, flag_cambia_lp, flag_edita_cliente,flag_edita_dcto, id_tipo_doc_pe,id_tipo_doc_rc,id_bodega, edita_consecutivo_rc ó edita_fecha_rc esta vacio`;
        status = 400;
        break;
    }
    exist = await new Usuario().getUserByNitUs(nit,usuario);
        if (exist.length > 0) {
            response.success = false;
            response.msg = `El Usuario con el nit: (${nit}) y el usuario (${usuario})  ya existe.`;
            status = 200;
            break;
        }
        if(!bandera){
            result = await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc);
            if (!result ?. rowCount || result ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al intentar crear el Usuario:  BD ${result}`;
                status = 500;
                break;
            }
        }
    }
    response.data = await new Usuario().getUsers();
    res.status(status).json(response)
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
