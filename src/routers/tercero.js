const express = require("express");
const router = express.Router();
const Tercero = require('../controllers/tercero');

router.get('/tercero_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos tercero';
    let status = 200;
    let tercero = await new Tercero().getTercero();
    if (tercero.length > 0) {
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.delete('/tercero_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Eliminar todos terceros';
    let status = 200;
    let tercero = await new Tercero().deleteTercero();
    response.data = tercero
    res.status(status).json(response)
});
router.get('/cliente_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos cliente';
    let status = 200;
    let tercero = await new Tercero().getCliente();
    if (tercero.length > 0) {
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
router.get('/direccion_all', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Listar todos direccion';
    let status = 200;
    let tercero = await new Tercero().getDireccion();
    if (tercero.length > 0) {
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});
//backend
router.get('/tercero/:nit/:nombre', async (req, res) => {
    const response = newResponseJson();
    let status = 200; 
    response.msg = 'Listar un tercero por Nit y nombre';
    let {nit, nombre} = req.params;
    if (nit.trim() == "" || nombre.trim() == ""  ) { 
        response.success = false;
        response.msg = 'El nit o nombre están vacios';
        status = 400;
    }
    let tercero = await new Tercero().getTerceroByNit(nit, nombre);
    if (tercero.length > 0) {
        response.count = tercero.length;
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
    res.status(status).json(response)
});

router.post('/clientes', async (req, res) => { //appmovil
    const response = newResponseJson();
    let status = 200;  
    let {nit, nombre} = req?.body; 
    let tercero ;
    if (nit.trim() == ""  ) {
        bandera = true;
        response.success = false;
        response.msg = 'El nit o nombre están vacios';
        status = 400;
    }
    if (nombre?.trim() == "" || nombre=='@') {
        console.log("#aaaaaaaaaaaaaaaaaaaaaaa")
         tercero = await new Tercero().getTerceroApp(nit);
        console.log("count",tercero.length)       
    }else{
        console.log("#bbbbbbbbbbbbbbbbbbbbb")
        tercero = await new Tercero().getTerceroAppIlike(nit, nombre);
        console.log("count",tercero.length)
    }
    if (tercero.length > 0) {      
        response.count = tercero.length;
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No se encontro el cliente!';
    }
    res.status(status).json(response)
});
 
router.get('/tercero/:nit', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false; 
    response.msg = 'Listar un tercero por Nit';
    let {nit} = req.params;
    if (nit.trim() == "") {
        bandera = true;
        response.success = false;
        response.msg = 'El nit esta vacio';
        status = 400;
    } 
     if (!bandera) {
        let tercero = await new Tercero().getTerceroByNitID(nit);
        if (tercero.length > 0) {
            response.count = tercero.length;
            response.data = tercero;
        } else { 
            response.success = false;
            response.msg = 'No existen registros';
        }
}
    res.status(status).json(response)
});

router.get('/cliente/:id_tercero', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false; 
    response.msg = 'Listar un tercero_cliente por id_tercero';
    let {id_tercero} = req?.params;
    if (id_tercero.trim() == "") {
        bandera = true;
        response.success = false;
        response.msg = 'El id_tercero esta vacio';
        status = 400;
    } 
    if (!bandera) {
    let tercero = await new Tercero().getTercerocliente(id_tercero);
    if (tercero.length > 0) {
        response.count = tercero.length;
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
}
    res.status(status).json(response)
});

router.get('/direccion/:id_tercero', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let bandera = false; 
    response.msg = 'Listar un tercero_direccion por id_tercero';
    let {id_tercero} = req?.params;
    if (id_tercero.trim() == "") {
        bandera = true;
        response.success = false;
        response.msg = 'El id_tercero esta vacio';
        status = 400;
    } 
    if (!bandera) {
    let tercero = await new Tercero().getTercerodireccion(id_tercero);
    if (tercero.length > 0) {
        response.count = tercero.length;
        response.data = tercero;
    } else { 
        response.success = false;
        response.msg = 'No existen registros';
    }
}
    res.status(status).json(response)
});
router.post('/synchronization_tercero', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Sincronización de tercero';
    let status = 201;
    const {terceros} = req.body
    let bandera = false;
    let bandera_cliente= false;
    let bandera_direccion = false;

  //  await new Tercero().deleteTercero();

    for (var i = 0; i < terceros.length; i++) {
        if (!bandera_cliente && !bandera_direccion && !bandera) {
            const {
                nit,
                id_tercero,
                id_sucursal_tercero,
                id_tipo_identificacion,
                dv,
                nombre,
                direccion,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                telefono,
                id_actividad,
                id_tipo_empresa,
                cliente,
                fecha_creacion,
                nombre_sucursal,
                primer_apellido,
                segundo_apellido,
                primer_nombre,
                segundo_nombre,
                flag_persona_nat,
                estado_tercero,
                vendedor,
                id_lista_precio,
                id_forma_pago,
                usuario,
                flag_enviado,
                e_mail,
                telefono_celular,
                e_mail_fe,
                terceros_cliente,
                terceros_direccion
            } = terceros[i];
            let tercero = await new Tercero().getTercerocliente(id_tercero);
            if (tercero.length > 0) {               
                bandera = true; 
                response.success = false; 
                response.msg = `El Tercero con el id_tercero ${id_tercero} ya existe`;
                status = 200;
                break;
                } 
            let result1 = await new Tercero().createTercero(nit,
                id_tercero,
                id_sucursal_tercero,
                id_tipo_identificacion,
                dv,
                nombre,
                direccion,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                telefono,
                id_actividad,
                id_tipo_empresa,
                cliente,
                fecha_creacion,
                nombre_sucursal,
                primer_apellido,
                segundo_apellido,
                primer_nombre,
                segundo_nombre,
                flag_persona_nat,
                estado_tercero,
                vendedor,
                id_lista_precio,
                id_forma_pago,
                usuario,
                flag_enviado,
                e_mail,
                telefono_celular,
                e_mail_fe);
            
            if (!result1 ?. rowCount || result1 ?. rowCount == 0) { 
                console.log("entra en bandera tercero",result1)
                bandera = true; 
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar un tercero: BD ${result1}`;
                status = 500;
                break;
            } else {
                if (terceros_cliente ?. length > 0 && result1 ?. rowCount > 0) {  
                    for (var j = 0; j < terceros_cliente.length; j++) { 
                        const {
                            nit,
                            id_tercero,
                            id_sucursal_tercero,
                            id_forma_pago,
                            id_precio_item,
                            id_vendedor,
                            id_suc_vendedor,
                            id_medio_contacto,
                            id_zona,
                            flag_exento_iva,
                            dia_cierre,
                            id_impuesto_reteiva,
                            id_agente_reteiva,
                            id_impuesto_reteica,
                            id_agente_reteica,
                            id_impuesto_retefuente,
                            id_agente_retefuente,
                            id_agente_retecree,
                            id_impuesto_retecree,
                            id_tamanno,
                            limite_credito,
                            dias_gracia,
                            flag_cartera_vencida,
                            dcto_cliente,
                            dcto_adicional,
                            numero_facturas_vencidas
                        } = terceros_cliente[j];
                       let result2 = await new Tercero().createTercerocliente(nit,
                            id_tercero,
                            id_sucursal_tercero,
                            id_forma_pago,
                            id_precio_item,
                            id_vendedor,
                            id_suc_vendedor,
                            id_medio_contacto,
                            id_zona,
                            flag_exento_iva,
                            dia_cierre,
                            id_impuesto_reteiva,
                            id_agente_reteiva,
                            id_impuesto_reteica,
                            id_agente_reteica,
                            id_impuesto_retefuente,
                            id_agente_retefuente,
                            id_agente_retecree,
                            id_impuesto_retecree,
                            id_tamanno,
                            limite_credito,
                            dias_gracia,
                            flag_cartera_vencida,
                            dcto_cliente,
                            dcto_adicional,
                            numero_facturas_vencidas);
                        
                         if (!result2 ?. rowCount || result2 ?. rowCount == 0) {  
                            bandera_cliente = true;  
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar un tercero cliente: BD ${result2}`;
                            status = 500;  
                            break;
                        } 
                    }
                    if(!bandera_cliente && !bandera){ 
                       if (terceros_direccion ?. length > 0 ) { 
                                for (var k = 0; k < terceros_direccion.length; k++) {
                                    const {
                                        nit,
                                        id_tercero,
                                        id_sucursal_tercero,
                                        id_direccion,
                                        direccion,
                                        telefono,
                                        id_pais,
                                        id_ciudad,
                                        id_depto,
                                        tipo_direccion
                                    } = terceros_direccion[k];
                                  let result3 = await new Tercero().createTercerodireccion( nit,
                                        id_tercero,
                                        id_sucursal_tercero,
                                        id_direccion,
                                        direccion,
                                        telefono,
                                        id_pais,
                                        id_ciudad,
                                        id_depto,
                                        tipo_direccion);
                                    if (!result3 ?. rowCount || result3 ?. rowCount == 0) { //
                                        console.log("entra en bandera direccion")
                                        bandera_direccion = true; // se levanta la bandera
                                        response.success = false;
                                        response.msg = `Ha ocurrido un error al insertar un tercero direccion: BD ${result3}`;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }            
        }
    }
    if (! bandera_cliente && ! bandera_direccion && !bandera) { // no se levanto la bandera (false) 
        response.data =  await new Tercero().getTercero(); 
    }  
    res.status(status).json(response);
});


router.post('/nuevo_cliente_app', async (req, res) => {
    const response = newResponseJson();
    response.msg = 'Creación de cliente exitosa.';
    let status = 201;    
            const {
                nit,
                id_tercero,
                id_sucursal_tercero,
                id_tipo_identificacion,
                dv,
                nombre,
                direccion,
                id_pais,
                id_depto,
                id_ciudad,
                id_barrio,
                telefono,    
                nombre_sucursal,
                primer_apellido,
                segundo_apellido,
                primer_nombre,
                segundo_nombre, 
                e_mail,
                id_forma_pago,
                id_precio_item,                
                id_vendedor, 
                id_medio_contacto,
                id_zona,
                tipo_direccion,
                id_direccion,
                id_suc_vendedor
            } = req.body
            let tercero = await new Tercero().getTercerocliente(id_tercero);
            if (tercero.length > 0) {               
                
                response.success = false; 
                response.msg = `El Cliente con el id_tercero ${id_tercero} ya existe`;
                status = 200;             
                } 
                console.log("segundo_nombre",segundo_nombre)
                console.log("primer_nombre",primer_nombre)
                console.log("nombre_sucursal",nombre_sucursal)
                console.log("e_mail",e_mail)
            let result1 = await new Tercero().createTerceroApp(nit,
                id_tercero,id_sucursal_tercero,id_tipo_identificacion, dv, nombre, direccion, id_pais, id_depto,
                id_ciudad, id_barrio, telefono,nombre_sucursal,
                    primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, e_mail);
          
            if (!result1 ?. rowCount || result1 ?. rowCount == 0 ) { 
                console.log("entra en bandera tercero",result1)               
                response.success = false;
                response.msg = `Ha ocurrido un error al insertar un tercero: BD ${result1}`;
                status = 500;
               
            } else {
                if ( result1 ?. rowCount > 0) {  
                                             let result2 = await new Tercero().createTerceroclienteApp(id_tercero, id_sucursal_tercero,id_forma_pago,id_precio_item ,id_vendedor,
                        id_suc_vendedor,id_medio_contacto, id_zona, nit);
                        
                         if (!result2 ?. rowCount || result2 ?. rowCount == 0) {   
                            response.success = false;
                            response.msg = `Ha ocurrido un error al insertar un tercero cliente: BD ${result2}`;
                            status = 500;   
                        }  
                       if (result2 ?. rowCount > 0 && response.success) {                           
                                  let result3 = await new Tercero().createTercerodireccionApp(id_tercero, id_sucursal_tercero, id_direccion, direccion, telefono,
                                    id_pais, id_ciudad, id_depto, tipo_direccion, nit);
                                    if (!result3 ?. rowCount || result3 ?. rowCount == 0) { //
                                        console.log("entra en bandera direccion") 
                                        response.success = false;
                                        response.msg = `Ha ocurrido un error al insertar un tercero direccion: BD ${result3}`;                                       
                                    } 
                            }
                        }
                    }
                  
    
        response.data =  await new Tercero().getTerceroApp(nit); 
    
    res.status(status).json(response);
});
function newResponseJson() {
    return {success: true, msg: "", data: [],count: 0};
}
module.exports = router;
