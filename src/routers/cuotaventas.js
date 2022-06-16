const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const Cuotaventas = require('../controllers/cuotaventas');
//listar todas las Cuota de ventas
router.get('/cuotaventas_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Cuota de ventas';    
    let status = 200;
    let cuotaventas = await new Cuotaventas().getCuotaventas(); 
    if (cuotaventas.length>0){
        response.data = cuotaventas;
    } else {
     // status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//listar una Cuota de ventas por nit
router.get('/cuotaventas/:nit/:nombre', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Cuota de Ventas por Nit y Nombre';
    let status = 200;
    let {nit,nombre} = req.params;    
    let cuotaventas = await new Cuotaventas().getCuotaventasByNit(nit,nombre);
    if (cuotaventas.length>0){
        response.data = cuotaventas;
    } else {
     // status = 404;
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});
//sincronizacion  las Cuota de ventas
router.post('/synchronization_cuotaventas', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronizacion de Cuota de Ventas';
    let status = 201;
    const {cuota_ventas } = req.body
    let bandera = false;
    for (var i=0;i<cuota_ventas.length;i++){ 
        const {
            nit,
            id_vendedor,
            id_suc_vendedor,
            venta,
            cuota,
            id_linea,
            nombre
        } =  cuota_ventas[i]
       result1 = await new Cuotaventas().createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta,cuota,id_linea,nombre); 
       //console.log('primer insert', result1?.rowCount);
     if (!result1?.rowCount || result1?.rowCount == 0) {
      //  console.log('no se hizo el insert');
        bandera = true;
        break;        
  }
}
    if (cuota_ventas.length > 0 && !bandera){
        response.data = await new Cuotaventas().getCuotaventas();
    }  else {
        response.success = false;
      //status = 400;
        response.msg = 'Error en la sincronización de Cuota Ventas';
    }  
    res.status(status).json(response)  
});
function newResponseJson() {
    return { success: true, msg: "", data: []};
}
module.exports = router;