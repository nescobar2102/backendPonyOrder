const express = require("express");
const router = express.Router();
const Usuario = require('../controllers/usuario');

// listar los usuarios
router.get('/users_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listado de Usuarios';
    let usuarios = await new Usuario().getUsers();
   // console.log (usuarios);
    if (usuarios.length>0){
        response.data = usuarios;       
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// listar un nuevo usuario por Nit
router.get('/users/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar un Usuario por Nit';
    let {nit} = req.params;    
    let usuarios = await new Usuario().getUserByNit(nit);
    console.log(usuarios?.detail)
    if (usuarios.length>0) {
        response.data = usuarios;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});

//Create un usuario.
router.post('/users', async (req,res) => {
    const response = newResponseJson();
    let status = 201;
    response.msg = 'Crear un Usuario';
    const {nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc} = req.body
    let usuarios = await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc); 
   
     if (!usuarios?.rowCount || usuarios?.rowCount == 0) { 
          response.success = false;
          status=400;
    }   
    else{
        response.data = usuarios;       
    }
    res.status(status).json(usuarios)
});

//Update a todo.
router.put('/users/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar un Usuario';
    const nit = parseInt(req.params.nit)
    const { correo_electronico, usuario, nombre, flag_activo, clave } = req.body 
    let usuarios = await new Usuario().updateUser( nit, correo_electronico, usuario, nombre, flag_activo, clave ); 
       if(usuario.length>0){
        response.date = usuarios;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    /* if(usuarios){
        res.status(200).json(`Usuario modificado con nit: ${nit} rowCount :  ${usuarios.rowCount}`)
    }*/
});

//Delete a todo.
router.delete('/users/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar un Usuario';
    const nit = parseInt(req.params.nit) 
    let usuarios = await new Usuario().deleteUserByNit(nit); 
    if(usuarios.length>0){
        response.date = usuarios;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    /*if(usuarios){ 
        res.status(200).json(`User deleted with ID: ${nit} rowCount :  ${usuarios.rowCount}`)
    } */    
});

//inicio de sesion app
router.post('/login', async (req,res) => {
    const response = newResponseJson();
    
    response.msg = 'Iniciar sesión';
    const { usuario, clave } = req.body
    let usuarios = await new Usuario().login(usuario, clave);   
    if(usuarios.length>0){
        response.date = usuarios;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    if (usuarios.rowCount > 0) {
        res.status(200).json(usuarios.rows)
    }
    else {
        res.status(404).json('El usuario o la clave es invalida')  
    }    
});

//Create a todo.
router.post('/synchronization_users', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización del Usuario';
    const {usuarios } = req.body
    for (var i=0;i<usuarios.length;i++){ 
        const {nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc} =  usuarios[i]
        await new Usuario().createUser(nit, correo_electronico, usuario, nombre, flag_activo, clave,flag_cambia_fp,flag_cambia_lp,flag_edita_cliente,flag_edita_dcto,id_tipo_doc_pe,id_tipo_doc_rc,id_bodega,edita_consecutivo_rc,edita_fecha_rc); 
     };     
     if(usuarios.length>0){
         response.data = usuarios;
     }
     else {
        response.success = false;
     }
    res.status(200).json(response)
     let usuarios_all= await new Usuario().getUsers();
     res.status(200).json(usuarios_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;
 