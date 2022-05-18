const express = require("express");
const router = express.Router();
const Usuario = require('../controllers/usuario');

// listar los usuarios
router.get('/users', async (req,res) => {
    let usuarios = await new Usuario().getUsers();
    res.status(200).json(usuarios)
});
// listar un nuevo usuario por Nit
router.get('/users/:nit', async (req,res) => {
    let {nit} = req.params;    
    let usuarios = await new Usuario().getUserByNit(nit);
    res.status(200).json(usuarios)
});

//Create a todo.
router.post('/users', async (req,res) => {
    const {nit, correo_electronico, usuario, nombre, flag_activo, clave } = req.body
    let usuarios = await new Usuario().createUser( nit, correo_electronico, usuario, nombre, flag_activo, clave ); 
    res.status(200).json(usuarios)
});

//Update a todo.
router.put('/users/:nit', async (req,res) => {
    const nit = parseInt(req.params.nit)
    const { correo_electronico, usuario, nombre, flag_activo, clave } = req.body 
    let usuarios = await new Usuario().updateUser( nit, correo_electronico, usuario, nombre, flag_activo, clave ); 
    if(usuarios){
 
        res.status(200).json(`User modified with nit: ${nit} rowCount :  ${usuarios.rowCount}`)
    }
    
});

//Delete a todo.
router.delete('/users/:nit', async (req,res) => {
    const nit = parseInt(req.params.nit) 
    let usuarios = await new Usuario().deleteUserByNit(nit); 
    if(usuarios){ 
        res.status(200).json(`User deleted with ID: ${nit} rowCount :  ${usuarios.rowCount}`)
    }
    
});

//Create a todo.
router.post('/login', async (req,res) => {
    const { usuario, clave } = req.body
    let usuarios = await new Usuario().login(usuario, clave);   
    if (usuarios.rowCount > 0) {
        res.status(200).json(usuarios.rows)
    }
    else {
        res.status(404).json('El usuario o la clave es invalida')  
    }
    
});

module.exports = router;
 