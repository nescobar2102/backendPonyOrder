const express = require("express");
const router = express.Router();
const Cuotaventas = require('../controllers/cuotaventas');
//listar todas las Cuota de ventas
router.get('/cuotaventas_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Cuota de ventas';    
    let cuotaventas = await new Cuotaventas().getCuotaventas(); 
    if (cuotaventas.length>0){
        response.data = cuotaventas;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//listar una Cuota de ventas por nit
router.get('/cuotaventas/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Cuota de ventas por Nit';
    let {nit} = req.params;    
    let cuotaventas = await new Cuotaventas().getCuotaventasByNit(nit);
    if (cuotaventas.length>0){
        response.data = cuotaventas;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//sincronizacion  las Cuota de ventas
router.post('/synchronization_cuotaventas', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronizacion de Cuota de ventas';
    const {cuota_ventas } = req.body
    for (var i=0;i<cuota_ventas.length;i++){ 
        const {nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre} =  cuota_ventas[i]
        await new Cuotaventas().createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre); 
     };
    if (cuota_ventas.length>0){
        response.data = cuota_ventas;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
    let cuotaventas_all= await new Cuotaventas().getCuotaventas();
    res.status(200).json(cuotaventas_all)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;