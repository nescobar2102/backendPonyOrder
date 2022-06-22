const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const Cuotaventas = require('../controllers/cuotaventas');

//listar todas las Cuota de ventas
router.get('/cuotaventas_all', async (req,res) => { 
    const response = newResponseJson();
    response.msg = 'Listar todas las Cuota de Ventas';    
    let status = 200;
    let cuotaventas = await new Cuotaventas().getCuotaventas(); 
    if (cuotaventas.length > 0) {
        response.data = cuotaventas;
    } else {
     
        response.success = false;
        response.mg = 'No existen registros';
    }
    res.status(status).json(response)
});

//listar una Cuota de ventas por nit
router.get('/cuotaventas/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar una Cuota de Ventas por Nit';
    let status = 200;
    let {nit} = req?.params;    
    
    if (nit.trim() == '' || nit == null) {
        bandera= true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    }
    if (!bandera) {
        let cuotaventas = await new Cuotaventas().getCuotaventasByNit(nit);
        if (cuotaventas.length > 0) {
            response.data = cuotaventas;
        } else {
            response.success = false;
            response.msg = 'No existen registros.';
        }
    }
    res.status(status).json(response)
});

// CREAR A TODOS
router.post('/synchronization_cuotaventas', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronizacion de Cuota de Ventas';
    let status = 201;
    const {cuota_ventas } = req.body
    let bandera = false;

    for (var i = 0 ; i < cuota_ventas.length; i++) { 
        const {
            nit,
            id_vendedor,
            id_suc_vendedor,
            venta,
            cuota,
            id_linea,
            nombre
        } =  cuota_ventas[i]
       
     if (nit.trim() == '' || nit == null || id_vendedor.trim() == '' || id_vendedor == null || id_suc_vendedor.trim() == '' || id_suc_vendedor == null || venta.trim() == '' || venta == null || cuota.trim() == '' || cuota == null || id_linea.trim() == '' || id_linea == null || nombre.trim() == '' || nombre == null) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit,id_vendedor, id_suc_vendedor,venta,cuota, id_linea ó nombre esta vacio';
        status =400;
        break;        
  }
    exist = await new Cuotaventas().getCuotaventasNitId(nit,id_linea);
    if (exist.length > 0) {
        bandera =true;
        response.success = false;
        response.msg = `La Cuota de venta con el nit: (${nit}) y id_linea (${id_linea}) ya existe.`;
        status = 200;
        break;
    }
    if(!bandera){
        result = await new Cuotaventas().createCuotaventas(nit,id_vendedor,id_suc_vendedor,venta, cuota,id_linea,nombre);
        if (!result ?. rowCount || result ?. rowCount == 0) {
            bandera = true;
            response.success = false;
            response.msg = `Ha ocurrido un error al intentar crear una Cuota de venta:  BD ${result}`;
            status = 500;
            break;
        }
   }    
}
    response.data = await new Cuotaventas().getCuotaventas();
    res.status(status).json(response)  
});
function newResponseJson() {
    return { success: true, msg: "", data: []};
}
module.exports = router;