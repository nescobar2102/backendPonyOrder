const express = require("express");
const router = express.Router();
const Empresa = require('../controllers/empresa');

// listar los empresa
router.get('/empresa_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas las Empresa';
    let status = 200;
    let empresa = await new Empresa().getEmpresa();
    if (empresa.length>0){
        response.data = empresa;
    } else {
        response.success = false;
        response.msg = 'Error en Listar todas las Empresa';
    }
    res.status(status).json(response)
});
// listar una nueva empresa por Nit
router.get('/empresa/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar las Empresa por Nit';
    let status = 200;
    let {nit} = req.params;    
    let empresa = await new Empresa().getEmpresaNit(nit);
    if (empresa.length>0){
        response.data = empresa;
    }  else {
        response.success = false;
        response.msg = 'Error en Listar la Empresa';
    }
    res.status(status).json(response)
});

//Create una empresa.
router.post('/empresa', async (req,res) => { //require mas campos para la creacion
    const response = newResponseJson();
    response.msg = 'Crear una Empresa';
    let status = 201;
    const {nit,dv,razon_social,correo_electronico } = req.body
    let result = await new Empresa().createEmpresaUnica(nit,dv,razon_social,correo_electronico); 
    if (!result?.rowCount || result?.rowCount == 0) {     
        response.data = await new Empresa().getEmpresaNit(nit);
    }    else {
        response.success = false;
       // status = 400;
        response.msg = 'Error en la Creacion de la Empresa';
    }
    res.status(status).json(response)
});

//Update a todo.
router.put('/empresa/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar una Empresa por Nit';
    let status = 200;
    const nit = parseInt(req.params.nit)
    const {razon_social, correo_electronico } = req.body 
    let empresa = await new Empresa().updateEmpresa( nit,razon_social, correo_electronico ); 
    if(empresa){ 
        res.status(200).json(`Empresa Actualizada por nit: ${nit} rowCount :  ${empresa.rowCount}`)
    }
    if (empresa.length>0){
        response.data = empresa;
    } else {
        response.success = false;
        response.msg = 'Error en la Actualización de Empresa';
    }
    res.status(status).json(response)    
});
//Update a todo.
router.put('/empresa/status/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar los status de una Empresa por Nit';
    const nit = req.params.nit
    const { estado } = req.body 
    let status = 200;
    let empresa = await new Empresa().updateEmpresaStatus( nit,estado );  
        if(empresa?.rowCount && empresa.rowCount > 0){          
            response.msg = `Empresa status modified with nit: ${nit} rowCount:  ${empresa.rowCount}`
        } else {
            response.success = false;
           // status = 400;
            response.msg = 'Error en la actualizacion de estatus de la empresa, (solo permite "true" o "false")';
        }
    res.status(status).json(response);
});

//Sincronizacion 
router.post('/synchronization_empresa', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de la Empresa';
    let status = 201;
    const {empresas } = req.body
    let bandera = false;
    for (var i=0;i<empresas.length;i++){ 
        const {nit,razon_social,id_tipo_empresa,pre_actividad_economica,pre_cuenta,pre_medio_contacto,id_moneda,direccion,telefono,dv,fax,id_pais,id_depto,id_ciudad,regimen_tributario,flag_iva,flag_forma_pago_efectivo,correo_electronico,id_empresa} =  empresas[i]
         result = await new Empresa().createEmpresa(nit,razon_social,id_tipo_empresa,pre_actividad_economica,pre_cuenta,pre_medio_contacto,id_moneda,direccion,telefono,dv,fax,id_pais,id_depto,id_ciudad,regimen_tributario,flag_iva,flag_forma_pago_efectivo,correo_electronico,id_empresa ); 
    
         if (!result?.rowCount || result?.rowCount == 0) {            
            bandera = true;
            break;        
            }
        }; 
     if (empresas.length>0 && !bandera){
        response.data = await new Empresa().getEmpresa();;
    } else {
        response.success = false;
      //  status = 400;
        response.msg = 'Error en la sincronización de Empresas';
    }    
    res.status(status).json(response)  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;
 