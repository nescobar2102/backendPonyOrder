const express = require("express");
const router = express.Router();
const Pedido = require('../controllers/pedido');

// listar los usuarios
router.get('/pedido', async (req,res) => { 
});
// listar un nuevo peido por Nit
router.get('/pedido/:nit', async (req,res) => {
   
});

//Create a todo.
router.post('/pedido', async (req,res) => {
 
});


module.exports = router;
 