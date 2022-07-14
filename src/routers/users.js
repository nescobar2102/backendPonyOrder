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
    }
    res.status(status).json(response)
});
// listar un nuevo usuario por Nit
router.get('/users/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Usuario por Nit';
    let status = 200;
    let bandera = false;
    let {nit} = req.params;
    if (nit.trim() == '' || nit == null) {
        bandera = true;
        response.success = false;
        response.msg = `El nit ó nombre estan vacios`;
        status = 400;
    }
    if (! bandera) {
        let usuarios = await new Usuario().getUserByNit(nit);
        if (usuarios.length > 0) {
            response.data = usuarios;
        } else {
            response.success = false;
            response.msg = 'No existen registros';
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

    if (nit.trim() == "" || correo_electronico.trim() == '' || usuario.trim() == '') {
        bandera = true;
        response.success = false;
        response.msg = 'El nit,usuario ó correo_electronico no puede estar vacio';
        status = 400;
    }
    exist = await new Usuario().getUserByNit(nit);
    if (exist.length > 0) {
        bandera = true;
        response.success = false;
        response.msg = `El usuario  con el nit ${nit} ya existe`;
        status = 200;
    }
    if (! bandera) {
        let usuarios = await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave, flag_cambia_fp, flag_cambia_lp, flag_edita_cliente, flag_edita_dcto, id_tipo_doc_pe, id_tipo_doc_rc, id_bodega, edita_consecutivo_rc, edita_fecha_rc);

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
    let bandera = false; 
    const nit =  req.params.nit
  
    const {
        correo_electronico,
        usuario,
        nombre,
        flag_activo,
        clave
    } = req.body
    if (nit == "") {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    }
    if (!bandera) {
        exist = await new Usuario().getUserByNit(nit);
        if (exist.length > 0) {
            let usuarios = await new Usuario().updateUser(nit, correo_electronico, usuario, nombre, flag_activo, clave);
            if (usuarios.rowCount > 0) {
                response.msg = `Se ha actualizado el usuario con el nit (${nit}) `;
            } else {
                response.success = false;
                response.msg = `Ha ocurrido un error al actualizar el usuario con el nit (${nit}) `;
                status = 500;
            }
        } else {
            response.success = false;
            response.msg = `El usuario  con el nit ${nit} no existe`;
        }
        
    }
    response.data = await new Usuario().getUserByNit(nit);
    res.status(status).json(response)

});

// Delete a todo.
router.delete('/users/:nit', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar un Usuario';
    let status = 200;
    let bandera = false; 
    const nit =   req.params ?. nit ;

    if (nit == "") {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    }
    if (!bandera) {
        exist = await new Usuario().getUserByNit(nit);
        if (exist.length > 0) {
            let usuarios = await new Usuario().deleteUserByNit(nit);      
            if (usuarios.rowCount > 0) {
                response.msg = `Se ha eliminado el usuario, con el nit (${nit}) `;
            } else {
                response.success = false;
                response.msg = `Ha ocurrido un error al eliminar el usuario con el nit (${nit}) `;
                status = 500;
            }
        } else {
            response.success = false;
            response.msg = `El usuario  con el nit ${nit} no existe`;
        }
        
    }
    res.status(status).json(response)

});

// inicio de sesion app
router.post('/login', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Bienvenido!';
    let status = 200;
    const {username, password} = req.body
    exist = await new Usuario().getUserByUser(username);
    if (exist.length == 0) {      
        response.success = false;
        response.msg = `Usuario ${username} no existe!`;  
    } else{
        let usuarios = await new Usuario().login(username, password);        
        if (usuarios.rowCount > 0) {
            response.data = usuarios.rows; 
        } else {
            response.success = false;
            response.msg = `Contraseña incorrecta!`; 
        }
    }
 
    res.status(status).json(response)
});

// Create a todo.
router.post('/synchronization_users', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de los Usuarios';
    let status = 200;
    let bandera = false;
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

        if (nit.trim() == "" || correo_electronico.trim() == '' || usuario.trim() == '') {
            bandera = true;
            response.success = false;
            response.msg = 'El nit,usuario ó correo_electronico no puede estar vacio';
            status = 400;
            break;
        }
        exist = await new Usuario().getUserByNit(nit);
        if (exist.length > 0) {
            bandera = true;
            response.success = false;
            response.msg = `El usuario  con el nit ${nit} ya existe`;
            status = 200;
            break;
        }
        if (! bandera) {
            let user = await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave, flag_cambia_fp, flag_cambia_lp, flag_edita_cliente, flag_edita_dcto, id_tipo_doc_pe, id_tipo_doc_rc, id_bodega, edita_consecutivo_rc, edita_fecha_rc);
            if (! user ?. rowCount || user ?. rowCount == 0) {
                bandera = true;
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar un Usuario: BD ${user}`;
                status = 500;
                break;
            }
        }
    };

    response.data = await new Usuario().getUsers();
    res.status(status).json(response)

});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
