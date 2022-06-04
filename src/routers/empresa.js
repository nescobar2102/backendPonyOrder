const express = require("express");
const router = express.Router();
const Empresa = require('../controllers/empresa');


// listar los empresa
router.get('/empresa_all', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar todas las Empresa';
    let empresa = await new Empresa().getEmpresa();
    if (empresa.length>0){
        response.data = empresa;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
// listar una nueva empresa por Nit
router.get('/empresa/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Listar las Empresa por Nit';
    let {nit} = req.params;    
    let empresa = await new Empresa().getEmpresaNit(nit);
    if (empresa.length>0){
        response.data = empresa;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});

//Create una empresa.
router.post('/empresa', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Crear una Empresa';
    const {nit,dv,razon_social,correo_electronico } = req.body
    let empresa = await new Empresa().createEmpresa( nit,dv,razon_social,correo_electronico ); 
    if (empresa.length>0){
        response.data = empresa;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});

//Update a todo.
router.put('/empresa/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar una Empresa por Nit';
    const nit = parseInt(req.params.nit)
    const {razon_social, correo_electronico } = req.body 
    let empresa = await new Empresa().updateEmpresa( nit,razon_social, correo_electronico ); 
    if(empresa){ 
        res.status(200).json(`Empresa Actualizada por nit: ${nit} rowCount :  ${empresa.rowCount}`)
    }
    if (empresa.length>0){
        response.data = empresa;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)    
});
//Update a todo.
router.put('/empresa/status/:nit', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Actualizar los status de una Empresa por Nit';
    const nit = req.params.nit
    const { estado } = req.body 
    let empresa = await new Empresa().updateEmpresaStatus( nit,estado ); 
    if(empresa){ 
        res.status(200).send(`Empresa status modified with nit: ${nit} rowCount :  ${empresa.rowCount}`)
    }
    if (empresa.length>0){
        response.data = empresa;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)
});
//Sincronizacion 
router.post('/synchronization_empresa', async (req,res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de la Empresa';
    const {empresas } = req.body
    for (var i=0;i<empresas.length;i++){ 
        const {nit,razon_social,id_tipo_empresa,pre_actividad_economica,pre_cuenta,pre_medio_contacto,id_moneda,direccion,telefono,dv,fax,id_pais,id_depto,id_ciudad,regimen_tributario,flag_iva,flag_forma_pago_efectivo,correo_electronico,id_empresa} =  empresas[i]
        await new Empresa().createEmpresa(nit,razon_social,id_tipo_empresa,pre_actividad_economica,pre_cuenta,pre_medio_contacto,id_moneda,direccion,telefono,dv,fax,id_pais,id_depto,id_ciudad,regimen_tributario,flag_iva,flag_forma_pago_efectivo,correo_electronico,id_empresa ); 
     };
    if (empresa.length>0){
        response.data = empresa;
    }
    else {
        response.success = false;
    }
    res.status(200).json(response)     
    let empresa_all= await new Empresa().getEmpresa();
    res.status(200).json(empresa_all)
  
});
function newResponseJson() {
    return {
        success: true,
        msg: "",
        data: [],
    };
}
module.exports = router;
 