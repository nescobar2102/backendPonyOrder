const express = require("express");
const router = express.Router();
const Tiempoentrega = require('../controllers/tiempoentrega');

router.get('/tiempoentrega_all', async (req,res) => { 
    let tiempoentrega = await new Tiempoentrega().getTiempoentrega(); 
    res.status(200).json(tiempoentrega)
});
router.get('/tiempoentrega/:nit', async (req,res) => {
    let {nit} = req.params;    
    let tiempoentrega = await new Tiempoentrega().getTiempoentregaByNit(nit);
    res.status(200).json(tiempoentrega)
});
router.post('/synchronization_tiempoentrega', async (req,res) => {
    const {tiempo_entregas} = req.body 
    for (var i=0;i<tiempo_entregas.length;i++){        
        const {nit,id_tiempo_entrega,hora_inicial,hora_final} =  tiempo_entregas[i];
        console.log('tiempo');
        await new Tiempoentrega().createTiempoentregan(nit,id_tiempo_entrega,hora_inicial,hora_final);             
     };         
    let tiempoentrega_all= await new Tiempoentrega().getTiempoentrega();
     res.status(200).json(tiempoentrega_all)  
});
module.exports = router;