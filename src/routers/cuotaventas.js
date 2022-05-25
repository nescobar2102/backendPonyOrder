const express = require("express");
const router = express.Router();
const Cuotaventas = require('../controllers/cuotaventas');

router.get('/cuotaventas_all', async (req,res) => { 
    let cuotaventas = await new Cuotaventas().getCuotaventas(); 
    res.status(200).json(cuotaventas)
});
router.get('/cuotaventas/:nit', async (req,res) => {
    let {nit} = req.params;    
    let cuotaventas = await new Cuotaventas().getCuotaventasByNit(nit);
    res.status(200).json(cuotaventas)
});
router.post('/synchronization_cuotaventas', async (req,res) => {
    const {cuota_ventas } = req.body
    for (var i=0;i<cuota_ventas.length;i++){ 
        const {nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre} =  cuota_ventas[i]
        await new Cuotaventas().createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre); 
     };
     
     let cuotaventas_all= await new Cuotaventas().getCuotaventas();
     res.status(200).json(cuotaventas_all)
  
});
module.exports = router;