const express = require("express");
const router = express.Router();
const Usuario = require('../controllers/usuario');

// listar los usuarios
router.get('/users_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listado de Usuarios';
    let status = 200;
    let usuarios = await new Usuario().getUsers();
   // console.log (usuarios);
    if (usuarios.length>0){
        response.data = usuarios;       
    }  else {
        response.success = false;
    }
    res.status(status).json(response)
});
// listar un nuevo usuario por Nit
router.get('/users/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Usuario por Nit';
    let status = 200;
    let {nit} = req.params;    
    let usuarios = await new Usuario().getUserByNit(nit);
 
    if (usuarios.length>0) {
        response.data = usuarios;
    } else {
        response.success = false;
    }
    res.status(status).json(response)
});

//Create un usuario.
router.post('/users', async (req,res) => {
    const response = newResponseJson();
    let status = 201;

    const {nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc} = req.body
    let usuarios = await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc); 
    response.msg = `Se ha creado el usuario usuario, con el nit  ${usuario} -  ${nombre}`;
     if (!usuarios?.rowCount || usuarios?.rowCount == 0) { 
          response.success = false;  
          response.msg += usuarios ?  usuarios :' Ha ocurrido un error al intentar crear un usuario.  - '; 
          status = 500;  
    } else{
        let usuario_insert = await new Usuario().getUserByNit(nit);
        response.data = usuario_insert;           
    }
    res.status(status).json(response)
});

//Update a todo.
router.put('/users/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar un Usuario';
    let status = 200;
    const nit = parseInt(req.params.nit)
    const { correo_electronico, usuario, nombre, flag_activo, clave } = req.body 
    let usuarios = await new Usuario().updateUser( nit, correo_electronico, usuario, nombre, flag_activo, clave ); 
       if(usuario.length>0){
        response.date = usuarios;
    }  else {
        response.success = false;
    }
    res.status(status).json(response)
    /* if(usuarios){
        res.status(200).json(`Usuario modificado con nit: ${nit} rowCount :  ${usuarios.rowCount}`)
    }*/
});

//Delete a todo.
router.delete('/users/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar un Usuario';
    let status = 200;
    const nit = parseInt(req.params.nit) 
    let usuarios = await new Usuario().deleteUserByNit(nit); 
    if(usuarios.length>0){
        response.date = usuarios;
    }
    else {
        response.success = false;
    }
    res.status(status).json(response)
    /*if(usuarios){ 
        res.status(200).json(`User deleted with ID: ${nit} rowCount :  ${usuarios.rowCount}`)
    } */    
});

//inicio de sesion app
router.post('/login', async (req,res) => {
    const response = newResponseJson();    
    response.msg = 'Iniciar sesión';
    let status = 200;
    const { usuario, clave } = req.body
    let usuarios = await new Usuario().login(usuario, clave);   
    if(usuarios.length>0){
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

//Create a todo.
router.post('/synchronization_users', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización del Usuario';
    let status = 200;
    const {usuarios } = req.body
    for (var i=0;i<usuarios.length;i++){ 
        const {nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc} =  usuarios[i]
        await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc); 
     };     
     if(usuarios.length>0){
         response.data = usuarios;
     }  else {
        response.success = false;
     }
    res.status(status).json(response)
     let usuarios_all= await new Usuario().getUsers();
     res.status(status).json(usuarios_all)  
});
function newResponseJson() {
    return {success: true, msg: "", data: []};
}
module.exports = router;
 